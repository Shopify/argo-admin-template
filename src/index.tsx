import React from 'react';
import {render, ExtensionPoint} from '@shopify/app-extensions-renderer';
import {Card} from '@shopify/app-extensions-polaris-components/dist/client';

render(ExtensionPoint.SubscriptionsManagement, () => <App />);

function App() {
  return (
    <Card title="Hello world" sectioned>From my app.</Card>
  );
}
