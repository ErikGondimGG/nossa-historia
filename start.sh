#!/bin/bash
set -e

case "$1" in
  local)
    echo "▶ Subindo ambiente de desenvolvimento (hot reload em localhost:3000)..."
    docker compose -f docker-compose.dev.yml up --build
    ;;
  production)
    echo "▶ Subindo ambiente de produção (localhost:3000)..."
    docker compose -f docker-compose.prod.yml up --build -d
    echo "✓ Container rodando em background. Para parar: docker compose -f docker-compose.prod.yml down"
    ;;
  stop)
    echo "▶ Parando todos os containers..."
    docker compose -f docker-compose.dev.yml down 2>/dev/null || true
    docker compose -f docker-compose.prod.yml down 2>/dev/null || true
    echo "✓ Containers parados."
    ;;
  *)
    echo "Uso: ./start.sh [local|production|stop]"
    exit 1
    ;;
esac
