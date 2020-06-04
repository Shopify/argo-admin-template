import {LocaleApi} from '@shopify/argo';
import {SellingPlanGroup} from './selling-plan-group';

export enum SubscriptionManagementActions {
  Create = 'CREATE',
  Edit = 'EDIT',
  Remove = 'REMOVE',
  Add = 'ADD',
  EditVariants = 'EDIT_VARIANTS',
}

export interface ProductData {
  action: SubscriptionManagementActions;
  sellingPlanGroup: SellingPlanGroup;
  productId: string;
  variantId: string;
  variantIds: string; // string[];
}

export interface Settings {
  locale?: LocaleApi['locale'];
  data?: ProductData;
}
