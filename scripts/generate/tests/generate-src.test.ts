import {promises as fs} from 'fs';

import {generateSrc, Template} from '../generate-src';

import {mockFs, MOCK_TEMPLATES} from './utilities';

describe('generateSrc', () => {
  beforeEach(() => mockFs.setup());

  afterEach(() => mockFs.teardown());

  test.each([
    [Template.Javascript, './index.js', MOCK_TEMPLATES['vanilla.template.js']],
    [
      Template.JavascriptReact,
      './index.js',
      MOCK_TEMPLATES['react.template.js'],
    ],
    [Template.Typescript, './index.ts', MOCK_TEMPLATES['vanilla.template.ts']],
    [
      Template.TypescriptReact,
      './index.tsx',
      MOCK_TEMPLATES['react.template.tsx'],
    ],
  ])(
    'generates index file',
    async (templateIdentifier, fileName, indexFile) => {
      await generateSrc({
        templateIdentifier,
        extensionType: 'FAKE_EXTENSION_TYPE',
        rootDir: '.',
      });

      const vanillaIndex = await fs.readFile(fileName);
      expect(vanillaIndex.toString()).toEqual(indexFile);
    }
  );

  it('throws on unknown extension', async () => {
    const generateUnknownExtension = () =>
      generateSrc({
        templateIdentifier: Template.Javascript,
        extensionType: '??',
        rootDir: '.',
      });

    await expect(generateUnknownExtension).rejects.toThrow();
  });

  it('throws on unknown template', async () => {
    const generateUnknownTemplate = () =>
      generateSrc({
        templateIdentifier: '??',
        extensionType: 'FAKE_EXTENSION_TYPE',
        rootDir: '.',
      });

    await expect(generateUnknownTemplate).rejects.toThrow();
  });
});
