# Setup

## CLI
If you have grabbed this template from the Shopify CLI you should be good to go!

Start developing your awesome extension in the `./src` folder.


## From github
If you grabbed this template directly from github:


#### npm
```bash
npm install

# See list of available extension types: `scripts/generate/constants.ts`
npm run generate -- --type=SUBSCRIPTIONS_MANAGEMENT
```

#### yarn
```bin
yarn

# See list of available extension types: `scripts/generate/constants.ts`
yarn generate --type=SUBSCRIPTIONS_MANAGEMENT
```

### Using react
If you would like to build your extension using react, just add the `--framework=react` option.

#### npm
```bash
npm run generate -- --type=SUBSCRIPTIONS_MANAGEMENT --framework=react
```

#### yarn
```bash
yarn run generate --type=SUBSCRIPTIONS_MANAGEMENT --framework=react
```
**Note:**
Once you're setup, you may delete the `scripts` folder as you will no longer need it.
