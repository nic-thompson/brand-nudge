import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

const Table = (props) => {
  const { products } = props;
  const [searchQuery, setSearchQuery] = useState('');

  const columns = useMemo(
    () =>
      Object.keys(products[0]).map((accessor) => ({
        accessor,
        Header: accessor.toUpperCase(),
      })),
    [products]
  );

  const data = useMemo(
    () =>
      products.filter((product) =>
        Object.values(product)
          .join('')
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ),
    [products, searchQuery]
  );

  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={previousPage} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={nextPage} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageCount}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '50px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
          {page.map((row, i) => {
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
