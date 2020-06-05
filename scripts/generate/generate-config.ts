import fs from 'fs';
import path from 'path';

const template = ({extensionType}: {extensionType: string}) => `
const config = {
  EXTENSION_TYPE: '${extensionType}',
};

export default config;
`;

export function generateConfig(extensionType: string) {
  try {
    const outPath = path.resolve(__dirname, '../../config.ts');
    fs.writeFileSync(outPath, template({extensionType}));

    console.log('config.ts file was created.');
  } catch (error) {
    console.error('config.ts file could not be created: ', error);
  }
}
