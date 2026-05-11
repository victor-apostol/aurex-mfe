import { type RemoteConfig, type RemoteName } from './types';

export const RUNTIME_REMOTES = {
  productsMfe: {
    name: 'productsMfe',
    alias: 'productsMfe',
    entry: __PRODUCTS_REMOTE_ENTRY__,
  },
} as const satisfies Record<RemoteName, RemoteConfig>;
