import React from 'react';
import {Card, Select, Layout, Stack} from '@shopify/polaris';
import {SubscriptionManagementActions, Settings} from '../types';
import {actionFields, LOCALES} from '../config';
import {ActionField} from './action-field';

interface Props {
  settings: Settings;
  updateSettings: <V>(pathFn: (state: Settings) => V, value: V) => void;
}

export function SettingsForm({settings, updateSettings}: Props) {
  const selectedAction =
    settings.data?.action || SubscriptionManagementActions.Create;

  const dataForm = actionFields[selectedAction].map((field) => {
    const Field = ActionField[field];
    const key = `SubscriptionManagement-${field}`;
    return (
      <Field
        key={key}
        state={settings}
        updateState={updateSettings}
      />
    );
  });

  return (
    <Layout.Section oneHalf>
      <Card sectioned title="subscriptionManagement">
        <Stack vertical>{dataForm}</Stack>
      </Card>

      <Card sectioned title="Argo data">
        <Select
          label="locale.initialValue"
          options={LOCALES}
          value={settings.locale?.initialValue}
          onChange={(value) => updateSettings(state => state.locale?.initialValue, value)}
        />
      </Card>
    </Layout.Section>
  );
}
