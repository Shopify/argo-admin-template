import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Template} from './generate-src';

function templateIsTypescript(template: Template) {
  return [Template.VanillaTypescript, Template.ReactTypescript].includes(
    template
  );
}

function templateIsReact(template: Template) {
  return [Template.React, Template.ReactTypescript].includes(template);
}

export function addScripts({
  entry,
  type,
  template,
}: {
  entry: string;
  type: string;
  template: Template;
}) {
  const typescriptFlag = templateIsTypescript(template) ? ' --typescript' : '';

  return updatePackage((npmPackage) => {
    npmPackage.scripts[
      'server'
    ] = `argo-admin-cli server --entry="${entry}" --port=39351 --type=${type}${typescriptFlag}`;
    npmPackage.scripts['build'] = `argo-admin-cli build --entry="${entry}"`;
    return npmPackage;
  });
}

export function cleanUpInitialize({template}: {template: Template}) {
  const isTypescript = templateIsTypescript(template);
  const isReact = templateIsReact(template);

  return updatePackage((npmPackage) => {
    npmPackage.scripts.generate = undefined;
    const {devDependencies} = npmPackage;

    npmPackage.devDependencies = {
      '@shopify/argo-admin-cli': devDependencies['@shopify/argo-admin-cli'],
      typescript: isTypescript ? devDependencies['typescript'] : undefined,
    };

    if (isReact) {
      npmPackage.dependencies['@shopify/argo-admin'] = undefined;
    } else {
      npmPackage.dependencies.react = undefined;
      npmPackage.dependencies['@shopify/argo-admin-react'] = undefined;
    }

    return npmPackage;
  });
}

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

export async function updatePackage(updateFn: (npmPackage: any) => any) {
  const npmPackageFile = path.resolve('.', 'package.json');
  const npmPackageJson = (await readFile(npmPackageFile)).toString();

  const npmPackage = updateFn(JSON.parse(npmPackageJson));

  const npmPackageJsonWithScripts = JSON.stringify(npmPackage, null, '  ');
  await writeFile(npmPackageFile, npmPackageJsonWithScripts);
}
