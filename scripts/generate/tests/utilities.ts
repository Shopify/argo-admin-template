import path from 'path';
import {promises as fs} from 'fs';

import mocks from 'mock-fs';

export const MOCK_TEMPLATES = {
  'vanilla.template.js': 'vanilla template',
  'vanilla.template.ts': 'typescript template',
  'react.template.js': 'react template',
  'react.template.tsx': 'react typescript template',
};

function setup() {
  /* eslint-disable @typescript-eslint/naming-convention */
  mocks({
    '.github': {},
    docs: {},
    node_modules: {},
    'scripts/generate/templates/FAKE_EXTENSION_TYPE': MOCK_TEMPLATES,
    '.prettierrc': '',
    '.eslintrc.js': '',
    'jest.config.js': '',
    'package.json': mocks.load(path.resolve('.', 'package.json')),
    'README.md': '',
  });
  /* eslint-enable @typescript-eslint/naming-convention */
}

function teardown() {
  mocks.restore();
}

export const mockFs = {
  setup,
  teardown,
};

export async function readPackageJson() {
  const filePath = path.resolve('./package.json');
  return JSON.parse((await fs.readFile(filePath, 'utf8')).toString());
}
