import React from 'react';
import { ExtensionPoint } from '@shopify/argo';
import { render } from '@shopify/argo-react';
import { Text } from '@shopify/argo-react/components';

function App() {
  return <Text>Hi</Text>;
}

render(ExtensionPoint.SubscriptionManagement, () => <App />);
