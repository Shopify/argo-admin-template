import React from 'react';
import {ExtensionPoint, Card} from '@shopify/argo';
import {render} from '@shopify/argo/react';

function App() {
  return (
    <Card title="Hello world" sectioned>From my app.</Card>
  );
}

// render(ExtensionPoint.SubscriptionManagementAdd, () => <App />);
render(ExtensionPoint.SubscriptionManagementCreate, () => <App />);
// render(ExtensionPoint.SubscriptionManagementRemove, () => <App />);
// render(ExtensionPoint.SubscriptionManagementEdit, () => <App />);

console.log('test');
