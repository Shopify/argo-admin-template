import React, {useEffect, useMemo} from 'react';
import {
  CallbackTypeForExtensionPoint,
  ExtensionPoint,
  ExtractedInputFromRenderExtension,
} from '@shopify/app-extensions-renderer';
import {
  createIframeWorkerMessenger,
  createWorkerFactory,
  useWorker,
} from '@shopify/react-web-worker';
import {RemoteReceiver, RemoteRenderer} from '@shopify/remote-ui-react/host';

import useLayoutInput from './utils/useLayoutInput';
import useSessionTokenInput from './utils/useSessionTokenInput';

interface Props<T extends ExtensionPoint> {
  extensionPoint: T;
  script?: URL | string;
  components?: {[key: string]: any};
  input?: ExtractedInputFromRenderExtension<CallbackTypeForExtensionPoint<T>>;
}

const createWorker = createWorkerFactory(() =>
  import(/* webpackChunkName: 'worker' */ './worker'),
);

export function AppExtension<T extends ExtensionPoint>({
  extensionPoint,
  script,
  components = {},
  input = {} as ExtractedInputFromRenderExtension<
    CallbackTypeForExtensionPoint<T>
  >,
}: Props<T>) {
  if (!script) {
    return null;
  }

  const worker = useWorker(createWorker, {
    createMessenger: createIframeWorkerMessenger,
  });
  const receiver = useMemo(() => new RemoteReceiver(), []);
  const userInput = useMemo(() => input, [JSON.stringify(input)]);
  const [ref, layoutInput] = useLayoutInput();
  const sessionTokenInput = useSessionTokenInput();

  useEffect(() => {
    if (!layoutInput) {
      return;
    }
    (async () => {
      await worker.load(typeof script === 'string' ? script : script.href);
      worker.render(
        extensionPoint,
        {...input, ...layoutInput, ...sessionTokenInput},
        Object.keys(components),
        receiver.receive,
      );
    })();
  }, [
    worker,
    extensionPoint,
    components,
    receiver,
    userInput,
    layoutInput,
    sessionTokenInput,
  ]);

  return (
    <div ref={ref}>
      <RemoteRenderer receiver={receiver} components={components} />
    </div>
  );
}
