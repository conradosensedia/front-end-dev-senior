#!/bin/bash
# setup.sh

echo "🚀 Iniciando setup do projeto..."

if [ ! -f .env ]; then
    echo "📄 Criando arquivo .env a partir do .env.example..."
    cp .env.example .env
else
    echo "✅ Arquivo .env já existe. Pulando cópia."
fi

echo "📦 Instalando dependências do Composer..."
composer install

echo "🐳 Subindo containers..."
./vendor/bin/sail up -d --build

echo "⏳ Aguardando banco de dados estabilizar (10s)..."
sleep 10

echo "🛠️ Configurando Laravel dentro do container..."
./vendor/bin/sail artisan key:generate
./vendor/bin/sail artisan migrate --force

echo "✅ Tudo pronto! Acesse http://localhost:5173/ para ver o projeto em ação."
