import React from 'react';
import {Select, Page, Layout, Card} from '@shopify/polaris';
import {Settings} from './types';
import {LOCALES} from './constants';

interface Props {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
}

export function SubscriptionSettings({settings, updateSettings}: Props) {
  return (
    <Page title="Settings">
      <Layout>
        <Layout.Section oneHalf>
          <Card sectioned title="Locale">
            <Select
              label=""
              options={LOCALES}
              value={settings.locale}
              onChange={(value) => updateSettings({locale: value})}
            />
          </Card>
        </Layout.Section>
        <Layout.Section oneHalf>
          <Card sectioned>
            <pre>{JSON.stringify(settings, null, '  ')}</pre>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
