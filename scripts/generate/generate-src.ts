import fs from 'fs';
import path from 'path';

export function generateSrc(extensionPoint: string) {
  const file = fs.readFileSync(__dirname + '/index.tsx.template');
  const text = file.toString();

  const tsx = text.replace('<% EXTENSION_POINT %>', extensionPoint);

  try {
    const outDir = path.resolve(__dirname, '../../src');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outPath = path.resolve(__dirname, '../../src/index.tsx');
    fs.writeFileSync(outPath, tsx);

    console.log('src/index.tsx file was created.');
  } catch (error) {
    console.error('src/index.tsx file could not be created: ', error);
  }
}
