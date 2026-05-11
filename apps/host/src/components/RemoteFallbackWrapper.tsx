import { type ComponentType, Suspense, type ReactNode } from 'react';

import ErrorBoundary from './ErrorBoundary';

type Props = {
  remoteComponent: ComponentType;
  suspenseFallback: ReactNode;
  errorFallback: ReactNode;
  redirectPath?: string;
};

const RemoteFallbackWrapper = ({ remoteComponent: RemoteComponent, suspenseFallback, errorFallback }: Props) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={suspenseFallback}>
        <RemoteComponent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default RemoteFallbackWrapper;
