import React from 'react';
import {Page} from '@shopify/polaris';
import {ExtensionPoint} from '@shopify/argo-admin';

import {StandardContainer} from './containers/StandardContainer';
import {HostProps} from './types';

export function PageHost(props: HostProps) {
  return (
    <Page>
      <StandardContainer extensionPoint={ExtensionPoint.AppLink} {...props} />
    </Page>
  );
}
