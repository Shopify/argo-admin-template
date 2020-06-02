import fs from 'fs';
import path from 'path';

const replaceString = '<% FileExtension %>';

export function updateWebpack(fileExt: string) {
  const webpackConfigFileLocation = path.resolve(
    __dirname,
    '../../webpack.config.js'
  );
  const file = fs.readFileSync(webpackConfigFileLocation);
  const text = file.toString();

  const updatedConfig = text.replace(replaceString, fileExt);

  try {
    fs.writeFileSync(webpackConfigFileLocation, updatedConfig);

    console.log('webpack.config.js updated.');
  } catch (error) {
    console.error(
      "Couldn't update webpack.config.js. You can manually update it by replacing the <% FileExtension %> string with the proper file extension on your src/index file.",
      error
    );
  }
}
