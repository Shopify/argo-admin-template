# Shopify Admin, app extensions - Starter code

This repo contains starter code for apps that use _Argo_ to extend the UI of the _Shopify Admin_.       

For more about _Argo_ and admin extensions, please [read our docs](https://shopify.dev/tutorials/product-subscription-extension-overview).

## Getting started

[Use the Shopify App CLI to create your _Argo_-enabled extension](https://shopify.dev/tutorials/getting-started-product-subscription-extension#scaffold-a-product-subscription-app-extension).

**Note:** There is no need for you to clone this repo directly.
The CLI will take care of cloning the repo and generating all required files.

## Contributing

Developers working on this repo will find most of the relevant code in the [`scripts/generate`](/scripts/generate).

Start by cloning this repo:

```sh
git clone git@github.com:Shopify/argo-admin-template.git YOUR_EXTENSION_NAME
```

Then, generate the starter code:

```sh
cd YOUR_EXTENSION_NAME

# With npm
npm install
npm run generate -- --type=PRODUCT_SUBSCRIPTION

# With yarn
yarn
yarn generate --type=PRODUCT_SUBSCRIPTION
```

_**Note:** Currently `PRODUCT_SUBSCRIPTION` and `DEFAULT` are the only supported extension types._

Finally, inspect the reasult of the `generate` command:

```sh
git diff
```
