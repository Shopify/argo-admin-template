import path from 'path';
import {generateSrc} from './generate-src';
import {extensionTypes} from './constants';
import {addArgoAdminCli, addScripts} from './update-package-json';

const UNKNOWN_TYPE_ERROR = (type: string) => `
Warning: Unknown extension point ${type}.
Please use a supported extension type and generate your project manually.
See README.md for instructions.
`;

interface InitConfig {
  type: string;
}

export async function init({type}: InitConfig) {
  const extensionType = String(type);

  if (extensionTypes.indexOf(extensionType) === -1) {
    console.error(UNKNOWN_TYPE_ERROR(type));
    process.exit(1);
  }

  console.log('Create ', type, ' extension project');

  const rootDir = path.resolve('.');

  await tryCatch(addArgoAdminCli);

  const {entry} = await tryCatch(() =>
    generateSrc({
      extensionType,
      rootDir,
      srcDir: rootDir,
    })
  );

  await tryCatch(() => addScripts({entry, type}));
}

async function tryCatch<T = void>(fn: () => T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
