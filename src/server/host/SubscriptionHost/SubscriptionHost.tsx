import React, {useState} from 'react';
import {
  Frame,
  Navigation,
  Page,
  Layout,
  TopBar,
  Card,
  PageActions,
  Modal,
  TextContainer,
} from '@shopify/polaris';
import {ProductsMajorTwotone} from '@shopify/polaris-icons';
import {ExtensionPoint} from '@shopify/argo-admin';
import merge from 'lodash/fp/merge';

import {HostProps} from '../types';
import {SubscriptionModalContainer} from './SubscriptionModalContainer';
import {SubscriptionManagementActions} from './types';
import {actionFields, defaultSettings} from './config';
import {usePageState, useSettings} from './useStorage';
import {SettingsForm} from './components/SettingsForm';

const actionToExtensionPoint: {[key: string]: ExtensionPoint} = {
  [SubscriptionManagementActions.Add]: ExtensionPoint.SubscriptionManagementAdd,
  [SubscriptionManagementActions.Create]:
    ExtensionPoint.SubscriptionManagementCreate,
  [SubscriptionManagementActions.Edit]:
    ExtensionPoint.SubscriptionManagementEdit,
  [SubscriptionManagementActions.Remove]:
    ExtensionPoint.SubscriptionManagementRemove,
};

export function SubscriptionHost(props: HostProps) {
  const [settings, updateSettings, setSettings] = useSettings();
  const [{extensionOpen}, setPageState] = usePageState();
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const selectedAction =
    settings.data?.action || SubscriptionManagementActions.Create;

  const outData = actionFields[selectedAction].reduce((_settings, key) => {
    // remove optional but undefined data values
    const value = settings.data?.[key];
    if (key !== 'action' && value !== undefined) {
      _settings[key] = settings.data?.[key];
    }
    return _settings;
  }, {} as any);
  const outSettings = merge(
    {...settings, data: outData},
    {
      locale: {
        initialValue: settings.locale,
        setOnChange() {
          console.log('Your onChange callback was set');
        },
      },
      sessionToken: {
        getSessionToken: () => Promise.resolve(settings.sessionToken),
      },
    },
  );

  const extension = (
    <SubscriptionModalContainer
      app={{name: 'App name', appId: 'app-id'}}
      open={extensionOpen}
      defaultTitle="Default title"
      onDone={() => console.log('done() was called')}
      onClose={() => setPageState((state) => state.extensionOpen, false)}
      extensionPoint={actionToExtensionPoint[selectedAction]}
      api={outSettings}
      {...props}
    />
  );

  const closeConfirmReset = () => setConfirmResetOpen(false);
  const confirmResetModal = (
    <Modal
      open={confirmResetOpen}
      onClose={closeConfirmReset}
      title="Are you sure you want to reset?"
      primaryAction={{
        content: 'Reset',
        destructive: true,
        onAction: () => {
          setSettings(defaultSettings);
          closeConfirmReset();
        },
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: closeConfirmReset,
        },
      ]}
    >
      <Modal.Section>
        <TextContainer>
          <p>Resetting your settings will permanently erase your changes</p>
        </TextContainer>
      </Modal.Section>
    </Modal>
  );

  const navigation = (
    <Navigation location="">
      <Navigation.Section
        fill
        items={[
          {
            url: '/',
            label: 'Subscription Management',
            icon: ProductsMajorTwotone,
            selected: true,
          },
        ]}
      />
    </Navigation>
  );

  return (
    <Frame navigation={navigation} topBar={<TopBar />}>
      <Page
        title="Subscription Management"
        primaryAction={{
          content: 'Show extension',
          onAction: () => setPageState((state) => state.extensionOpen, true),
        }}
      >
        {extension}
        {confirmResetModal}
        <Layout>
          <SettingsForm settings={settings} updateSettings={updateSettings} />
          <Layout.Section oneHalf>
            <Card sectioned>
              <pre>{JSON.stringify(outSettings, null, '  ')}</pre>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <PageActions
              primaryAction={{
                content: 'Show extension',
                onAction: () =>
                  setPageState((state) => state.extensionOpen, true),
              }}
              secondaryActions={[
                {
                  content: 'Reset',
                  destructive: true,
                  onAction: () => setConfirmResetOpen(true),
                },
              ]}
            />
          </Layout.Section>
        </Layout>
      </Page>
    </Frame>
  );
}
