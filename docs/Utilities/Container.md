# Container

Containers are interface elements that are used to render your extension with Argo components. Your extension can use the **container API** to configure its behaviour and appearance inside of Shopify Admin.

## Product Subscription

There are two different container types for the Product subscription extension, depending on the extension mode:

#### Add, Remove
**App modal container**: A smaller overlay typically used for editing an existing configuration or confirming a change. In the app modal container, primary and secondary action buttons are responsible for triggering a custom behaviour, such as performing a resource update.

#### Create, Edit
**App overlay container**: A full-screen container designed for complex tasks, like configuring a subscription for the first time.

### Container API

#### Add, Remove (Modal container)

| Name               | Type       | Description                                                                            | Required |
| ------------------ | ---------- | -------------------------------------------------------------------------------------- | -------- |
| close              | `function` | Closes the container and the extension                                                 |          |
| done               | `function` | Notify Shopify Admin that the extension workflow is complete and data has been updated |          |
| setPrimaryAction   | `function` | Sets the primary action content and callback when the action is clicked                |          |
| setSecondaryAction | `function` | Sets the secondary action content and callback when the action is clicked              |          |

##### Vanilla javascript example

```js
import {extend, ExtensionPoint, Button} from '@shopify/argo-admin';

extend(ExtensionPoint.SubscriptionManagementAdd, (root, api) => {
  const {
    container: {close, done, setPrimaryAction, setSecondaryAction},
  } = api;

  setPrimaryAction({
    content: 'Add',
    onAction: () => {
      console.log('Added');
      done();
      close();
    },
  });

  setSecondaryAction({
    content: 'Cancel',
    onAction: () => {
      console.log('Cancelled');
      close();
    },
  });

  const text = root.createComponent(Button, {
    children: 'Hello world',
  });

  root.appendChild(text);
  root.mount();
});
```

##### React example

```jsx
import {extend, render, useContainer, ExtensionPoint, Text} from '@shopify/argo-admin-react';

function App() {
  const container = useContainer();

  useEffect(() => {
    const {close, done, setPrimaryAction, setSecondaryAction} = container;
    setPrimaryAction({
      content: 'Save',
      onAction: () => {
        console.log('Saved');
        done();
        close();
      },
    });

    setSecondaryAction({
      content: 'Cancel',
      onAction: () => {
        console.log('Cancelled');
        close();
      },
    });
  }, [container]);

  return <Text>Hello world</Text>;
}

extend(
  ExtensionPoint.SubscriptionManagementAdd,
  render(() => <App />)
);
```

#### Create, Edit (App overlay container)

| Name      | Type       | Description                                                                            | Required |
| --------- | ---------- | -------------------------------------------------------------------------------------- | -------- |
| close     | `function` | Closes the container and the extension                                                 |          |
| done      | `function` | Notify Shopify Admin that the extension workflow is complete and data has been updated |          |

##### Vanilla javascript example

```js
import {extend, ExtensionPoint, Button} from '@shopify/argo-admin';

extend(ExtensionPoint.SubscriptionManagementEdit, (root, api) => {
  const {
    container: {close, done},
  } = api;
  
  const primaryButton = root.createComponent(Button, {
    title: 'Edit plan',
    primary: true,
    onClick: () => {
      console.log('Updated');
      done();
      close();
    },
  });

  const secondaryButton = root.createComponent(Button, {
    title: 'Cancel',
    onClick: () => {
      console.log('Cancelled');
      close();
    },
  });

  const text = root.createComponent(Button, {
    children: 'Hello world',
  });

  root.appendChild(text);
  root.appendChild(secondaryButton);
  root.appendChild(primaryButton);
  root.mount();
});
```

##### React example

```jsx
import {extend, render, useContainer, ExtensionPoint, Text} from '@shopify/argo-admin-react';

function App() {
  const {close, done} = useContainer();
  
  const onPrimaryAction = useCallback(() => {
    console.log('Updated');
    done();
    close();
  }, [getSessionToken, done, close]);
  
  const onSecondaryAction = useCallback(() => {
    console.log('Cancelled');
    close();
  }, [getSessionToken, done, close]);
  
  const actions = useMemo(() => (
    <>
      <Button title="Cancel" onClick={onSecondaryAction} />
      <Button title="Edit plan" onClick={onPrimaryAction} primary />
    </>
  ), [onPrimaryAction, onSecondaryAction]);

  return (
    <>
      <Text>Hello world</Text>
      {actions}
    </>
  );
}

extend(
  ExtensionPoint.SubscriptionManagementEdit,
  render(() => <App />)
);
```