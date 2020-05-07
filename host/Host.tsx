import React from 'react';
import {ExtensionPoint} from '@shopify/argo';
import {components} from '@shopify/argo-host';
import {AppProvider} from '@shopify/polaris';
import {createPlainWorkerFactory} from '@shopify/web-worker';

import config from '../config';
import {PageHost} from './PageHost';
import {SubscriptionHost} from './SubscriptionsHost';
import {HostProps} from './types';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: 'extension' */ '../src'),
);

export {HostWrapper as Host};

function HostWrapper() {
  return (
    <AppProvider i18n={{}}>
      <Host script={reactThirdPartyWorker.url} components={components} />
    </AppProvider>
  );
}

function Host(props: HostProps) {
  switch (config.EXTENSION_POINT) {
    case ExtensionPoint.SubscriptionsManagement:
      return <SubscriptionHost {...props} />;
    default:
      return <PageHost {...props} />;
  }
}
