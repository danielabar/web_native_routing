#!/bin/bash
# build.sh - Simple bash-based build script

# Change to project root directory (in case script is run from elsewhere)
cd "$(dirname "$0")/.."

# Extract deploy base path from package.json
DEPLOY_BASE_PATH=$(node -p "require('./package.json').deploy_base_path || '/web_native_routing/'")

# Clean and create dist directory
rm -rf dist
mkdir -p dist

# Copy all files except excluded directories and deployment files
rsync -av \
  --exclude='dist' \
  --exclude='node_modules' \
  --exclude='.git' \
  --exclude='scratch' \
  --exclude='docs' \
  --exclude='.editorconfig' \
  --exclude='.gitignore' \
  --exclude='.nvmrc' \
  --exclude='scripts' \
  --exclude='package-lock.json' \
  --exclude='package.json' \
  --exclude='README.md' \
  . dist/

# Replace basePath in config.js using sed
sed -i.bak "s|basePath: '[^']*'|basePath: '$DEPLOY_BASE_PATH'|g" dist/js/config.js
rm -f dist/js/config.js.bak  # Remove backup file

echo "✅ Build complete! Deploy base path set to: $DEPLOY_BASE_PATH"
