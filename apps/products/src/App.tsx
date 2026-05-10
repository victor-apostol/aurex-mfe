import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ProductsPage from '@pages/ProductsPage';
import ProductDetailPage from '@pages/ProductDetailPage';

import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<ProductsPage />} />
        <Route path=":id" element={<ProductDetailPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
