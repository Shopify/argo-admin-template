import fs from 'fs';
import path from 'path';
import {updateWebpack} from './update-webpack';

export enum Framework {
  Vanilla = 'vanilla',
  React = 'react',
  VanillaTypescript = 'vanilla-typescript',
  ReactTypescript = 'react-typescript',
}

const indexPaths = {
  [Framework.Vanilla]: 'vanilla.js.template',
  [Framework.React]: 'react.js.template',
  [Framework.VanillaTypescript]: 'vanilla.ts.template',
  [Framework.ReactTypescript]: 'react.tsx.template',
};

export function generateSrc(extensionPoint: string, framework: Framework) {
  const indexPath = (indexPaths[framework] || indexPaths[Framework.Vanilla]);
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

    console.log(`src/index.${ext} file was created.`);
  } catch (error) {
    console.error(`src/index.${ext} file could not be created: `, error);
  }

  updateWebpack(ext);
}
