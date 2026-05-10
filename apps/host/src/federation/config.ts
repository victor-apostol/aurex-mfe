import { type RemoteConfig, type RemoteName } from './types';

export const RUNTIME_REMOTES = {
  productsMfe: {
    name: 'productsMfe',
    alias: 'productsMfe',
    entry: 'http://localhost:3001/mf-manifest.json',
  },
} as const satisfies Record<RemoteName, RemoteConfig>;
