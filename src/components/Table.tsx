import React, { useState } from 'react';
import './table.css';

interface TableProps {
  data: any[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchWord, setSearchWord] = useState('');
  const [filterColumn, setFilterColumn] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
// Apply pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

// Apply filtering
const filteredItems = data.filter((item) => {
  if (searchWord) {
    const itemValues = Object.values(item).join('').toLowerCase();
    return itemValues.includes(searchWord.toLowerCase());
  }
  
  if (filterColumn && filterValue) {
    const columnValue = item[filterColumn]?.toString().toLowerCase();
    return columnValue === filterValue.toLowerCase();
  }
  
  return true;
});




// Apply sorting
console.log('items',filteredItems)
const sortedItems = [...filteredItems].sort((a, b) => {
  if (sortColumn && a[sortColumn] && b[sortColumn]) {
    const valueA = a[sortColumn].toString();
    const valueB = b[sortColumn].toString();

    if (sortOrder === 'asc') {
      if (valueA.localeCompare && valueB.localeCompare) {
        return valueA.localeCompare(valueB);
      }
      return valueA < valueB ? -1 : 1;
    } else {
      if (valueB.localeCompare && valueA.localeCompare) {
        return valueB.localeCompare(valueA);
      }
      return valueB < valueA ? -1 : 1;
    }
  }
  return 0;
});


  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div>
      <div className="table-controls table">
        <input
          type="text"
          placeholder="Search"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <select
          value={filterColumn}
          onChange={(e) => setFilterColumn(e.target.value)}
        >
          <option value="">Filter By</option>
          {Object.keys(data[0]).map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        {filterColumn && (
          <input
            type="text"
            placeholder="Filter Value"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        )}
      </div>
      <table className="table">
        <thead>
          <tr>
            {Object.keys(data[0]).map((column) => (
              <th
                key={column}
                className={`table-header ${
                  sortColumn === column ? `sorted-${sortOrder}` : ''
                }`}
                onClick={() => {
                  if (sortColumn === column) {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortColumn(column);
                    setSortOrder('asc');
                  }
                }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
                <tbody>
                {sortedItems.slice(indexOfFirstItem, indexOfLastItem).map((row, index) => (
    <tr key={index}>
      {Object.keys(row).map((column) => (
        <td key={column} className="table-cell">
          {row[column]}
        </td>
      ))}
    </tr>
  ))}
        </tbody>

      </table>
      <div className="pagination table">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
