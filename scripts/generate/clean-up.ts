import path from 'path';
import {exec} from 'child_process';

import {cleanUpInitialize} from './update-package-json';
import {Template} from './generate-src';

export async function cleanUp({template}: {template: Template}) {
  exec(`rm -rf ${path.resolve('.', 'scripts')}`);
  exec(`rm -rf ${path.resolve('.', '.prettierrc')}`);
  exec(`rm -rf ${path.resolve('.', '.eslintrc.js')}`);
  exec(`rm -rf ${path.resolve('.', '.github')}`);

  try {
    await cleanUpInitialize({template});
    console.log('package.json updated.');
  } catch (error) {
    console.error(
      'Could not update package.json. You can manually update it by deleting the scripts.generate command.'
    );
    throw error;
  }
}
