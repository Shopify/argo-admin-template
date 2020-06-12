import React, {useState, useMemo} from 'react';
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
import {ExtensionPoint} from '@shopify/argo';

import {HostProps} from '../types';
import {ModalContainer} from '../containers/ModalContainer';
import {SubscriptionManagementActions} from './types';
import {actionFields, defaultSettings} from './config';
import {usePageState, useSettings} from './useStorage';
import {SettingsForm} from './components/SettingsForm';

export function SubscriptionHost(props: HostProps) {
  const [settings, updateSettings, setSettings] = useSettings();
  const [{extensionOpen}, setPageState] = usePageState();
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  const selectedAction =
    settings.data?.action || SubscriptionManagementActions.Create;

  const outData = actionFields[selectedAction].reduce(
    (_settings, key) => {
      _settings[key] = settings.data?.[key];
      return _settings;
    },
    {action: settings.data?.action} as any
  );
  const outSettings = {...settings, data: outData};

  const extensionPoint = useMemo(() => {
    switch (settings.data?.action) {
      case SubscriptionManagementActions.Add:
        return ExtensionPoint.SubscriptionManagementAdd;
      case SubscriptionManagementActions.Create:
        return ExtensionPoint.SubscriptionManagementCreate;
      case SubscriptionManagementActions.Edit:
        return ExtensionPoint.SubscriptionManagementEdit;
      case SubscriptionManagementActions.Remove:
        return ExtensionPoint.SubscriptionManagementRemove;
      default:
        return ExtensionPoint.SubscriptionManagementCreate;
    }
  }, [settings.data?.action]);

  const extension = (
    <ModalContainer
      app={{name: 'App name', appId: 'app-id'}}
      open={extensionOpen}
      defaultTitle="Default title"
      onClose={() => setPageState((state) => state.extensionOpen, false)}
      extensionPoint={extensionPoint}
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
