import {Text, Stack, Button, extend} from '@shopify/argo-admin';

const translations = {
  de: {
    hello: 'Guten Tag',
    clickMe: 'Klick mich',
  },
  en: {
    hello: 'Hello',
    clickMe: 'Click Me',
  },
  fr: {
    hello: 'Bonjour',
    clickMe: 'clique moi',
  },
};

function Extension(root, api) {
  const locale = api.locale.initialValue;
  const localizedStrings = translations[locale] || translations.en;

  const stack = root.createComponent(Stack, {vertical: true});

  const localizedHelloText = root.createComponent(Text);
  localizedHelloText.appendChild(root.createText(`${localizedStrings.hello}!`));
  stack.appendChild(localizedHelloText);

  const button = root.createComponent(Button, {
    title: localizedStrings.clickMe,
    primary: true,
    onPress: () => console.log('Button clicked!'),
  });

  stack.appendChild(button);

  root.appendChild(stack);
  root.mount();
}

extend(
  // Add your extension point here
  'Playground',
  Extension
);
