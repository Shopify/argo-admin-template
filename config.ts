import {ExtensionPoint} from '@shopify/app-extensions-renderer';

const extensionType = process.env.EXTENSION_TYPE as string;

// keys correspond to Extension::Model::Type.identifier
const extensionTypeToPoint: Record<string, ExtensionPoint> = {
  SUBSCRIPTIONS_MANAGEMENT: ExtensionPoint.SubscriptionsManagement,
};

const config = {
  EXTENSION_POINT: extensionTypeToPoint[extensionType],
};

export default config;
