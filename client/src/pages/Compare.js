import ProductPriceComparisonChart from '../componets/Chart';

const Comparisons = (props) => {
  const { products } = props;

  if (!products.length) {
    return <div className="center">Loading...</div>;
  }

  return (
    <div className="center">
      <ProductPriceComparisonChart data={products} />
    </div>
  );
};

export default Comparisons;
