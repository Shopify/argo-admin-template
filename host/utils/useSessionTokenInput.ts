import {useMemo} from 'react';
import {SessionTokenInput} from '@shopify/app-extensions-renderer';

export default function useSessionTokenInput(): SessionTokenInput {
  return useMemo(
    () => ({
      sessionToken: {
        getSessionToken: () => {
          return Promise.resolve('YOUR-SESSION-TOKEN-HERE');
        },
      },
    }),
    [],
  );
}
