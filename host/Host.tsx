import React from 'react';
import {AppProvider} from '@shopify/polaris';
import {createPlainWorkerFactory} from '@shopify/web-worker';

import config from '../config';
import {SubscriptionHost} from './SubscriptionHost';
import {HostProps} from './types';
import {ThemeConfig} from '@shopify/polaris/types/latest/src/utilities/theme';

const {default: Logo} = require('../src/assets/logo/logo.svg');

const reactThirdPartyWorker = createPlainWorkerFactory(() =>
  import(/* webpackChunkName: 'extension' */ '../src/index.<% FileExtension %>')
);

export {HostWrapper as Host};

function HostWrapper() {
  const theme: ThemeConfig = {
    colors: {
      topBar: {
        background: '#FAFAFA',
      },
    },
    logo: {
      topBarSource: Logo,
      url: '/',
      accessibilityLabel: 'Shopify',
    },
  };

  return (
    <AppProvider theme={theme} i18n={{}}>
      <Host script={reactThirdPartyWorker.url} />
    </AppProvider>
  );
}

function Host(props: HostProps) {
  switch (config.EXTENSION_TYPE) {
    default:
      return <SubscriptionHost {...props} />;
  }
}
