# Shopify Admin, app extensions - Starter code

This repo contains starter code for apps that use _Argo_ to extend the UI of the _Shopify Admin_.       
For more about _Argo_ and admin extensions, please [read our docs](https://shopify.dev/tutorials/product-subscription-extension-overview).

## Getting started

Before you start, please [make sure you have `npm` installed](https://www.npmjs.com/get-npm) on your machine.

 1. Clone this repo

   ```sh
   git clone --depth=1 git@github.com:Shopify/argo-admin-template.git YOUR_EXTENSION_NAME
   ```

 2. Generate starter code

   ```sh
   cd YOUR_EXTENSION_NAME
   npm install
   npm generate --type=PRODUCT_SUBSCRIPTION
   ```

_**Note:** Currently `PRODUCT_SUBSCRIPTION` is the only supported type._


## What's next?

Check out the generated readme and index files (at the root of this repo), they contain further instructions and code to get you started.
