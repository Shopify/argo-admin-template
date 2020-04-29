import React from 'react';
import {render} from '@shopify/app-extensions-renderer';
import {Card} from '@shopify/app-extensions-polaris-components/dist/client';
import config from '../config';

render(config.EXTENSION_POINT, () => <App />);

function App() {
  return (
    <Card title="Hello world" sectioned>From my app.</Card>
  );
}
