import Table from '../componets/Table';

const Products = (props) => {
  const { products } = props;

  if (!products.length) {
    return <div className="center">Loading...</div>;
  }

  return (
    <div>
      <Table products={products} />
    </div>
  );
};

export default Products;
