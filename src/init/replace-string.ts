import path from 'path';
import fs from 'fs';

export function replaceString(filePath: string, fileExt: string, replaceToken: string) {
  const resolvedPath = path.resolve(
    __dirname,
    filePath
  );
  const file = fs.readFileSync(resolvedPath);
  const text = file.toString();

  const updatedConfig = text.replace(replaceToken, fileExt);

  try {
    fs.writeFileSync(resolvedPath, updatedConfig);

    console.log(`${resolvedPath} is updated`);
  } catch (error) {
    console.error(
      `Couldn't update file: ${resolvedPath}. You can manually update it by replacing the ${replaceToken} string with ${fileExt} in the file.`,
      error
    );
  }
}
