import Table from '../componets/Table';

const Products = (props) => {
  const { products } = props;

  if (!products.length) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Products</h1>
      <Table products={products} />
    </div>
  );
};

export default Products;
