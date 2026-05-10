import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import RootPageRedirect from '@pages/RootPageRedirect';

import ProtectedRemote from '@components/ProtectedRemote';
import ProductPageSpinner from '@components/ProductsPageSpinner';

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
            <ProtectedRemote
              remoteComponent={ProductsMfe}
              suspenseFallback={<ProductPageSpinner />}
              errorFallback={<div>Products module is unavailable.</div>}
            />
          }
        />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
