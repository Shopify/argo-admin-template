import path from 'path';

import yargs from 'yargs';

import {generateSrc} from './generate-src';
import {extensionTypes} from './constants';
import {addScripts} from './update-package-json';
import {cleanUp} from './clean-up';

const UNKNOWN_TYPE_ERROR = (type: string) => `
Warning: Unknown extension point ${type}.
Please use a supported extension type and generate your project manually.
See README.md for instructions.
`;

interface InitConfig {
  type: string;
  template?: string;
}

async function init({type, template: templateIdentifier}: InitConfig) {
  const extensionType = String(type);

  if (extensionTypes.indexOf(extensionType) === -1) {
    console.error(UNKNOWN_TYPE_ERROR(type));
    process.exit(1);
  }

  console.log(`Create ${type} extension project`);

  const rootDir = path.resolve('.');

  const {entry, template} = await tryCatch(() =>
    generateSrc({
      extensionType,
      rootDir,
      templateIdentifier,
    })
  );

  await tryCatch(() => addScripts({entry, type}));

  await tryCatch(() => cleanUp({template}));
}

async function tryCatch<T = void>(fn: () => T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

init(yargs.argv as any);
