import { registerRemotes } from '@module-federation/enhanced/runtime';

import { RUNTIME_REMOTES } from './config';

import { type RemoteName } from './types';

class RemoteRegistry {
  #registeredRemotes = new Set<RemoteName>();

  isRegistered(remoteName: RemoteName): boolean {
    return this.#registeredRemotes.has(remoteName);
  }

  registerRemote(remoteName: RemoteName) {
    if (this.isRegistered(remoteName)) {
      return;
    }

    const registeredRemote = RUNTIME_REMOTES[remoteName];

    registerRemotes([
      {
        name: registeredRemote.name,
        entry: registeredRemote.entry,
      },
    ]);

    this.#registeredRemotes.add(remoteName);
  }
}

export const remoteRegistry = new RemoteRegistry();
