import {
  Settings,
  SubscriptionManagementActions,
  SubscriptionData,
} from './types';
import {mockSellingPlan} from './mocks';

export const LOCALES = [
  'cs',
  'da',
  'de',
  'en',
  'es',
  'fr',
  'it',
  'ms',
  'nl',
  'nb',
  'pl',
  'pt-BR',
  'pt-PT',
  'fi',
  'sv',
  'tr',
  'hi',
  'th',
  'ja',
  'zh-CN',
  'zh-TW',
  'ko',
];

export const actionFields: Record<
  SubscriptionManagementActions,
  (keyof SubscriptionData)[]
> = {
  [SubscriptionManagementActions.Add]: ['action', 'productId'],
  [SubscriptionManagementActions.Create]: ['action', 'productId'],
  [SubscriptionManagementActions.Edit]: [
    'action',
    'productId',
    'sellingPlanGroup',
  ],
  [SubscriptionManagementActions.Remove]: [
    'action',
    'productId',
    'sellingPlanGroup',
  ],
};

export const defaultSettings: Settings = {
  data: {
    action: SubscriptionManagementActions.Create,
    productId: '1',
    variantId: '2',
    variantIds: '3',
    sellingPlanGroup: {
      id: '4',
      name: 'Selling Plan Group name',
      sellingPlans: [mockSellingPlan()],
    },
  },
  locale: 'en',
};
