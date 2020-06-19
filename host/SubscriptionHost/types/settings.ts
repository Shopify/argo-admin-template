import {LocaleApi, ExtensionData, ExtensionPoint} from '@shopify/argo-admin';

export enum SubscriptionManagementActions {
  Create = 'CREATE',
  Edit = 'EDIT',
  Remove = 'REMOVE',
  Add = 'ADD',
}

export type SubscriptionData = {
  action: SubscriptionManagementActions;
} & ExtensionData<ExtensionPoint.SubscriptionManagementAdd> &
  ExtensionData<ExtensionPoint.SubscriptionManagementCreate> &
  ExtensionData<ExtensionPoint.SubscriptionManagementEdit> &
  ExtensionData<ExtensionPoint.SubscriptionManagementRemove>;

export interface Settings {
  locale?: LocaleApi['locale'];
  data?: SubscriptionData;
}
