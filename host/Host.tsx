import React from 'react';
import {createPlainWorkerFactory} from '@shopify/web-worker';
import {Page, AppProvider} from '@shopify/polaris';
import {ExtensionPoint} from '@shopify/app-extensions-renderer';
import {host as components} from '@shopify/app-extensions-polaris-components';
import {AppExtension} from './AppExtension';
import data from './data/product-data.json';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: 'extension' */ '../src'),
);

export function Host() {
  return (
    <AppProvider i18n={{}}>
      <Page>
        <AppExtension
          script={reactThirdPartyWorker.url}
          extensionPoint={ExtensionPoint.AppLink}
          components={components}
          input={{data}}
        />
      </Page>
    </AppProvider>
  );
}
