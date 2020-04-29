import {host as components} from '@shopify/app-extensions-polaris-components';

export interface HostProps {
  worker: any;
  components: typeof components;
}
