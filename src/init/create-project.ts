import {promisify} from 'util';
import path from 'path';
import fs from 'fs';
import inquirer from 'inquirer';

const exists = promisify(fs.exists);
const mkdir = promisify(fs.mkdir);

export async function createProject() {
  const {projectName} = await inquirer.prompt<{projectName: string}>([{
    type: 'input',
    name: 'projectName',
    message: 'Project name:',
    default: 'argo-project',
  }]);

  const projectDir = path.resolve('.', projectName);

  if (!(await exists(projectDir))) {
    await mkdir(projectDir);

    process.chdir(projectDir);
  }

  console.log(`Project directory ${projectName} created`);

  return {projectName, rootDir: projectDir};
}
