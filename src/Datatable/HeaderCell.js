import React from "react";

const HeaderCell = ({ title, value, onHeaderClick, sortAsc }) => {

  return (
    <th
      className={
        !value.isSortable ? '' :
          sortAsc ? 'Table__sort-up' : 'Table__sort-down'
      }
      onClick={value.isSortable
        ? () => onHeaderClick(title)
        : null
      }
    >
      {value.title}
    </th>
  );
};

export default HeaderCell;
