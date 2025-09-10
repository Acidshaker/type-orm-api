#!/bin/sh

echo "📦 Entrando al script de arranque..."

echo "🔍 Ejecutando migraciones..."
echo "🔗 DATABASE_URL desde shell: $DB_HOST:$DB_PORT/$DB_NAME"

npm run migration:run:prod

echo "🟢 Iniciando servidor..."
npm start
