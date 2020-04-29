import React from 'react';
import {AppProvider} from '@shopify/polaris';
import {createPlainWorkerFactory} from '@shopify/web-worker';
import {host as components} from '@shopify/app-extensions-polaris-components';
import {ExtensionPoint} from '@shopify/app-extensions-renderer';
import config from '../config';
import {SubscriptionHost} from './SubscriptionsHost';
import {PageHost} from './PageHost';
import {HostProps} from './types';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: 'extension' */ '../src'),
);

export {HostWrapper as Host}

function HostWrapper() {
  return (
    <AppProvider i18n={{}}>
      <Host worker={reactThirdPartyWorker} components={components} />
    </AppProvider>
  ) 
}

function Host(props: HostProps) {
  switch (config.EXTENSION_POINT) {
    case ExtensionPoint.SubscriptionsManagement:
      return <SubscriptionHost {...props} />;
    default:
      return <PageHost {...props} />;
  }
}
