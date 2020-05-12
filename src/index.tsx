import React from 'react';
import {ExtensionPoint} from '@shopify/argo';
import {render} from '@shopify/argo-react';
import {Card} from '@shopify/argo-react/components';

render(ExtensionPoint.SubscriptionManagement, () => <App />);

function App() {
  return (
    <Card title="Hello world" sectioned>From my app.</Card>
  );
}
