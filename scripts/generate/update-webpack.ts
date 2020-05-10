import fs from 'fs';
import path from 'path';

const replaceString = '<% FileExtension %>';

export function updateWebpack(fileExt: string) {
  const webpackConfigFileLocation = path.resolve(__dirname, '../../webpack.config.js');
  const file = fs.readFileSync(webpackConfigFileLocation);
  const text = file.toString();

  const updatedConfig = text.replace(replaceString, fileExt);

  try {
    fs.writeFileSync(webpackConfigFileLocation, updatedConfig);

    console.log('src/index.tsx file was created.');
  } catch (error) {
    console.error('src/index.tsx file could not be created: ', error);
  }
}
