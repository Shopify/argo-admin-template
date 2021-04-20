# Shopify Admin, app extensions - Starter code

This repo contains starter code for apps that use _Argo_ to extend the UI of the _Shopify Admin_.       
For more about _Argo_ and admin extensions, please [read our docs](https://shopify.dev/tutorials/product-subscription-extension-overview).

## Getting started

Clone this repo

```sh
git clone --depth=1 git@github.com:Shopify/argo-admin-template.git YOUR_EXTENSION_NAME
```

Generate starter code

```sh
cd YOUR_EXTENSION_NAME

# With npm
npm install
npm run generate -- --type=PRODUCT_SUBSCRIPTION

# With yarn
yarn
yarn generate --type=PRODUCT_SUBSCRIPTION
```

_**Note:** Currently `PRODUCT_SUBSCRIPTION` is the only supported extension type._

## What's next?

The `generate` command has created new files at the root of this repo. Check out the new `README.md` for further instructions, and `index.js/ts/tsx` for starter code.
