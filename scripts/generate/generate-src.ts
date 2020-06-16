import fs from 'fs';
import path from 'path';

import {replaceString} from './replace-string';

export enum Framework {
  Vanilla = 'vanilla',
  React = 'react',
  VanillaTypescript = 'vanilla-typescript',
  ReactTypescript = 'react-typescript',
}

const indexPaths = {
  [Framework.Vanilla]: 'vanilla.js.template',
  [Framework.React]: 'react.jsx.template',
  [Framework.VanillaTypescript]: 'vanilla.ts.template',
  [Framework.ReactTypescript]: 'react.tsx.template',
};

const FILE_EXTENSION = '<% FileExtension %>';

export function generateSrc(extensionType: string, framework: Framework) {
  const indexPath = indexPaths[framework] || indexPaths[Framework.Vanilla];
  const ext = indexPath.split('.')[1];

  const file = fs.readFileSync(
    __dirname + `/templates/${extensionType}/${indexPath}`
  );
  const text = file.toString();

  try {
    const outDir = path.resolve(__dirname, '../../src');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outPath = path.resolve(__dirname, `../../src/index.${ext}`);
    fs.writeFileSync(outPath, text);

    console.log(`src/index.${ext} file was created.`);
  } catch (error) {
    console.error(`src/index.${ext} file could not be created: `, error);
  }

  replaceString('../../webpack.config.js', ext, FILE_EXTENSION);
  replaceString('../../host/Host.tsx', ext, FILE_EXTENSION);
}
