import {ExtensionPoint} from '@shopify/app-extensions-renderer';

// keys correspond to Extension::Model::Type.identifier
// https://github.com/Shopify/shopify-app-cli-extensions/tree/master/lib/project_types/extension/models/types
export const extensionTypeToPoint: Record<string, ExtensionPoint> = {
  SHOPIFY_HOSTED_APP_LINK: ExtensionPoint.AppLink,
  SUBSCRIPTIONS_MANAGEMENT: ExtensionPoint.SubscriptionsManagement,
};
