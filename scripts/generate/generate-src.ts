import fs from 'fs';
import path from 'path';
import {updateWebpack} from './update-webpack';

export enum Framework {
  vanilla = 'vanilla',
  react = 'react',
}

const indexPaths = {
  [Framework.react]: 'react.tsx.template',
  [Framework.vanilla]: 'vanilla.ts.template',
};

export function generateSrc(extensionPoint: string, framework: Framework) {
  const indexPath = (indexPaths[framework] || indexPaths[Framework.vanilla]);
  const ext = indexPath.split('.')[1];

  const file = fs.readFileSync(__dirname + `/templates/${indexPath}`);
  const text = file.toString();

  const tsx = text.replace('<% EXTENSION_POINT %>', extensionPoint);

  try {
    const outDir = path.resolve(__dirname, '../../src');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outPath = path.resolve(__dirname, `../../src/index.${ext}`);
    fs.writeFileSync(outPath, tsx);

    console.log('src/index.tsx file was created.');
  } catch (error) {
    console.error('src/index.tsx file could not be created: ', error);
  }

  updateWebpack(ext);
}
