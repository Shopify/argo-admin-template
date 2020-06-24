# Container

Each extension point should provide a container API, allowing the extension to customize its container UI and communicate the end of its lifecycle.

## Subscription Management

Subscription Management extensions are rendered in a modal, so their container has primary and secondary actions.

| Name               | Type              | Description                                                                                                                            | Required |
| ------------------ | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| close              | `function`        | Closes the container and the extension                                                                                                 |          |
| done               | `function`        | Notify Shopify Admin that the extension workflow is complete and data has been updated, so Admin should refresh related UI on the page |          |
| setPrimaryAction   | `(ContainerAction) => void` | Sets the primary action content and callback when the action is clicked                                                                |          |
| setSecondaryAction | `(ContainerAction) => void` | Sets the secondary action content and callback when the action is clicked                                                              |          |

### ContainerAction

| Name     | Type       | Description                          | Required |
| -------- | ---------- | ------------------------------------ | -------- |
| content  | `string`   | Label for the action.                | ☑️       |
| onAction | `function` | Callback when the action is clicked. | ☑️       |

### Examples

#### Vanilla

```js
import {ExtensionPoint, render, Button} from '@shopify/argo-admin';

render(ExtensionPoint.SubscriptionManagementCreate, (root, api) => {
  const {
    container: {close, done, setPrimaryAction, setSecondaryAction},
  } = api;

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

  const text = root.createComponent(Button, {
    children: 'Hello world',
  });

  root.appendChild(text);
  root.mount();
});
```

#### React

```js
import {ExtensionPoint, Text} from '@shopify/argo-admin';
import {render, useContainer} from '@shopify/argo-admin/react';

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

render(ExtensionPoint.MyExtension, () => <App />);
```
