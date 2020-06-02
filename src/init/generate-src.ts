import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import {updateWebpack} from './update-webpack';

export enum Framework {
  Vanilla = 'vanilla',
  React = 'react',
  VanillaTypescript = 'vanilla-typescript',
  ReactTypescript = 'react-typescript',
}

const indexPaths = {
  [Framework.Vanilla]: 'vanilla.template.js',
  [Framework.React]: 'react.template.js',
  [Framework.VanillaTypescript]: 'vanilla.template.ts',
  [Framework.ReactTypescript]: 'react.template.tsx',
};

export async function generateSrc(extensionPoint: string, framework: Framework) {
  const indexPath = indexPaths[framework] || indexPaths[Framework.Vanilla];
  
  const templateFilename = path.resolve(__dirname, 'templates', indexPath);
  const renderedTemplate = await ejs.renderFile(templateFilename, {extensionPoint});
  const ext = path.extname(templateFilename);

  try {
    const outDir = path.resolve(__dirname, '../../src');
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }

    const outPath = path.resolve(__dirname, `../../src/index${ext}`);
    fs.writeFileSync(outPath, renderedTemplate);

    console.log(`src/index${ext} file was created.`);
  } catch (error) {
    console.error(`src/index${ext} file could not be created: `, error);
  }

  updateWebpack(ext);
}
