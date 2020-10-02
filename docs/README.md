# Client Side Documentation

## Contents

- [Components](./Components)
- [Utilities](./Utilities)
- [Calling external APIs](./ExternalAPI)

## Getting Started

### 1. Install the Shopify CLI

Follow the instructions to install the app Shopify CLI [here](https://shopify.github.io/shopify-app-cli/getting-started/install/)

### 2. Create an extension

Run `shopify create extension` to get started.
This command will clone an extension template, which contains a basic extension.

### 3. Run the local server

Run `shopify serve` and start coding! All the code you will write for your extension should be within the `src` folder using the index entry point generated. This ensures that the CLI will know what to bundle when pushing your extension to shopify.

## Render API

The `render` method provided by Argo lets you tell Shopify what you want to render and where you want to render it.
It’s similar to `ReactDOM.render`, but works with vanilla JavaScript:

```js
render(ExtensionPoint, renderCallback);
```

#### Arguments

- `ExtensionPoint`: Where in the Shopify Admin the extension should render. Import this enum from Argo.
- `renderCallback`: A method that returns Argo components to be rendered.

#### Vanilla Example

```js
import {ExtensionPoint, render, Text} from '@shopify/argo-admin';

render(ExtensionPoint.MyExtension, (root) => {
  const text = root.createComponent(TextField, {
    style: 'strong',
    alignment: 'center',
  });

  text.appendChild('This is the best extension.');
  root.appendChild(text);

  root.mount();
});
```

#### React Example

```js
import {ExtensionPoint, Text} from '@shopify/argo-admin';
import {render} from '@shopify/argo-admin-react';

function App() {
  return (
    <Text style="strong" alignment="center">
      This is the best extension.
    </Text>
  );
}

render(ExtensionPoint.MyExtension, () => <App />);
```

**Note:** Some extensions have multiple extension points, like [Product Subscription](ExtensionPoints/ProductSubscription/README.md)
