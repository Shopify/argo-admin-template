import React from 'react';
import {Page} from '@shopify/polaris';
import {ExtensionPoint} from '@shopify/app-extensions-renderer';
import {AppExtension} from './AppExtension';
import {HostProps} from './types';

export function PageHost({worker, components}: HostProps) {
  return (
    <Page>
      <AppExtension
        script={worker.url}
        extensionPoint={ExtensionPoint.AppLink}
        components={components}
      />
    </Page>
  );
}
