import {
  TextField,
  Text,
  Stack,
  Button,
  Card,
  Checkbox,
  extend,
} from '@shopify/argo-admin';

const translations = {
  de: {
    hello: 'Guten Tag',
  },
  en: {
    hello: 'Hello',
  },
  fr: {
    hello: 'Bonjour',
  },
};

// 'Add' mode should allow a user to add the current product to an existing selling plan
// [Shopify admin renders this mode inside a modal container]
function Add(root, api) {
  // Information about the product and/or plan your extension is editing.
  // Your extension receives different data in each mode.
  const data = api.data;

  // Information about the merchant's selected language. Use this to support multiple languages.
  const locale = api.locale.initialValue;

  // Use locale to set translations with a fallback
  const localizedStrings = translations[locale] || translations.en;

  // Session token contains information about the current user. Use it to authenticate calls
  // from your extension to your app server.
  const sessionToken = api.sessionToken;

  // The UI your extension renders inside
  const {close, done, setPrimaryAction, setSecondaryAction} = api.container;

  const mockPlans = [
    {name: 'Subscription Plan A', id: 'a'},
    {name: 'Subscription Plan B', id: 'b'},
    {name: 'Subscription Plan C', id: 'c'},
  ];

  // Configure the extension container UI
  setPrimaryAction({
    content: 'Add to plan',
    onAction: async () => {
      // Get a fresh session token before every call to your app server.
      const token = await sessionToken.getSessionToken();

      // Here, send the form data to your app server to add the product to an existing plan.

      // Upon completion, call done() to trigger a reload of the resource page, and close() to
      // terminate the extension.
      done();
      close();
    },
  });
  setSecondaryAction({
    content: 'Cancel',
    onAction: () => close(),
  });

  const localizedHelloText = root.createComponent(Text);
  localizedHelloText.appendChild(root.createText(`${localizedStrings.hello}!`));
  root.appendChild(localizedHelloText);

  const textElement = root.createComponent(Text);
  textElement.appendChild(
    root.createText(
      `Add {Product id ${data.productId}} to an existing plan or existing plans`
    )
  );
  root.appendChild(textElement);

  const stack = root.createComponent(Stack);

  mockPlans.forEach((plan) => {
    const checkbox = root.createComponent(Checkbox, {
      label: plan.name,
      checked: false,
      onChange: (checked) => {
        checkbox.updateProps({
          checked,
        });
      },
    });

    stack.appendChild(checkbox);
  });

  root.appendChild(stack);

  root.mount();
}

// 'Create' mode should create a new selling plan, and add the current product to it
// [Shopify admin renders this mode inside an app overlay container]
function Create(root, api) {
  const data = api.data;
  const locale = api.locale.initialValue;
  const sessionToken = api.sessionToken;
  const {close, done} = api.container;

  const localizedStrings = translations[locale] || translations.en;

  const primaryButton = root.createComponent(Button, {
    title: 'Create plan',
    primary: true,
    onPress: async () => {
      const token = await sessionToken.getSessionToken();

      // Here, send the form data to your app server to create the new plan.

      done();
      close();
    },
  });
  const secondaryButton = root.createComponent(Button, {
    title: 'Cancel',
    onPress: () => close(),
  });

  const containerStack = root.createComponent(Stack, {distribution: 'center'});
  root.appendChild(containerStack);

  const rootStack = root.createComponent(Stack, {vertical: true});
  containerStack.appendChild(rootStack);

  const textElement = root.createComponent(Text, {size: 'titleLarge'});
  textElement.appendChild(
    root.createText(`${localizedStrings.hello}! Create subscription plan`)
  );
  rootStack.appendChild(textElement);

  const planTitleCard = root.createComponent(Card, {
    sectioned: true,
    title: `Create subscription plan for Product id ${data.productId}`,
  });
  rootStack.appendChild(planTitleCard);

  const planTitleField = root.createComponent(TextField, {
    label: 'Plan title',
    value: '',
    onChange(value) {
      planTitleField.updateProps({
        value,
      });
    },
  });
  planTitleCard.appendChild(planTitleField);

  const planDetailsCard = root.createComponent(Card, {
    sectioned: true,
    title: 'Delivery and discount',
  });
  rootStack.appendChild(planDetailsCard);

  const stack = root.createComponent(Stack);
  planDetailsCard.appendChild(stack);

  const deliveryFrequencyField = root.createComponent(TextField, {
    type: 'number',
    label: 'Delivery frequency (in weeks)',
    value: undefined,
    onChange(value) {
      deliveryFrequencyField.updateProps({
        value,
      });
    },
  });
  stack.appendChild(deliveryFrequencyField);

  const percentageOffField = root.createComponent(TextField, {
    type: 'number',
    label: 'Percentage off (%)',
    value: undefined,
    onChange(value) {
      percentageOffField.updateProps({
        value,
      });
    },
  });
  stack.appendChild(percentageOffField);

  const actionsElement = root.createComponent(Stack, {distribution: 'fill'});
  rootStack.appendChild(actionsElement);
  actionsElement.appendChild(secondaryButton);

  const primaryButtonStack = root.createComponent(Stack, {
    distribution: 'trailing',
  });
  actionsElement.appendChild(primaryButtonStack);
  primaryButtonStack.appendChild(primaryButton);

  root.mount();
}

// 'Remove' mode should remove the current product from a selling plan.
// This should not delete the selling plan.
// [Shopify admin renders this mode inside a modal container]
function Remove(root, api) {
  const data = api.data;
  const locale = api.locale.initialValue;
  const sessionToken = api.sessionToken;
  const {close, done, setPrimaryAction, setSecondaryAction} = api.container;

  const localizedStrings = translations[locale] || translations.en;

  setPrimaryAction({
    content: 'Remove from plan',
    onAction: async () => {
      const token = await sessionToken.getSessionToken();

      // Here, send the form data to your app server to remove the product from the plan.

      done();
      close();
    },
  });

  setSecondaryAction({
    content: 'Cancel',
    onAction: () => close(),
  });

  const localizedHelloText = root.createComponent(Text);
  localizedHelloText.appendChild(root.createText(`${localizedStrings.hello}!`));
  root.appendChild(localizedHelloText);

  const textElement = root.createComponent(Text);
  textElement.appendChild(
    root.createText(
      `Remove {Product id ${data.productId}} from {Plan group id ${data.sellingPlanGroupId}}`
    )
  );

  root.appendChild(textElement);
  root.mount();
}

// 'Edit' mode should modify an existing selling plan.
// Changes should affect other products that have this plan applied.
// [Shopify admin renders this mode inside an app overlay container]
function Edit(root, api) {
  const data = api.data;
  const locale = api.locale.initialValue;
  const sessionToken = api.sessionToken;
  const {close, done} = api.container;

  const localizedStrings = translations[locale] || translations.en;

  const primaryButton = root.createComponent(Button, {
    title: 'Edit plan',
    primary: true,
    onPress: async () => {
      const token = await sessionToken.getSessionToken();

      // Here, send the form data to your app server to modify the selling plan.

      done();
      close();
    },
  });
  const secondaryButton = root.createComponent(Button, {
    title: 'Cancel',
    onPress: () => close(),
  });

  const containerStack = root.createComponent(Stack, {distribution: 'center'});
  root.appendChild(containerStack);

  const rootStack = root.createComponent(Stack, {vertical: true});
  containerStack.appendChild(rootStack);

  const textElement = root.createComponent(Text, {size: 'titleLarge'});
  textElement.appendChild(
    root.createText(`${localizedStrings.hello}! Edit subscription plan`)
  );
  rootStack.appendChild(textElement);

  const planTitleCard = root.createComponent(Card, {
    sectioned: true,
    title: `Edit subscription plan for Product id ${data.productId}`,
  });
  rootStack.appendChild(planTitleCard);

  const planTitleField = root.createComponent(TextField, {
    label: 'Plan title',
    value: 'Current Plan',
    onChange(value) {
      planTitleField.updateProps({
        value,
      });
    },
  });
  planTitleCard.appendChild(planTitleField);

  const planDetailsCard = root.createComponent(Card, {
    sectioned: true,
    title: 'Delivery and discount',
  });
  rootStack.appendChild(planDetailsCard);

  const stack = root.createComponent(Stack);
  planDetailsCard.appendChild(stack);

  const deliveryFrequencyField = root.createComponent(TextField, {
    type: 'number',
    label: 'Delivery frequency (in weeks)',
    value: '1',
    onChange(value) {
      deliveryFrequencyField.updateProps({
        value,
      });
    },
  });
  stack.appendChild(deliveryFrequencyField);

  const percentageOffField = root.createComponent(TextField, {
    type: 'number',
    label: 'Percentage off (%)',
    value: '10',
    onChange(value) {
      percentageOffField.updateProps({
        value,
      });
    },
  });
  stack.appendChild(percentageOffField);

  const actionsElement = root.createComponent(Stack, {distribution: 'fill'});
  rootStack.appendChild(actionsElement);
  actionsElement.appendChild(secondaryButton);

  const primaryButtonStack = root.createComponent(Stack, {
    distribution: 'trailing',
  });
  actionsElement.appendChild(primaryButtonStack);
  primaryButtonStack.appendChild(primaryButton);

  root.mount();
}

// Your extension must render all four modes
extend('Admin::Product::SubscriptionPlan::Add', Add);
extend('Admin::Product::SubscriptionPlan::Create', Create);
extend('Admin::Product::SubscriptionPlan::Remove', Remove);
extend('Admin::Product::SubscriptionPlan::Edit', Edit);
