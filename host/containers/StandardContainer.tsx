import React, {useMemo} from 'react';
import {ExtensionPoint} from '@shopify/argo';
import {
  ArgoExtension,
  ArgoExtensionsProps,
  useLayoutApi,
  useLocaleApi,
  useSessionTokenApi,
} from '@shopify/argo-host';
import {
  createWorkerFactory,
  useWorker,
  createIframeWorkerMessenger,
} from '@shopify/react-web-worker';

const createWorker = createWorkerFactory(() =>
  import(/* webpackChunkName: 'sandbox-worker' */ '@shopify/argo-host/worker'),
);

type BaseProps<T extends ExtensionPoint> = Omit<
  ArgoExtensionsProps<T>,
  'api' | 'worker' | 'receiver'
>;

type Api<T extends ExtensionPoint> = Omit<
  ArgoExtensionsProps<T>['api'],
  'layout' | 'locale' | 'sessionToken'
>;

export interface StandardContainerProps<T extends ExtensionPoint>
  extends BaseProps<T> {
  app?: {
    name: string;
    icon?: string;
    appId: string;
  };
  api?: Api<T>;
}

export function StandardContainer<T extends ExtensionPoint>(
  props: StandardContainerProps<T>,
) {
  const worker = useWorker(createWorker, {
    createMessenger: createIframeWorkerMessenger,
  });
  const [ref, layoutApi] = useLayoutApi();
  const sessionTokenApi = useSessionTokenApi(() => Promise.resolve(''), []);
  const localeApi = useLocaleApi('en');
  const api = useMemo(() => {
    if (!layoutApi) {
      return undefined;
    }
    return {
      ...layoutApi,
      ...sessionTokenApi,
      ...localeApi,
      ...props.api,
    };
  }, [layoutApi, sessionTokenApi, localeApi, props.api]);

  return (
    <div ref={ref}>
      {api && (
        <ArgoExtension {...props} api={api as any} worker={worker} />
      )}
    </div>
  );
}
