# Imagen base ligera con Node.js
# FROM node:22-alpine
FROM node:22-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el certificado SSL manualmente
COPY certs/global-bundle.pem ./certs/global-bundle.pem

RUN ls -l ./certs

# Copia el resto del proyecto
COPY . .

# Da permisos al script de arranque
RUN chmod +x /app/entrypoint.sh

# Compila el proyecto TypeScript
RUN npm run build

# Usa el script como comando de arranque
CMD ["/app/entrypoint.sh"]
