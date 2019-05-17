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

  render() {
    const visibleItems = this.state.sortColumn
      ? this.props.items
          .sort((item1, item2) => {

            if (!item1[this.state.sortColumn]) {
              item1[this.state.sortColumn] = '';
            }
            // console.log(item1[this.state.sortColumn]);
            const value1 = item1[this.state.sortColumn];
            const value2 = item2[this.state.sortColumn];
            const sign = this.state.sortAsc ? 1 : -1;

            return typeof value1 === 'number'
              ? sign * (value1 - value2)
              : sign * (value1.localeCompare(value2));
          })
      : this.props.items;

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