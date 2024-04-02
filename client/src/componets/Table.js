import React from 'react';
import { useTable } from 'react-table';

const Table = (props) => {
  const { products } = props;

  const columns = React.useMemo(
    () =>
      Object.keys(products[0]).map((accessor) => ({
        accessor,
        Header: accessor.toUpperCase(),
      })),
    []
  );

  const data = React.useMemo(
    () =>
      products.map((product) => {
        const row = {};
        for (const key in product) {
          row[key] = product[key];
        }
        return row;
      }),
    []
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
