# Data

Extension points may provide relevant data to the extension. The type of data varies from extension point to extension point.

## Implementation

Below are examples of implementing the data API for the Product subscription Add extension point.

#### Vanilla javascript example

```js
import {ExtensionPoint, extend, Text} from '@shopify/argo-admin';

extend(ExtensionPoint.SubscriptionManagementAdd, (root, api) => {
  const {productId, variantId} = api.data;

  const productDataText = root.createComponent(Text);
  productDataText.appendChild(`
      Here is my product data:
      - product id: ${productId}
      - variant id: ${variantId}
    `);

  root.appendChild(productDataText);
  root.mount();
});
```

#### React example

```jsx
import {ExtensionPoint, Text} from '@shopify/argo-admin';
import {extend, render, useData} from '@shopify/argo-admin-react';

function App() {
  const {productId, variantId} = useData();

  return (
    <Text>
      {`
        Here is my product data:
        - product id: ${productId}
        - variant id: ${variantId}
      `}
    </Text>
  );
}

extend(
  ExtensionPoint.SubscriptionManagementAdd,
  render(() => <App />)
);
```

## Extension Points with Data API

- [Product Subscription](../ExtensionPoints/ProductSubscription/README.md#data-api)
