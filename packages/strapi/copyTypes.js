/* Originally from: https://github.com/strapi-community/strapi-typed-fronend/blob/main/copyTypes.js */

const fs = require('fs');
const path = require('path');

const BACKEND_SEGMENT = '../../packages/strapi'
const FRONTEND_SEGMENT = '../../packages/client/'
const BACKEND_TYPE_LOCATION = 'types/generated/'
const FRONTEND_TYPE_LOCATION = 'src/lib/types/generated/'

const sourcePath = path.join(__dirname, `./${BACKEND_SEGMENT}/${BACKEND_TYPE_LOCATION}/contentTypes.d.ts`);
const destinationPath = path.join(__dirname, `./${FRONTEND_SEGMENT}/${FRONTEND_TYPE_LOCATION}/contentTypes.d.ts`);
console.log(destinationPath)
const destinationDir = path.dirname(destinationPath);

// Check if source file exists
if (!fs.existsSync(sourcePath)) {
  console.error(`Source file does not exist: ${sourcePath}`);
  process.exit(1);
}

// Ensure destination directory exists or create it
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, { recursive: true });
}

// Read the source file, modify its content and write to the destination file
const content = fs.readFileSync(sourcePath, 'utf8');
const modifiedContent = content.replace('@strapi/strapi', '@strapi/types');

fs.writeFile(destinationPath, modifiedContent, (err) => {
  if (err) {
    console.error(`Error writing to destination file: ${err}`);
    process.exit(1);
  } else {
    console.log('File copied and modified successfully!');
  }
});
