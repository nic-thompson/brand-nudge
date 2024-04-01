import { useCallback, useEffect, useState } from 'react';

import { httpGetProducts } from './requests';

function useProducts() {
  const [products, saveProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const fetchedProducts = await httpGetProducts();
    saveProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return products;
}

export default useProducts;
