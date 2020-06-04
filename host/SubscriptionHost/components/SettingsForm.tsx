import React from 'react';
import {Card, Select, Layout, Stack} from '@shopify/polaris';
import {SubscriptionManagementActions, Settings, Path} from '../types';
import {actionFields, LOCALES} from '../config';
import {ActionField} from './action-field';
import {SellingPlanGroup} from './SellingPlanGroup';

interface Props {
  settings: Settings;
  updateSettings: (path: Path, value: any) => void;
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
        path={[field]}
        state={settings}
        updateState={updateSettings}
      />
    );
  });
  const hasSellingPlanGroup = actionFields[selectedAction].includes(
    'sellingPlanGroup'
  );

  return (
    <Layout.Section oneHalf>
      <Card sectioned title="subscriptionManagement">
        <Stack vertical>{dataForm}</Stack>
      </Card>

      {hasSellingPlanGroup && (
        <Card sectioned title="sellingPlanGroup">
          <SellingPlanGroup
            settings={settings}
            updateSettings={updateSettings}
          />
        </Card>
      )}

      <Card sectioned title="Argo data">
        <Select
          label="locale"
          options={LOCALES}
          value={settings.locale}
          onChange={(value) => updateSettings(['locale'], value)}
        />
      </Card>
    </Layout.Section>
  );
}
