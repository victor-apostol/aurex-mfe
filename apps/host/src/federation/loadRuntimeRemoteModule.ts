import { loadRemote } from '@module-federation/enhanced/runtime';

import { remoteRegistry } from './remoteRegistry';

import { type LoadRemoteModule } from './types';

export const loadRuntimeRemoteModule =
  ({ remoteName, remoteModule }: LoadRemoteModule) =>
  async () => {
    remoteRegistry.registerRemote(remoteName);

    const module = await loadRemote<{ default: React.ComponentType }>(`${remoteName}/${remoteModule}`);

    if (!module) {
      throw new Error(`Remote module "${remoteName}" is not found.`);
    }

    return module;
  };
