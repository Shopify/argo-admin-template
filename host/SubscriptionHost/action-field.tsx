import React from 'react';
import {Card, TextField, Select} from '@shopify/polaris';
import {Settings, DeepPartial, ProductData, SubscriptionManagementActions} from './types';

interface Props {
  settings: Settings;
  updateSettings: (patchSettings: DeepPartial<Settings>) => void;
}

const ACTIONS = [
  SubscriptionManagementActions.Create,
  SubscriptionManagementActions.Edit,
  SubscriptionManagementActions.Remove,
  SubscriptionManagementActions.Add,
  SubscriptionManagementActions.EditVariants,
];

function BasicDataField({settings, updateSettings, key}: Props & {key: keyof ProductData}) {
  return (
   <Card.Section>
     <TextField
       label={key}
       value={settings.data?.[key]}
       onChange={value => updateSettings({data: {[key]: value}})}
     />
   </Card.Section>
 );
}

function Action({settings, updateSettings}: Props) {
  return (
    <Card.Section>
      <Select
        label="action"
        options={ACTIONS}
        value={settings.data?.action}
        onChange={(action: SubscriptionManagementActions) =>
          updateSettings({data: {action}})
        }
      />
    </Card.Section>
  )
}

function ProductId({settings, updateSettings}: Props) {
  return BasicDataField({settings, updateSettings, key: 'productId'});
}

function SellingPlanGroup({settings, updateSettings}: Props) {
  return BasicDataField({settings, updateSettings, key: 'sellingPlanGroup'});
}

function VariantId({settings, updateSettings}: Props) {
  return BasicDataField({settings, updateSettings, key: 'variantId'});
}

function VariantIds({settings, updateSettings}: Props) {
  return BasicDataField({settings, updateSettings, key: 'variantIds'});
}

export const ActionField: Record<keyof ProductData, (props: Props) => React.ReactElement> = {
  action: Action,
  productId: ProductId,
  sellingPlanGroup: SellingPlanGroup,
  variantId: VariantId,
  variantIds: VariantIds,
};
