import fs from 'fs';
import path from 'path';

import inquirer from 'inquirer';

export enum Template {
  Javascript = 'javascript',
  Typescript = 'typescript',
  JavascriptReact = 'javascript-react',
  TypescriptReact = 'typescript-react',
}

const indexPaths = {
  [Template.Javascript]: 'vanilla.template.js',
  [Template.Typescript]: 'vanilla.template.ts',
  [Template.JavascriptReact]: 'react.template.js',
  [Template.TypescriptReact]: 'react.template.tsx',
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
      choices: Object.values(Template),
    },
  ]);

  const {template} = response;
  return template as Template;
}

function validateTemplateIdentifier(templateIdentifier: string): Template {
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

  generate_readme({extensionType, rootDir})

  const indexPath = indexPaths[template] || indexPaths[Template.Javascript];
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

function generate_readme({extensionType, rootDir}: {extensionType: string; rootDir: string;}) {
  const src = `${__dirname}/templates/${extensionType}/README.template.md`;
  const dst = path.resolve(rootDir, `README.md`)
  try {
    fs.writeFileSync(dst, fs.readFileSync(src).toString());
  } catch (error) {
    const errorMessage = `README.md file could not be created`;
    console.error(`${errorMessage}: `, error);
    throw new Error(errorMessage);
  }
}
