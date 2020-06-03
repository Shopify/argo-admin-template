import {LocaleApi} from '@shopify/argo';

export enum SubscriptionManagementActions {
  Create = 'CREATE',
  Edit = 'EDIT',
  Remove = 'REMOVE',
  Add = 'ADD',
  EditVariants = 'EDIT_VARIANTS',
}

export interface ProductData {
  action: SubscriptionManagementActions;
  sellingPlanGroup: any;
  productId: string;
  variantId: string;
  variantIds: string; // string[];
}

export interface Settings {
  locale?: LocaleApi['locale'];
  data?: ProductData;
}

export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? {[P in keyof T]?: DeepPartial<T[P]>}
  : T;
