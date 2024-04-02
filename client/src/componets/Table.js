import React from 'react';
import { useTable, useSortBy } from 'react-table';

const Table = (props) => {
  const { products } = props;

  const columns = React.useMemo(
    () =>
      Object.keys(products[0]).map((accessor) => ({
        accessor,
        Header: accessor.toUpperCase(),
      })),
    [products]
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
    [products]
  );

  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy // Add useSortBy hook here
  );

  return (
    <div className="container">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {/* Render column header with sorting icon */}
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
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
