import React from 'react';
import {createPlainWorkerFactory} from '@shopify/web-worker';
import {SubscriptionHost} from './SubscriptionsHost';
import {PageHost} from './PageHost';
import {AppProvider} from '@shopify/polaris';
import {host as components} from '@shopify/app-extensions-polaris-components';
import {HostProps} from './types';

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: 'extension' */ '../src'),
);

const extensionType = process.env.EXTENSION_TYPE;

export {HostWrapper as Host}

function HostWrapper() {
  return (
    <AppProvider i18n={{}}>
      {getHost()}
    </AppProvider>
  ) 
}

function getHost() {
  const props: HostProps = {
    worker: reactThirdPartyWorker,
    components,
  }

  switch (extensionType) {
    case 'SUBSCRIPTION_MANAGEMENT':
      return <SubscriptionHost {...props} />;
    default:
      return <PageHost {...props} />;
  }
}
