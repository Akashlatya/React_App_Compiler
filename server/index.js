/* eslint-disable */
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { spawn } = require('child_process');
const os = require('os');
const cors = require('cors');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Security Middleware
app.use(helmet());

// Rate Limiting: Limit specific IPs to 1000 requests per 15 mins (Relaxed for local dev)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Restrict CORS to allowed domains
const ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://ogcompiler.com', // Keep custom domain for potential future use or if serving locally with domain
    'https://www.ogcompiler.com',
    'http://13.50.106.52',
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [])
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check allowed origins
        if (ALLOWED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        callback(new Error('Not allowed by CORS'));
    },
    credentials: true
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('OG Compiler Server is running locally');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);

            if (ALLOWED_ORIGINS.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: ["GET", "POST"],
        credentials: true
    }
});

const tempBaseDir = path.join(os.tmpdir(), 'og-compiler-temp');

// Ensure temp directory exists and is clean on startup
if (!fs.existsSync(tempBaseDir)) {
    fs.mkdirSync(tempBaseDir, { recursive: true });
} else {
    // Cleanup any leftover folders from previous runs
    fs.readdirSync(tempBaseDir).forEach(folder => {
        try {
            const folderPath = path.join(tempBaseDir, folder);
            if (fs.statSync(folderPath).isDirectory()) {
                fs.rmSync(folderPath, { recursive: true, force: true });
            } else {
                fs.unlinkSync(folderPath);
            }
        } catch (err) {
            console.error(`Failed to delete leftover ${folder}:`, err.message);
        }
    });
}

// Helper to validate filename (prevent path traversal)
const isValidFilename = (filename) => {
    // Only allow alphanumeric, underscore, hyphen, and dot
    // Must not start with dot, must have an extension
    const validPattern = /^[a-zA-Z0-9][a-zA-Z0-9_\-]*\.[a-zA-Z0-9]+$/;
    return validPattern.test(filename) && !filename.includes('..');
};

// Text-based Sanitize Input to prevent basic malicious code (Not a full sandbox)
const validateCode = (language, code) => {
    const forbiddenPatterns = {
        javascript: [
            /require\s*\(/,
            /process\./,
            /child_process/,
            /exec\s*\(/,
            /spawn\s*\(/,
            /eval\s*\(/,
            /Function\s*\(/,
            /__proto__/,
            /global\./
        ],
        python: [
            /import\s+os/,
            /import\s+sys/,
            /import\s+subprocess/,
            /from\s+os/,
            /from\s+sys/,
            /from\s+subprocess/,
            /open\s*\(/,
            /exec\s*\(/,
            /eval\s*\(/,
            /__import__/
        ],
        c: [
            /system\s*\(/,
            /fork\s*\(/,
            /exec\w*\s*\(/,
            /popen\s*\(/
        ],
        cpp: [
            /system\s*\(/,
            /fork\s*\(/,
            /exec\w*\s*\(/,
            /popen\s*\(/
        ],
        java: [
            /Runtime\.getRuntime/,
            /ProcessBuilder/,
            /System\.exit/
        ]
    };

    const patterns = forbiddenPatterns[language];
    if (patterns) {
        for (const pattern of patterns) {
            if (pattern.test(code)) {
                throw new Error(`Security Violation: Forbidden keyword detected.`);
            }
        }
    }
};

// Helper to write code to a temporary file
const writeTempFile = async (language, code, sessionDir) => {
    // Validate first
    validateCode(language, code);
    const tempDir = sessionDir;

    const filename = `code_${uuidv4()}`;
    let filepath;
    let content = code;

    switch (language) {
        case 'javascript': filepath = path.join(tempDir, `${filename}.js`); break;
        case 'python': filepath = path.join(tempDir, `${filename}.py`); break;
        case 'c':
            filepath = path.join(tempDir, `${filename}.c`);
            // Inject setbuf(stdout, NULL) at the start of main to disable buffering
            content = code.replace(/(int\s+main\s*\([^)]*\)\s*\{)/i, '$1 setbuf(stdout, NULL);');
            break;
        case 'cpp':
            filepath = path.join(tempDir, `${filename}.cpp`);
            // Inject setbuf(stdout, NULL) at the start of main
            content = code.replace(/(int\s+main\s*\([^)]*\)\s*\{)/i, '$1 setbuf(stdout, NULL);');
            break;
        case 'java':
            // Extract class name from code
            const classMatch = code.match(/public\s+class\s+(\w+)/);
            const className = classMatch ? classMatch[1] : 'Main';
            filepath = path.join(tempDir, `${className}.java`);
            break;
        default: filepath = path.join(tempDir, `${filename}.txt`);
    }

    await fsPromises.writeFile(filepath, content);
    return filepath;
};

io.on('connection', async (socket) => {
    console.log('Client connected:', socket.id);
    let childProcess = null;

    // Create session folder for this user
    const sessionDir = path.join(tempBaseDir, socket.id);
    try {
        await fsPromises.mkdir(sessionDir, { recursive: true });
        console.log(`Session folder created: ${sessionDir}`);
    } catch (err) {
        console.error(`Failed to create session dir: ${err.message}`);
    }

    // Save a file to the session folder
    socket.on('save_file', async ({ filename, content }) => {
        try {
            if (!isValidFilename(filename)) {
                socket.emit('file_error', { message: 'Invalid filename. Use only letters, numbers, underscores, and hyphens with a valid extension.' });
                return;
            }
            const filepath = path.join(sessionDir, filename);
            await fsPromises.writeFile(filepath, content);
            socket.emit('file_saved', { filename, message: `File '${filename}' saved successfully.` });
            console.log(`File saved: ${filepath}`);
        } catch (err) {
            socket.emit('file_error', { message: err.message });
        }
    });

    // List files in the session folder
    socket.on('list_files', async () => {
        try {
            const files = await fsPromises.readdir(sessionDir);
            const fileList = [];

            for (const f of files) {
                if (f.startsWith('code_')) continue;
                const stats = await fsPromises.stat(path.join(sessionDir, f));
                fileList.push({
                    name: f,
                    size: stats.size
                });
            }

            socket.emit('files_list', { files: fileList });
        } catch (err) {
            socket.emit('file_error', { message: err.message });
        }
    });

    // Delete a file from the session folder
    socket.on('delete_file', async ({ filename }) => {
        try {
            if (!isValidFilename(filename)) {
                socket.emit('file_error', { message: 'Invalid filename.' });
                return;
            }
            const filepath = path.join(sessionDir, filename);
            try {
                await fsPromises.access(filepath);
                await fsPromises.unlink(filepath);
                socket.emit('file_deleted', { filename, message: `File '${filename}' deleted.` });
            } catch {
                socket.emit('file_error', { message: 'File not found.' });
            }
        } catch (err) {
            socket.emit('file_error', { message: err.message });
        }
    });

    // Get file content
    socket.on('get_file', async ({ filename }) => {
        try {
            if (!isValidFilename(filename)) {
                socket.emit('file_error', { message: 'Invalid filename.' });
                return;
            }
            const filepath = path.join(sessionDir, filename);
            try {
                const content = await fsPromises.readFile(filepath, 'utf8');
                socket.emit('file_content', { filename, content });
            } catch {
                socket.emit('file_error', { message: 'File not found.' });
            }
        } catch (err) {
            socket.emit('file_error', { message: err.message });
        }
    });

    socket.on('start_terminal', async ({ language, code }) => {
        if (childProcess) {
            childProcess.kill();
        }

        try {
            const filepath = await writeTempFile(language, code, sessionDir);
            const tempDir = path.dirname(filepath);
            const fileName = path.basename(filepath);

            let compileCmd, compileArgs;
            let runCmd, runArgs;

            // Determine commands based on language
            switch (language) {
                case 'javascript':
                    runCmd = 'node';
                    runArgs = [fileName];
                    break;
                case 'python':
                    runCmd = os.platform() === 'win32' ? 'python' : 'python3';
                    runArgs = ['-u', fileName]; // -u for unbuffered output
                    break;
                case 'c':
                    if (os.platform() === 'win32') {
                        compileCmd = 'gcc';
                        compileArgs = [fileName, '-o', `${fileName}.exe`];
                        runCmd = path.join(tempDir, `${fileName}.exe`);
                        runArgs = [];
                    } else {
                        compileCmd = 'gcc';
                        compileArgs = [fileName, '-o', `${fileName}.out`];
                        runCmd = path.join(tempDir, `${fileName}.out`);
                        runArgs = [];
                    }
                    break;
                case 'cpp':
                    if (os.platform() === 'win32') {
                        compileCmd = 'g++';
                        compileArgs = [fileName, '-o', `${fileName}.exe`];
                        runCmd = path.join(tempDir, `${fileName}.exe`);
                        runArgs = [];
                    } else {
                        compileCmd = 'g++';
                        compileArgs = [fileName, '-o', `${fileName}.out`];
                        runCmd = path.join(tempDir, `${fileName}.out`);
                        runArgs = [];
                    }
                    break;
                case 'java':
                    // Revert to Single-Step execution for speed (User Preference: Faster feedback over accurate timer)
                    // The JVM startup > 4s. Doing it twice (compile + run) = 9s. Doing it once = 4.5s.
                    runCmd = 'java';
                    // -g:none and -nowarn to speed up the internal compilation
                    runArgs = ['-Xmx128m', '-Xss512k', '-XX:+UseSerialGC', '-XX:TieredStopAtLevel=1', fileName];
                    break;
                default:
                    socket.emit('output', `Language ${language} not supported for local execution.\r\n`);
                    return;
            }

            // Compilation Step (for C/C++)
            if (compileCmd) {
                socket.emit('status', 'Compiling...');


                await new Promise((resolve, reject) => {
                    const compileProcess = spawn(compileCmd, compileArgs, { cwd: tempDir, shell: false });
                    let compileError = '';

                    compileProcess.stderr.on('data', (data) => {
                        compileError += data.toString();
                    });

                    compileProcess.on('close', (code) => {
                        if (code === 0) {
                            resolve();
                        } else {
                            reject(new Error(compileError || 'Compilation failed'));
                        }
                    });
                });


            }

            // Execution Step
            socket.emit('status', 'Running...');
            console.log(`Spawning: ${runCmd} ${runArgs.join(' ')} in ${tempDir}`);
            const startTime = Date.now();

            // Spawn the process
            childProcess = spawn(runCmd, runArgs, {
                cwd: tempDir,
                env: process.env,
                shell: false
            });

            // Security: Kill process after 30 seconds of no activity (DoS prevention)
            // This timeout resets each time user provides input
            const IDLE_TIMEOUT = 30000; // 30 seconds
            let killTimeout = setTimeout(() => {
                if (childProcess) {
                    childProcess.kill();
                    socket.emit('output', '\r\n⚠️ Execution timed out (Limit: 30s idle)\r\n');
                }
            }, IDLE_TIMEOUT);

            // Function to reset the timeout (called when input is received)
            const resetTimeout = () => {
                if (killTimeout) {
                    clearTimeout(killTimeout);
                }
                killTimeout = setTimeout(() => {
                    if (childProcess) {
                        childProcess.kill();
                        socket.emit('output', '\r\n⚠️ Execution timed out (Limit: 30s idle)\r\n');
                    }
                }, IDLE_TIMEOUT);
            };

            // Store resetTimeout on socket for access in input handler
            socket.resetTimeout = resetTimeout;

            const MAX_OUTPUT_SIZE = 50 * 1024; // 50KB limit
            let totalOutputSize = 0;

            let outputBuffer = '';
            let bufferTimeout = null;

            // Handle stdout with buffering to detect prompts
            childProcess.stdout.on('data', (data) => {
                const text = data.toString();
                totalOutputSize += text.length;

                if (totalOutputSize > MAX_OUTPUT_SIZE) {
                    if (childProcess) childProcess.kill();
                    socket.emit('output', '\r\n⚠️ Output limit exceeded (50KB). Process killed.\r\n');
                    return;
                }

                outputBuffer += text;

                // Clear any existing timeout
                if (bufferTimeout) {
                    clearTimeout(bufferTimeout);
                }

                // Check if this looks like a prompt (ends with ': ' or '> ' or similar)
                const promptPatterns = [': ', '> ', '? ', '>> ', '>>> '];
                const endsWithPrompt = promptPatterns.some(pattern => outputBuffer.trimEnd().endsWith(pattern));

                if (endsWithPrompt) {
                    // Send immediately as a prompt
                    socket.emit('output', outputBuffer);
                    outputBuffer = '';
                } else {
                    // Set a timeout to send buffered content if no more data arrives
                    bufferTimeout = setTimeout(() => {
                        if (outputBuffer.length > 0) {
                            socket.emit('output', outputBuffer);
                            outputBuffer = '';
                        }
                    }, 50); // 50ms buffer delay
                }
            });

            // Handle stderr
            childProcess.stderr.on('data', (data) => {
                const text = data.toString();
                // Filter out JVM warnings
                if (text.includes('OpenJDK 64-Bit Server VM warning')) {
                    return;
                }
                socket.emit('output', text);
            });

            // Handle exit
            childProcess.on('close', () => {
                const endTime = Date.now();
                const duration = ((endTime - startTime) / 1000).toFixed(3); // Convert to seconds

                // Send any remaining buffered output
                if (bufferTimeout) {
                    clearTimeout(bufferTimeout);
                }
                if (killTimeout) {
                    clearTimeout(killTimeout);
                }
                if (outputBuffer.length > 0) {
                    socket.emit('output', outputBuffer);
                    outputBuffer = '';
                }

                const cleanup = async () => {
                    try {
                        const unlinkIfExists = async (p) => {
                            try {
                                await fsPromises.unlink(p);
                            } catch (e) {
                                // Ignore if file doesn't exist
                            }
                        };

                        await unlinkIfExists(filepath); // Source file

                        // Executables (C/C++)
                        const exePathWin = filepath.replace(path.extname(filepath), '.exe');
                        const exePathLinux = filepath.replace(path.extname(filepath), '.out');
                        await unlinkIfExists(exePathWin);
                        await unlinkIfExists(exePathLinux);

                        // Java class files
                        if (language === 'java') {
                            const classPath = filepath.replace('.java', '.class');
                            await unlinkIfExists(classPath);
                        }
                    } catch (err) {
                        console.error("Cleanup error:", err.message);
                    }
                };
                cleanup();

                socket.emit('output', `\r\n=== Code Execution Successful ===\r\n`);
                socket.emit('output', `Execution Time: ${duration}s\r\n`);
                socket.emit('status', 'Completed');
                childProcess = null;
            });

            childProcess.on('error', (err) => {
                socket.emit('output', `\r\nFailed to start process: ${err.message}\r\n`);
                socket.emit('status', 'Error');
            });

        } catch (error) {
            socket.emit('output', `\r\nError: ${error.message}\r\n`);
            socket.emit('status', 'Error');
        }
    });

    socket.on('input', (data) => {
        if (childProcess && childProcess.stdin) {
            try {
                childProcess.stdin.write(data);
                // Reset the timeout when user provides input
                if (socket.resetTimeout) {
                    socket.resetTimeout();
                }
            } catch (err) {
                console.error("Write error:", err);
            }
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected:', socket.id);
        if (childProcess) {
            childProcess.kill();
        }
        // Cleanup session folder
        try {
            await fsPromises.rm(sessionDir, { recursive: true, force: true });
            console.log(`Session folder cleaned up: ${sessionDir}`);
        } catch (err) {
            console.error(`Failed to cleanup session folder: ${err.message}`);
        }
    });
});

const PORT = process.env.PORT || 3001;

// Warmup function to pre-load Java libraries into OS cache
const warmup = () => {
    console.log("🔥 Warming up compilers...");
    const compilers = ['java', 'python3', 'gcc', 'g++', 'node'];
    compilers.forEach(cmd => {
        const p = spawn(cmd, ['--version']);
        p.on('error', () => { }); // Ignore errors if tool is missing
    });
};

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    warmup();
});
