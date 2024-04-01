const API_URL = 'http://localhost:8000';

async function httpGetProducts() {
  const response = await fetch(`${API_URL}/products`);
  const fetchedProducts = await response.json();
  return fetchedProducts.sort((a, b) => a.retailer - b.retailer);
}

export { httpGetProducts };
