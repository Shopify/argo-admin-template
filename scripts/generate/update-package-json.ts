import {promises as fs} from 'fs';
import path from 'path';

import {Template} from './generate-src';

export function addScripts({
  entry,
  type,
  rootDir,
}: {
  entry: string;
  type: string;
  rootDir: string;
}) {
  return updatePackage((npmPackage) => {
    npmPackage.scripts.server = `argo-admin-cli server --entry="${entry}" --port=39351 --type=${type}`;
    npmPackage.scripts.build = `argo-admin-cli build --entry="${entry}"`;
    return npmPackage;
  }, rootDir);
}

export function cleanUpInitialize({
  template,
  rootDir,
}: {
  template: Template;
  rootDir: string;
}) {
  const isTypescript = [Template.Typescript, Template.TypescriptReact].includes(
    template
  );
  const isReact = [Template.JavascriptReact, Template.TypescriptReact].includes(
    template
  );

  return updatePackage((npmPackage) => {
    npmPackage.scripts.generate = undefined;
    npmPackage.scripts['type-check'] = undefined;
    npmPackage.scripts.format = undefined;
    npmPackage.scripts.lint = undefined;
    npmPackage.scripts.test = undefined;

    npmPackage.prettier = undefined;

    const {devDependencies} = npmPackage;

    npmPackage.devDependencies = {
      '@shopify/argo-admin-cli': devDependencies['@shopify/argo-admin-cli'],
      typescript: isTypescript ? devDependencies.typescript : undefined,
    };

    if (isReact) {
      npmPackage.dependencies['@shopify/argo-admin'] = undefined;
    } else {
      npmPackage.dependencies.react = undefined;
      npmPackage.dependencies['@shopify/argo-admin-react'] = undefined;
    }

    return npmPackage;
  }, rootDir);
}

export async function updatePackage(
  updateFn: (npmPackage: any) => any,
  rootDir: string
) {
  const npmPackageFile = path.resolve(rootDir, 'package.json');
  const npmPackageJson = (await fs.readFile(npmPackageFile)).toString();

  const npmPackage = updateFn(JSON.parse(npmPackageJson));

  const npmPackageJsonWithScripts = JSON.stringify(npmPackage, null, '  ');
  await fs.writeFile(npmPackageFile, npmPackageJsonWithScripts);
}
