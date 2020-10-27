# Setup

## CLI
If you have grabbed this template from the Shopify CLI you should be good to go!

Start developing your awesome extension.


## From github
If you grabbed this template directly from github:

#### npm
```bash
## With npm
npm install

npm run generate -- --type=PRODUCT_SUBSCRIPTION

## With yarn
yarn

yarn generate --type=PRODUCT_SUBSCRIPTION
```

### Available extensions:
  - PRODUCT_SUBSCRIPTION

**Note:**
Once you're setup, you may delete the `scripts` folder as you will no longer need it.

Documentation on all of the components and utilities in the `argo-admin` library can be found in the [docs folder](./docs).

### Local development

During the setup, a new script has been added to your `package.json` for local development. Run the command to start developing locally. See [Local development with argo-admin-cli](https://www.npmjs.com/package/@shopify/argo-admin-cli#local-development).

```bash
  npm run server
```

Your starting file is the index file in the root folder (`index.js`, `index.ts`, or `index.tsx`).

### Build

During the setup, a new script has been added to your `package.json` for building your code. Run the command to start developing locally. See [Build with argo-admin-cli](https://www.npmjs.com/package/@shopify/argo-admin-cli#build).

```bash
  npm run build
```
