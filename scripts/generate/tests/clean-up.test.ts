import {promises as fs} from 'fs';

import {cleanUp} from '../clean-up';
import {Template} from '../generate-src';

import {mockFs, readPackageJson} from './utilities';

describe('cleanUp', () => {
  beforeEach(() => mockFs.setup());

  afterEach(() => mockFs.teardown());

  it('cleans up initialization setup', async () => {
    await cleanUp({template: Template.TypescriptReact, rootDir: '.'});

    const remainingFiles = await fs.readdir('.');
    expect(remainingFiles).toEqual([
      'README.md',
      'docs',
      'node_modules',
      'package.json',
    ]);

    const npmPackage = await readPackageJson();
    expect(npmPackage.scripts).not.toHaveProperty('generate');
    expect(npmPackage.scripts).not.toHaveProperty('type-check');
    expect(npmPackage.scripts).not.toHaveProperty('format');
    expect(npmPackage.scripts).not.toHaveProperty('lint');
    expect(npmPackage.scripts).not.toHaveProperty('test');

    expect(npmPackage).not.toHaveProperty('prettier');

    expect(npmPackage.devDependencies).toHaveProperty(
      '@shopify/argo-admin-cli'
    );
    expect(npmPackage.devDependencies).not.toHaveProperty(
      '@shopify/argo-admin'
    );
  });

  it('cleans up typescript and react if project is javascript only', async () => {
    await cleanUp({template: Template.Javascript, rootDir: '.'});

    const npmPackage = await readPackageJson();

    expect(npmPackage.devDependencies).not.toHaveProperty('typescript');
    expect(npmPackage.dependencies).not.toHaveProperty('react');
    expect(npmPackage.devDependencies).not.toHaveProperty(
      '@shopify/argo-admin-react'
    );
  });
});
