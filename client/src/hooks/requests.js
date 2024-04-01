const API_URL = 'http://localhost:8000';

async function httpGetProducts() {
  const response = await fetch(`${API_URL}/products`);
  const fetchedProducts = await response.json();
  return fetchedProducts.sort((a, b) => a.retailer - b.retailer);
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the description for Product 1.',
      price: 10.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is the description for Product 2.',
      price: 19.99,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is the description for Product 3.',
      price: 7.49,
    },
  ];

  return products;
}

export { httpGetProducts };
