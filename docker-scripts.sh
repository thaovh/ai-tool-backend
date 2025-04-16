#!/bin/bash

# Function to display help
function show_help {
  echo "Usage: ./docker-scripts.sh [command]"
  echo ""
  echo "Commands:"
  echo "  build       Build the Docker images"
  echo "  up          Start the containers"
  echo "  down        Stop the containers"
  echo "  restart     Restart the containers"
  echo "  logs        Show logs from the containers"
  echo "  ps          List running containers"
  echo "  migrate     Run database migrations"
  echo "  seed        Run database seeds"
  echo "  help        Show this help message"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker is not installed. Please install Docker first."
  exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
  echo "Docker Compose is not installed. Please install Docker Compose first."
  exit 1
fi

# Process commands
case "$1" in
  build)
    echo "Building Docker images..."
    docker-compose build
    ;;
  up)
    echo "Starting containers..."
    docker-compose up -d
    ;;
  down)
    echo "Stopping containers..."
    docker-compose down
    ;;
  restart)
    echo "Restarting containers..."
    docker-compose restart
    ;;
  logs)
    echo "Showing logs..."
    docker-compose logs -f
    ;;
  ps)
    echo "Listing running containers..."
    docker-compose ps
    ;;
  migrate)
    echo "Running database migrations..."
    docker-compose exec app npm run migration:run
    ;;
  seed)
    echo "Running database seeds..."
    docker-compose exec app npm run seed:run
    ;;
  help|*)
    show_help
    ;;
esac 