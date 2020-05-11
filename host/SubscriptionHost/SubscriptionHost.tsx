import React, {useState} from 'react';
import {ExtensionPoint} from '@shopify/argo';
import {Button, Navigation, Frame} from '@shopify/polaris';
import {
  ProductsMajorTwotone,
  SettingsMajorMonotone,
} from '@shopify/polaris-icons';

import {ModalContainer} from '../containers/ModalContainer';
import {HostProps} from '../types';
import {SubscriptionExtension} from './SubscriptionExtension';

export function SubscriptionHost(props: HostProps) {
  const [open, setOpen] = useState(false);

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        fill
        items={[
          {
            url: '',
            label: 'Subscription extension',
            icon: ProductsMajorTwotone,
            selected: true,
          },
        ]}
      />
      <Navigation.Section
        items={[
          {
            url: '/settings',
            label: 'Settings',
            icon: SettingsMajorMonotone,
          },
        ]}
      />
    </Navigation>
  );
  return (
    <Frame navigation={navigationMarkup}>
      <SubscriptionExtension>
        <Button onClick={() => setOpen(true)}>Create subscription plan</Button>
        <ModalContainer
          app={{name: 'App name', appId: 'app-id'}}
          open={open}
          defaultTitle="Default title"
          onClose={() => setOpen(false)}
          extensionPoint={ExtensionPoint.SubscriptionManagement}
          {...props}
        />
      </SubscriptionExtension>
    </Frame>
  );
}
