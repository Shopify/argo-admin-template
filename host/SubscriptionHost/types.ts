import {LocaleInput, ProductData} from '@shopify/argo';

export interface Settings {
  locale?: LocaleInput['locale'];
  productData?: ProductData;
}
