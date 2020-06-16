import {LocaleApi} from '@shopify/argo';

export enum SubscriptionManagementActions {
  Create = 'CREATE',
  Edit = 'EDIT',
  Remove = 'REMOVE',
  Add = 'ADD',
}

export interface SubscriptionData {
  action: SubscriptionManagementActions;
  sellingPlanGroupId: string;
  productId: string;
  variantId?: string;
  variantIds: string[];
}

export interface Settings {
  locale?: LocaleApi['locale'];
  data?: SubscriptionData;
}
