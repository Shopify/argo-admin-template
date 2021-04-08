import path from 'path';
import {promises as fs} from 'fs';

import {cleanUpInitialize} from './update-package-json';
import {Template} from './generate-src';

export async function cleanUp({
  template,
  rootDir,
}: {
  template: Template;
  rootDir: string;
}) {
  await Promise.all([
    fs.rmdir(path.resolve('.', 'scripts'), {recursive: true}),
    fs.rmdir(path.resolve(rootDir, '.prettierrc'), {recursive: true}),
    fs.rmdir(path.resolve(rootDir, '.eslintrc.js'), {recursive: true}),
    fs.rmdir(path.resolve(rootDir, '.github'), {recursive: true}),
    fs.rmdir(path.resolve(rootDir, 'jest.config.js'), {recursive: true}),

    cleanUpInitialize({template, rootDir})
      .then(() => console.log('package.json updated.'))
      .catch((error) => {
        console.error(
          'Could not update package.json. You can manually update it by deleting the scripts.generate command.'
        );
        throw error;
      }),
  ]);
}
