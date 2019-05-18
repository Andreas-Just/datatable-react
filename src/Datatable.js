import React, { Component } from 'react';

class Datatable extends Component {
  state = {
    sortColumn: null,
    sortAsc: true,
  };

  handleHeaderClick = (key) => {
    if (!this.props.config[key].isSortable) return;

    this.setState(({sortColumn, sortAsc}) => {
      return {
        sortColumn: key,
        sortAsc: sortColumn === key ? !sortAsc : true,
      };
    })

  };

  getSortedItems = () => {
    const { sortColumn, sortAsc } = this.state;
    const { items } = this.props;

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

  render() {
    const visibleItems = this.getSortedItems();
    const { config } = this.props;

    return (
      <div>
        <table className="Datatable">
          <thead>
            <tr>
              {Object.entries(config).map(([key, value]) => (
                <th
                  key={key}
                  className={
                    !value.isSortable ? '' :
                    this.state.sortAsc ? 'sortable-up' : 'sortable-down'
                  }
                  onClick={() => this.handleHeaderClick(key)}
                >
                  {value.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {visibleItems.map(item =>
              <Row key={item.name} item={item} config={config}/>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

const Row = ({ item, config }) => (
  <tr>
    { Object.keys(config).map(key => (
      <Cell
        key={key}
        item={item}
        column={key}
        render={config[key].render}
      />
    ))}
  </tr>
);

const Cell = ({ item, column, render }) => {
  return (
    <td>{render ? render(item) : item[column]}</td>
  );
};

export default Datatable;