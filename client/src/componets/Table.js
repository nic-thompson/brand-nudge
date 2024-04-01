const Table = (props) => {
  const { products } = props;

  const columns = Object.keys(products[0]).map((key) => ({
    key,
    name: key.toUpperCase(),
  }));

  const rows = products.map((product) => {
    const row = {};
    for (const key in product) {
      row[key] = product[key];
    }
    return row;
  });

  console.log({ columns, rows });

  return <div style={{ height: 350, width: '100%' }}>Table</div>;
};

export default Table;
