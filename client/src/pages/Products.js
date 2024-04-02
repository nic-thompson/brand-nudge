import Table from '../componets/Table';

const Products = (props) => {
  const { products } = props;

  if (!products.length) {
    return <>Loading...</>;
  }

  return (
    <div>
      <Table products={products} />
    </div>
  );
};

export default Products;
