import fs from 'fs';
import path from 'path';
import {promisify} from 'util';
import {Template} from './generate-src';

export function addScripts({entry, type}: {entry: string, type: string}) {
  return updatePackage((npmPackage) => {
    npmPackage.scripts['server'] = `argo-admin-cli server --entry="${entry}" --port=39351 --type=${type}`;
    npmPackage.scripts['build'] = `argo-admin-cli build --entry="${entry}"`;
    return npmPackage;
  });
}

export function cleanUpInitialize({template}: {template: Template}) {
  const isTypescript = [Template.VanillaTypescript, Template.ReactTypescript].includes(template);
  const isReact = [Template.React, Template.ReactTypescript].includes(template);

  return updatePackage((npmPackage) => {
    npmPackage.scripts.generate = undefined;
    const {devDependencies} = npmPackage;
    npmPackage.devDependencies = {
      '@shopify/argo-admin-cli': devDependencies['@shopify/argo-admin-cli'],
      typescript: isTypescript ? devDependencies['typescript'] : undefined,
    };
    npmPackage.dependencies.react = isReact
      ? npmPackage.dependencies.react
      : undefined;
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
