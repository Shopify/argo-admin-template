# Argo Admin CLI

The Argo Admin CLI allows you to build

**Note:** If you're using the Shopify CLI, the set up, local server, and build will be integrated. You can skip the steps below.

## Setup

### Install the CLI

Download and install the `argo-admin-cli`

#### npm
```bash
npm install -g @shopify/argo-admin-cli
```

#### yarn
```bash
yarn global add @shopify/argo-admin-cli
```

### Initialize the project
```bash
argo-admin-cli init --type=EXTENSION
```

See below for a list of [available extensions](#available-extensions)

Run through the prompt, then go into your project directory.

```bash
cd path/to/project
```

## Local development

Run a local server.

#### CLI
Run this if you haven't run `argo-admin-cli init`

```bash
argo-admin-cli server --entry=\"ENTRY_FILE\" --port=PORT --type=EXTENSION_POINT
# eg, argo-admin-cli server --entry=\"index.tsx\" --port=39351 --type=SUBSCRIPTION_MANAGEMENT"
```

#### npm
```bash
npm run server
```

#### yarn
```bash
yarn server
```

The server is on `localhost:PORT` where the default port is 39351.

## Build

#### CLI
Run this if you haven't run `argo-admin-cli init`

```bash
argo-admin-cli build --entry=\"ENTRY_FILE\"
# eg, argo-admin-cli build --entry=\"index.tsx\"
```

#### npm
```bash
npm run build
```

#### yarn
```bash
yarn build
```

Built files are found in the `build/` folder.

## Available extensions

  - SUBSCRIPTION_MANAGEMENT
