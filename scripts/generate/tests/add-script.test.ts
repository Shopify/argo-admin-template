import {addScripts} from '../update-package-json';

import {mockFs, readPackageJson} from './utilities';

describe('addScripts', () => {
  beforeEach(() => mockFs.setup());

  afterEach(() => mockFs.teardown());

  it('adds build and server scripts', async () => {
    const entry = 'path/to/entry';
    const type = 'type';
    await addScripts({entry, type, rootDir: '.'});

    const npmPackage = await readPackageJson();

    expect(npmPackage.scripts).toHaveProperty('server');
    expect(npmPackage.scripts.server).toContain(entry);
    expect(npmPackage.scripts.server).toContain(type);

    expect(npmPackage.scripts).toHaveProperty('build');
    expect(npmPackage.scripts.build).toContain(entry);
  });
});
