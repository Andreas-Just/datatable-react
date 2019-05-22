import React, { Component } from 'react';

import debounce from 'lodash/debounce';
import Pagination from "./Pagination";

class Datatable extends Component {
  state = {
    sortColumn: null,
    sortAsc: true,
    perPage: 5,
    page: 1,
    query: '',
    visibleQuery: '',
  };

  handleHeaderClick = (key) => {
    this.setState((prevState) => ({
      sortColumn: key,
      sortAsc: prevState.sortColumn === key ? !prevState.sortAsc : true,
    }));

  };

  handlePerPageChange = (event) => {
    this.setState({
      perPage: +event.target.value,
      page: 1,
    })
  };

  handlePageChange = (page) => {
    this.setState({ page })
  };

  handleQueryChange = (event) => {
    this.setState({
      visibleQuery: event.target.value,
    });

    this.updateQuery(event.target.value);
  };

  updateQuery = debounce(query => {
    this.setState({
      query: query,
      page: 1,
    });
  }, 500);

  sortItems({ items, sortColumn, sortAsc, config }) {
    if (!sortColumn) {
      return items;
    }

    const sign = sortAsc ? 1 : -1;
    const sortFn = (a, b) => {
      if (!a[sortColumn] && !b[sortColumn] && b[sortColumn] !== undefined) {
        a[sortColumn] = '';
        b[sortColumn] = '';
      } else if (!a[sortColumn]) {
        a[sortColumn] = '';
      }

      return typeof items[0][sortColumn] === 'number'
        ? sign * (a[sortColumn] - b[sortColumn])
        : typeof items[0][sortColumn] === 'string'
        ? sign * (a[sortColumn].localeCompare(b[sortColumn]))
        : sign * (config.age.isSortable(a) - config.age.isSortable(b))

    };

    return [...items].sort(sortFn);
  }

  paginateItems({ items, page, perPage }) {
    const start = (page - 1) * perPage;
    const end = start + perPage;

    return items.slice(start, end);
  }

  filterItems({ items, query }) {
    const queryRegexp = new RegExp(query, 'i');

    return items
      .filter(person => queryRegexp.test(person.name));
  }


  render() {
    const { page, perPage, query, visibleQuery, sortColumn, sortAsc } = this.state;
    const { config, items } = this.props;

    const sortedItems = this.sortItems({
      items,
      sortColumn,
      sortAsc,
      config,
    });

    const filteredItems = this.filterItems({
      items: sortedItems,
      query,
    });

    const visibleItems = this.paginateItems({
      items: filteredItems,
      page,
      perPage,
    });

    return (
      <div className="Datatable">
        <input
          className="Datatable__filter"
          type="text"
          value={visibleQuery}
          onChange={this.handleQueryChange}
          placeholder={"-- Please enter a name --"}
        />

        <select
          className="Datatable__select"
          onChange={this.handlePerPageChange}
          value={this.state.perPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>

        <Pagination
          page={page}
          perPage={perPage}
          totalCount={filteredItems.length}
          onPageChange={this.handlePageChange}
        />

        <table className="Datatable__table Table">
          <thead>
            <tr>
              {Object.entries(config).map(([key, value]) => (
                <th
                  key={key}
                  className={
                    !value.isSortable ? '' :
                    this.state.sortAsc ? 'Table__sort-up' : 'Table__sort-down'
                  }
                  onClick={value.isSortable
                    ? () => this.handleHeaderClick(key)
                    : null
                  }
                >
                  {value.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleItems.map(item =>
              <tr key={item.name}>
                { Object.keys(config).map(key => (
                  <td key={key}>
                    {config[key].render ? config[key].render(item) : item[key]}
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Datatable;