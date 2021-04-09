import path from 'path';

import yargs from 'yargs';

import {generateSrc} from './generate-src';
import {extensionTypes} from './constants';
import {addScripts} from './update-package-json';
import {cleanUp} from './clean-up';

interface InitConfig {
  type: string;
  template?: string;
}

async function init({type, template: templateIdentifier}: InitConfig) {
  const extensionType =
    extensionTypes.find((t) => t === String(type)) || 'DEFAULT';

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
