#!/bin/bash

# Stop script on error
set -e

echo "🚀 Starting Deployment..."

echo "⬇️  Pulling latest changes..."
git pull origin Master

echo "🔄 Restarting containers..."
sudo docker compose down
sudo docker compose up -d --build

echo "✅ Deployment complete! Server is running."
