import React, {useState} from 'react';
import {ExtensionPoint} from '@shopify/argo';
import {Button, Navigation, Frame, TopBar} from '@shopify/polaris';
import {
  ProductsMajorTwotone,
  SettingsMajorMonotone,
} from '@shopify/polaris-icons';

import {ModalContainer} from '../containers/ModalContainer';
import {HostProps} from '../types';
import {SubscriptionExtension} from './SubscriptionExtension';
import {SubscriptionSettings} from './SubscriptionSettings';

const SETTINGS_PATH = '/settings';

export function SubscriptionHost(props: HostProps) {
  const [open, setOpen] = useState(false);
  const {pathname} = window.location;
  const [settingsActive, setSettingsActive] = useState(
    window.location.pathname === SETTINGS_PATH
  );

  const navigationMarkup = (
    <Navigation location={pathname}>
      <Navigation.Section
        fill
        items={[
          {
            url: '/',
            onClick: () => setSettingsActive(false),
            label: 'Subscription extension',
            icon: ProductsMajorTwotone,
            selected: !settingsActive,
          },
        ]}
      />
      <Navigation.Section
        items={[
          {
            url: SETTINGS_PATH,
            onClick: () => setSettingsActive(true),
            label: 'Settings',
            icon: SettingsMajorMonotone,
            selected: settingsActive,
          },
        ]}
      />
    </Navigation>
  );

  const settingsMarkup = <SubscriptionSettings />;

  const extensionMarkup = (
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
  );

  return (
    <Frame navigation={navigationMarkup} topBar={<TopBar />}>
      {settingsActive ? settingsMarkup : extensionMarkup}
    </Frame>
  );
}
