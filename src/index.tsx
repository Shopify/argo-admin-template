// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
import React from 'react';
import { ExtensionPoint } from '@shopify/argo';
import { render } from '@shopify/argo-react';
import { Text } from '@shopify/argo-react/components';

const weakMap = new WeakMap();
const map = new Map();
const set = new Set();

function App() {
  return <Text>Hi</Text>;
}


render(ExtensionPoint.SubscriptionManagement, () => <App />);
