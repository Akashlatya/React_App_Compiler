# Use the latest LTS (Long Term Support) Node.js version
FROM node:lts-slim

# Install necessary compilers and tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    openjdk-17-jdk-headless \
    gcc \
    g++ \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy everything from build context
COPY . .

# Debug: List what was copied
RUN ls -la /app

# Install dependencies
RUN npm install --production

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "index.js"]
