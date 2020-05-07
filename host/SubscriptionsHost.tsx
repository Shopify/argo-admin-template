import React, {useState} from 'react';
import {ExtensionPoint} from '@shopify/argo';
import {Button} from '@shopify/polaris';

import {ModalContainer} from './containers/ModalContainer';
import {HostProps} from './types';

export function SubscriptionHost(props: HostProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Click me</Button>
      <ModalContainer
        app={{name: 'App name', appId: 'app-id'}}
        open={open}
        defaultTitle="Default title"
        onClose={() => setOpen(false)}
        extensionPoint={ExtensionPoint.SubscriptionsManagement}
        {...props}
      />
    </>
  );
}
