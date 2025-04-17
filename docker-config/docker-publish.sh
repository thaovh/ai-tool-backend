#!/bin/bash

# Configuration
DOCKER_USERNAME="thaovh"
IMAGE_NAME="ai-tool-backend"
VERSION="1.0.0"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker first."
  exit 1
fi

# Check if user is logged in to Docker Hub
if ! docker info | grep -q "Username"; then
  echo "You are not logged in to Docker Hub. Please login first using: docker login"
  exit 1
fi

# Build the image
echo "Building Docker image..."
docker build -t ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION} .
docker tag ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION} ${DOCKER_USERNAME}/${IMAGE_NAME}:latest

# Push the image
echo "Pushing image to Docker Hub..."
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}
docker push ${DOCKER_USERNAME}/${IMAGE_NAME}:latest

echo "Done! Image has been pushed to Docker Hub."
echo "You can pull it using: docker pull ${DOCKER_USERNAME}/${IMAGE_NAME}:${VERSION}" 