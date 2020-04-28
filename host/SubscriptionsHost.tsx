import React, {useState} from 'react';
import {Modal} from './components/modal';
import {ExtensionPoint} from '@shopify/app-extensions-renderer';
import {Button} from '@shopify/polaris';
import {HostProps} from './types';

export function SubscriptionHost({worker, components}: HostProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Click me</Button>
      <Modal
        appInfo={{name: ""}}
        script={worker.url}
        open={open}
        defaultTitle=""
        onClose={() => setOpen(false)}
        extensionPoint={ExtensionPoint.SubscriptionsManagement}
        components={components}
      />
    </>
  );
}
