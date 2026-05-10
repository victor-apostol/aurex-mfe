export type RemoteName = 'productsMfe';

export type RemoteConfig = {
  name: RemoteName;
  entry: string;
  alias: string;
};

export type LoadRemoteModule = {
  remoteName: RemoteName;
  remoteModule: string;
};
