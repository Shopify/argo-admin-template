import fs from 'fs';
import path from 'path';

import {replaceString} from './replace-string';

export enum Template {
  Vanilla = 'Vanilla JS',
  React = 'React',
  VanillaTypescript = 'Vanilla JS with Typescript',
  ReactTypescript = 'React with Typescript',
}

const indexPaths = {
  [Template.Vanilla]: 'vanilla.js.template',
  [Template.React]: 'react.jsx.template',
  [Template.VanillaTypescript]: 'vanilla.ts.template',
  [Template.ReactTypescript]: 'react.tsx.template',
};

const FILE_EXTENSION = '<% FileExtension %>';

export function generateSrc(extensionType: string, template: Template) {
  const indexPath = indexPaths[template] || indexPaths[Template.Vanilla];
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
