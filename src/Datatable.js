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

  getSortedItems = (items) => {
    const { sortColumn, sortAsc } = this.state;

    if (!sortColumn) {
      return items;
    }

    const sign = sortAsc ? 1 : -1;
    const sortFn = (a, b) => {

      if (!a[sortColumn] && !b[sortColumn]) {
        a[sortColumn] = '';
        b[sortColumn] = '';
      } else if (!a[sortColumn]) {
        a[sortColumn] = '';
      }

      return typeof items[0][sortColumn] === 'number'
        ? sign * (a[sortColumn] - b[sortColumn])
        : sign * (a[sortColumn].localeCompare(b[sortColumn]));
    };

    return items.sort(sortFn);
  };

  handlePerPageChange = (event) => {
    this.setState({
      perPage: +event.target.value
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

  render() {
    const { page, perPage, query, visibleQuery } = this.state;
    const { config, items } = this.props;
    const start = (page - 1) * perPage;

    const end = start + perPage;
    const queryRegexp = new RegExp(query, 'i');

    const sortedItems = this.getSortedItems(items);
    const filteredItems = sortedItems
      .filter(person => queryRegexp.test(person.name));
    const visibleItems = filteredItems
      .slice(start, end);

    // console.log(debounce);

    return (
      <div className="Datatable">
        <input
          type="text"
          value={visibleQuery}
          onChange={this.handleQueryChange}
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