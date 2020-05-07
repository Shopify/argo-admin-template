import {ArgoExtensionsProps} from '@shopify/argo-host';

export type HostProps = Pick<ArgoExtensionsProps<any>, 'script' | 'components'>;
