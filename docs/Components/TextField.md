# TextField

A text field is an input field that merchants can type into.
It has a range of options and supports several text formats including numbers.

## Examples

#### Vanilla

```js
  import {ExtensionPoint, render, TextField} from '@shopify/argo-admin';

  render(ExtensionPoint.MyExtension, (root) => {
    const textfield = root.createComponent(TextField, {
      label: 'Super text field',
      type: 'text',
      value: 'I can fly!',
      placeholder: 'Type a thing',
      multiline: 3,
      prefix: 'I typed:',
      suffix: 'into this text field',
      error: 'I hate to break this to you, but you cannot fly',
      onAfterChange: (value) => console.log(value, ' was typed'),
      onFocus: () => console.log('Welcome to the super field!'),
      onBlur: () => console.log('Left to do something else'),
      clearButton: true,
      onClearButtonClick: () => console.log('Clear that silly statement'),
    });

    root.appendChild(textfield);
    root.mount();
  });
```

#### React

```jsx
import {ExtensionPoint, TextField} from '@shopify/argo-admin';
import {render} from '@shopify/argo-admin/react';

function App() {
  return (
    <TextField
      label="Super text field"
      type="text"
      value="I can fly!"
      placeholder="Type a thing"
      multiline={3}
      prefix="I typed:"
      suffix="into this text field"
      error="I hate to break this to you, but you cannot fly"
      onAfterChange={(value) => console.log(value, ' was typed')}
      onFocus={() => console.log('Welcome to the super field!')}
      onBlur={() => console.log('Left to do something else')}
      clearButton
      onClearButtonClick={() => console.log('Clear that silly statement')}
    />
  );
}

render(ExtensionPoint.MyExtension, () => <App />);
```

## Props API

| Name               | Type                             | Description                            | Required |
| ------------------ | -------------------------------- | -------------------------------------- | -------- |
| label              | `string`                         | Label for the input.                   |          |
| type               | `'text'`, `'search'`, `'number'` | Type of the input.                     |          |
| value              | `string`                         | Initial value for the input.           |          |
| placeholder        | `string`                         | Hint text to display.                  |          |
| multiline          | `number`, `boolean`              | Allow for multiple lines of input.     |          |
| prefix             | `string`                         | Text to display before the value.      |          |
| suffix             | `string`                         | Text to display after the value.       |          |
| error              | `string`                         | Error to display beneath the label.    |          |
| onAfterChange      | `(string) => void`               | Callback when value is changed.        |          |
| onFocus            | `() => void`                     | Callback when input is focused.        |          |
| onBlur             | `() => void`                     | Callback when focus is removed.        |          |
| clearButton        | `boolean`                        | Show a clear text button in the input. |          |
| onClearButtonClick | `(string) => void`               | Callback when clear button is clicked. |          |
