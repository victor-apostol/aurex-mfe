import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import RootPageRedirect from '@pages/RootPageRedirect';

import RemoteFallbackWrapper from '@components/RemoteFallbackWrapper';
import ProductPageSpinner from '@components/ProductsPageSpinner';
import ProductRemoteFallback from '@components/RemoteFallbacks/ProductsRemoteFallback';

import AuthenticatedLayout from './layouts/AuthenticatedLayout';

import { loadRuntimeRemoteModule } from '@federation-internal';

const ProductsMfe = lazy(
  loadRuntimeRemoteModule({
    remoteName: 'productsMfe',
    remoteModule: 'App',
  }),
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPageRedirect />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<AuthenticatedLayout />}>
        <Route
          path="/products/*"
          element={
            <RemoteFallbackWrapper
              remoteComponent={ProductsMfe}
              suspenseFallback={<ProductPageSpinner />}
              errorFallback={<ProductRemoteFallback />}
            />
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
