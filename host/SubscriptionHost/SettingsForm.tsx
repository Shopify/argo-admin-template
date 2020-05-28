import React from 'react';
import {Card, Select, Layout} from '@shopify/polaris';
import {SubscriptionManagementActions, Settings, DeepPartial} from './types';
import {actionFields, LOCALES} from './config';
import {ActionField} from './action-field';

interface Props {
  settings: Settings;
  updateSettings: (patchSettings: DeepPartial<Settings>) => void;
}

export function SettingsForm({settings, updateSettings}: Props) {
  const selectedAction =
    settings.data?.action || SubscriptionManagementActions.Create;

  const dataForm = actionFields[selectedAction].map((field) => {
    const Field = ActionField[field];
    const key = `SubscriptionManagement-${field}`;
    return (
      <Field key={key} settings={settings} updateSettings={updateSettings} />
    );
  });

  return (
    <Layout.Section oneHalf>
      <Card title="Subscription Management data">{dataForm}</Card>

      <Card sectioned title="Locale">
        <Select
          label=""
          options={LOCALES}
          value={settings.locale}
          onChange={(value) => updateSettings({locale: value})}
        />
      </Card>
    </Layout.Section>
  );
}
