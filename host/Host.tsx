import React from 'react';
import {components} from '@shopify/argo-host';
import {AppProvider} from '@shopify/polaris';
import {createPlainWorkerFactory} from '@shopify/web-worker';

import config from '../config';
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
    default:
      return <SubscriptionHost {...props} />;
  }
}
