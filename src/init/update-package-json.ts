import {promisify} from 'util';
import fs from 'fs';
import path from 'path';

export async function addArgoAdminCli() {
  await updatePackage((npmPackage) => {
    if (!npmPackage.devDependencies) {
      npmPackage.devDependencies = {};
    }
    npmPackage.devDependencies['@shopify/argo-admin-cli'] = 'latest';
    return npmPackage;
  });
}

export async function addScripts({entry, type}: {entry: string, type: string}) {
  await updatePackage((npmPackage) => {
    npmPackage.scripts['server'] = `argo-admin-cli server --entry="${entry}" --port=39351 --type=${type}`;
    npmPackage.scripts['build'] = `argo-admin-cli build --entry="${entry}"`;
    return npmPackage;
  })
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
