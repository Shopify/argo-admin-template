import fs from 'fs';
import path from 'path';

import inquirer from 'inquirer';

export enum Template {
  Vanilla = 'js',
  React = 'js+react',
  VanillaTypescript = 'ts',
  ReactTypescript = 'ts+react',
}

const indexPaths = {
  [Template.Vanilla]: 'vanilla.template.js',
  [Template.React]: 'react.template.js',
  [Template.VanillaTypescript]: 'vanilla.template.ts',
  [Template.ReactTypescript]: 'react.template.tsx',
};

const choiceMap: {[key: string]: Template} = {
  'Vanilla JS': Template.Vanilla,
  React: Template.React,
  'Vanilla JS with Typescript': Template.VanillaTypescript,
  'React with Typescript': Template.ReactTypescript,
};

async function getTemplateIdentifier() {
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

  const {template: templateResponse} = response;

  return choiceMap[templateResponse];
}

function validateTemplateIdentifier(
  templateIdentifier: string
): Template | undefined {
  if (isTemplate(templateIdentifier)) {
    return templateIdentifier;
  }
  throw new Error(`Unknown template: ${templateIdentifier}`);
}

export async function generateSrc({
  extensionType,
  rootDir,
  templateIdentifier,
}: {
  extensionType: string;
  rootDir: string;
  templateIdentifier?: string;
}) {
  const template = templateIdentifier
    ? validateTemplateIdentifier(templateIdentifier)
    : await getTemplateIdentifier();
  console.log('✅ You selected:', template);

  const indexPath = indexPaths[template] || indexPaths[Template.Vanilla];
  const ext = path.extname(indexPath);

  const file = fs.readFileSync(
    `${__dirname}/templates/${extensionType}/${indexPath}`
  );
  const text = file.toString();

  try {
    if (!fs.existsSync(rootDir)) {
      fs.mkdirSync(rootDir);
    }

    const outFile = path.resolve(rootDir, `index${ext}`);
    fs.writeFileSync(outFile, text);

    const entry = path.relative(rootDir, outFile);
    console.log(`${entry} file was created.`);

    return {entry, template};
  } catch (error) {
    const errorMessage = `index${ext} file could not be created`;
    console.error(`${errorMessage}: `, error);
    throw new Error(errorMessage);
  }
}

function isTemplate(
  templateIdentifier: string
): templateIdentifier is Template {
  for (const t in Template) {
    if (Template[t] === templateIdentifier) {
      return true;
    }
  }
  return false;
}
