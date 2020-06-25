import {
  Settings,
  SubscriptionManagementActions,
  SubscriptionData,
} from './types';

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
  [SubscriptionManagementActions.Add]: ['action', 'productId', 'variantId'],
  [SubscriptionManagementActions.Create]: ['action', 'productId', 'variantId'],
  [SubscriptionManagementActions.Edit]: [
    'action',
    'productId',
    'sellingPlanGroupId',
    'variantId',
  ],
  [SubscriptionManagementActions.Remove]: [
    'action',
    'productId',
    'sellingPlanGroupId',
    'variantId',
    'variantIds',
  ],
};

export const defaultSettings: Settings = {
  data: {
    action: SubscriptionManagementActions.Create,
    productId: '1',
    sellingPlanGroupId: '2',
    variantId: '3',
    variantIds: ['4'],
  },
  locale: {initialValue: 'en', setOnChange() {}},
  sessionToken: {
    getSessionToken() {
      return Promise.resolve(undefined);
    },
  },
};
