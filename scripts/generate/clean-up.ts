import fs from 'fs';
import path from 'path';
import {exec} from 'child_process';

export function cleanUp() {
  const packagePath = path.resolve(__dirname, '../../package.json');
  const file = fs.readFileSync(packagePath);
  const json = JSON.parse(file.toString());

  delete json.scripts.generate;
  delete json.scripts['clean-up'];
  delete json.devDependencies['@types/yargs'];
  delete json.devDependencies['inquirer'];
  delete json.devDependencies['ts-node'];
  delete json.devDependencies['yargs'];

  const newPackage = JSON.stringify(json, null, 2);

  exec(`rm -rf ${path.resolve(__dirname, '../../scripts')}`);
  exec(`rm -rf ${path.resolve(__dirname, '../../.prettierrc')}`);

  try {
    fs.writeFileSync(packagePath, newPackage);

    console.log('package.json updated.');
  } catch (error) {
    console.error(
      'Could not update package.json. You can manually update it by deleting the scripts.generate command.',
      error
    );
  }
}
