# Product Subscription Extension

This extension renders in the Product Details and Product Variants Page inside a **Modal container** or **App overlay** container.

## Extension Points

The Product subscription extension uses multiple extension points. Each is triggered by a different merchant action, receives different data, and is responsible for handling a distinct part of the subscriptions experience.

The different extension points are:

- SubscriptionManagementAdd
- SubscriptionManagementCreate
- SubscriptionManagementEdit
- SubscriptionManagementRemove

They must be rendered separately.

```js
function Add(root, api) {
  root.appendChild(root.createText('Hello, World'));
  root.mount();
}
function Create() {
  /* ... */
}
function Edit() {
  /* ... */
}
function Remove() {
  /* ... */
}

render(ExtensionPoint.SubscriptionManagementAdd, Add);
render(ExtensionPoint.SubscriptionManagementCreate, Create);
render(ExtensionPoint.SubscriptionManagementEdit, Edit);
render(ExtensionPoint.SubscriptionManagementRemove, Remove);
```

### Data API

See [Data](../../Utilities/Data.md) for more info about how to access subscription data provided by the host page.

#### Product Subscription Add

| Name      | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| productId | `string` | The id of the current product.         |
| variantId | `string` | The id of the current product variant. |

#### Product Subscription Create

| Name      | Type     | Description                            |
| --------- | -------- | -------------------------------------- |
| productId | `string` | The id of the current product.         |
| variantId | `string` | The id of the current product variant. |

#### Product Subscription Edit

| Name           | Type     | Description                            |
| -------------- | -------- | -------------------------------------- |
| productId      | `string` | The id of the current product.         |
| variantId      | `string` | The id of the current product variant. |
| sellingGroupId | `string` | The id of the current selling group.   |

#### Product Subscription Remove

| Name           | Type       | Description                              |
| -------------- | ---------- | ---------------------------------------- |
| productId      | `string`   | The id of the current product.           |
| variantId      | `string`   | The id of the current product variant.   |
| variantIds     | `string[]` | The ids of the current product variants. |
| sellingGroupId | `string`   | The id of the current selling group.     |

### Container API

See [Container](../../Utilities/Container.md) for more info about how to customize your extension’s container component using the Container API

| Name  | Type       | Description                                                                              | Required |
| ----- | ---------- | ---------------------------------------------------------------------------------------- | -------- |
| close | `function` | Closes the container and the extension                                                   |          |
| done  | `function` | Notifies Shopify Admin that the extension workflow is complete and data has been updated |          |

## Available components

The following components are available for all Product subscription extension points:

- [Badge](../../Components/Badge.md)
- [Banner](../../Components/Banner.md)
- [Button](../../Components/Button.md)
- [Checkbox](../../Components/Checkbox.md)
- [Clickable](../../Components/Clickable.md)
- [Icon](../../Components/Icon.md)
- [Link](../../Components/Link.md)
- [Radio](../../Components/Radio.md)
- [ResourceItem](../../Components/ResourceItem.md)
- [ResourceList](../../Components/ResourceList.md)
- [Select](../../Components/Select.md)
- [Spinner](../../Components/Spinner.md)
- [Stack](../../Components/Stack.md)
- [StackItem](../../Components/StackItem.md)
- [Text](../../Components/Text.md)
- [TextField](../../Components/TextField.md)
- [Thumbnail](../../Components/Thumbnail.md)

The following components are available only for Product subscription Create and Edit extension points:

- [Card](../../Components/Card.md)
- [CardSection](../../Components/CardSection.md)
- [Modal](../../Components/Modal.md)

## Available utilities

- [Container](../../Utilities/Container.md)
- [Data](../../Utilities/Data.md)
- [Layout](../../Utilities/Layout.md)
- [Locale](../../Utilities/Locale.md)
- [Session Token](../../Utilities/SessionToken.md)
- [Toast](../../Utilities/Toast.md)
