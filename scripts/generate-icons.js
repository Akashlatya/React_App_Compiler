/* eslint-disable no-undef */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '../public/logo.svg');
const publicDir = path.join(__dirname, '../public');

const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 }
];

async function generate() {
    console.log('Generating icons from', input);
    if (!fs.existsSync(input)) {
        console.error('Input file not found!');
        process.exit(1);
    }

    for (const icon of sizes) {
        try {
            await sharp(input)
                .resize(icon.size, icon.size)
                .toFile(path.join(publicDir, icon.name));
            console.log(`Generated ${icon.name}`);
        } catch (err) {
            console.error(`Error generating ${icon.name}:`, err);
        }
    }

    // Attempt to create favicon.ico (as 32x32 png, browsers are usually forgiving)
    // standard sharp cannot write .ico, so we write .png content to .ico file
    try {
        const icoPath = path.join(publicDir, 'favicon.ico');
        await sharp(input)
            .resize(32, 32)
            .png() // Ensure PNG format buffer
            .toFile(icoPath);
        console.log('Generated favicon.ico (PNG content)');
    } catch (err) {
        console.error('Error generating favicon.ico:', err);
    }
}

generate();
