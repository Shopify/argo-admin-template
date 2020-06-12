import {LocaleApi} from '@shopify/argo';
import {SellingPlanGroup} from './selling-plan-group';

export enum SubscriptionManagementActions {
  Create = 'CREATE',
  Edit = 'EDIT',
  Remove = 'REMOVE',
  Add = 'ADD',
}

export interface SubscriptionData {
  action: SubscriptionManagementActions;
  sellingPlanGroup: SellingPlanGroup;
  productId: string;
  variantId: string;
  variantIds: string; // string[];
}

export interface Settings {
  locale?: LocaleApi['locale'];
  data?: SubscriptionData;
}
