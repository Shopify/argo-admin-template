import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

export enum Template {
  Vanilla = 'vanilla',
  React = 'react',
  VanillaTypescript = 'vanilla-typescript',
  ReactTypescript = 'react-typescript',
}

const indexPaths = {
  [Template.Vanilla]: 'vanilla.js.template',
  [Template.React]: 'react.js.template',
  [Template.VanillaTypescript]: 'vanilla.ts.template',
  [Template.ReactTypescript]: 'react.tsx.template',
};

const choiceMap: {[key: string]: Template} = {
  'Vanilla JS': Template.Vanilla,
  React: Template.React,
  'Vanilla JS with Typescript': Template.VanillaTypescript,
  'React with Typescript': Template.ReactTypescript,
};

export async function generateSrc({
  extensionType,
  srcDir,
  rootDir,
}: {
  extensionType: string;
  srcDir: string;
  rootDir: string;
}) {
  const response = await inquirer.prompt<{template: string}>([
    {
      type: 'list',
      name: 'template',
      message: 'Select template:',
      min: 1,
      max: 1,
      instructions: false,
      choices: Object.keys(choiceMap),
    },
  ]);

  const {template} = response;

  const indexPath =
    indexPaths[choiceMap[template]] || indexPaths[Template.Vanilla];
  const ext = indexPath.split('.')[1];

  const file = fs.readFileSync(
    __dirname + `/templates/${extensionType}/${indexPath}`
  );
  const text = file.toString();

  try {
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir);
    }

    const outFile = path.resolve(srcDir, `index.${ext}`);
    fs.writeFileSync(outFile, text);

    const entry = path.relative(rootDir, outFile);
    console.log(`${entry} file was created.`);

    return {entry};
  } catch (error) {
    const errorMessage = `index.${ext} file could not be created`;
    console.error(`${errorMessage}: `, error);
    throw new Error(errorMessage);
  }
}
