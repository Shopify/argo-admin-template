import React from 'react';
import {AppProvider} from '@shopify/polaris';
import {ExtensionPoint} from '@shopify/argo-admin';

import {SubscriptionHost} from './SubscriptionHost';
import {HostProps} from './types';
import {ThemeConfig} from '@shopify/polaris/types/latest/src/utilities/theme';

const {default: Logo} = require('./logo.svg');

export {HostWrapper as Host};

declare const THIRD_PARTY_SCRIPT: string;
declare const EXTENSION_POINT: ExtensionPoint;

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
      <Host script={THIRD_PARTY_SCRIPT} />
    </AppProvider>
  );
}

function Host(props: HostProps) {
  switch (EXTENSION_POINT) {
    default:
      return <SubscriptionHost {...props} />;
  }
}
