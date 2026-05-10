import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';
import ErrorBoundary from '@components/ErrorBoundary';
import GlobalErrorCatch from '@components/GlobalErrorCatch';

import HostAuthProvider from '@providers/HostAuthProvider';

import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary fallback={<GlobalErrorCatch />}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HostAuthProvider>
          <App />
        </HostAuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
    ,
  </ErrorBoundary>,
);
