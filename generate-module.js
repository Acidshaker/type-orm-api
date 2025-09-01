const fs = require("fs");
const path = require("path");

const moduleName = process.argv[2];
if (!moduleName) {
  console.error("Por favor indica el nombre del módulo, Ejemplo: node generate-module.js accounts");
  process.exit(1);
}

const basePath = path.join(__dirname, "src/modules", moduleName);

const folders = [
  "controllers",
  "dto",
  "models",
  "services",
  "routes",
  "migrations"
];

// Crear carpetas
folders.forEach((folder) => {
  const folderPath = path.join(basePath, folder);
  fs.mkdirSync(folderPath, { recursive: true });
  console.log(`Carpeta creada: ${folderPath}`);
});

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const className = capitalize(moduleName);

const filesToCreate = [
  {
    folder: "controllers",
    file: `${moduleName}.controller.ts`,
    content: `// Aquí defines tus controllers para ${moduleName}`
  },
  {
    folder: "dto",
    file: `${moduleName}-create.dto.ts`,
    content: `// DTO para crear ${moduleName}`
  },
  {
    folder: "dto",
    file: `${moduleName}-update.dto.ts`,
    content: `// DTO para actualizar ${moduleName}`
  },
  {
    folder: "dto",
    file: `${moduleName}-read.dto.ts`,
    content: `// DTO para leer ${moduleName}`
  },
  {
    folder: "models",
    file: `${moduleName}.entity.ts`,
    content: `// Aquí defines tus modelos / entidades de ${moduleName} con TypeORM`
  },
  {
    folder: "services",
    file: `${moduleName}.service.ts`,
    content: `// Aquí defines tus servicios de ${moduleName}`
  },
  {
    folder: "routes",
    file: `${moduleName}.routes.ts`,
    content: `// Aquí defines tus rutas / endpoints de ${moduleName}`
  },
  {
    folder: "",
    file: "index.ts",
    content: `// Exporta el router de este módulo`
  }
];

filesToCreate.forEach(({ folder, file, content }) => {
  const filePath = path.join(basePath, folder, file);
  fs.writeFileSync(filePath, content);
  console.log(`Archivo creado: ${filePath}`);
});

console.log(`\nMódulo "${moduleName}" generado completamente.\n`);
