import {ExtensionPoint, render} from '@shopify/argo';
import {Card, CardSection, TextField} from '@shopify/argo/components';

render(ExtensionPoint.<%= extensionPoint %>, (root, input) => {
  const card = root.createComponent(Card, {
    title: 'Hello World!',
  });

  const cardSection = root.createComponent(CardSection, {});
  const textField = root.createComponent(TextField, {
    value: 'From my app',
    onAfterChange(value: string) {
      textField.updateProps({
        value,
      });
    },
  });

  cardSection.appendChild(textField as any);
  card.appendChild(cardSection as any);
  root.appendChild(card);

  root.mount();
});
