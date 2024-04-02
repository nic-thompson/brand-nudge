import { Routes, Route } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import Products from './Products';
import Home from './Home';
import Compare from './Compare';

const AppLayout = () => {
  const products = useProducts();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products products={products} />} />
      <Route path="/compare" element={<Compare products={products} />} />
    </Routes>
  );
};

export default AppLayout;
