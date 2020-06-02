import {ExtensionPoint} from '@shopify/argo';

// keys correspond to Extension::Model::Type.identifier
// https://github.com/Shopify/shopify-app-cli-extensions/tree/master/lib/project_types/extension/models/types
export const extensionTypeToPoint: Record<string, ExtensionPoint> = {
  SUBSCRIPTION_MANAGEMENT: ExtensionPoint.SubscriptionManagementCreate,
};
