import React from 'react';

class DataCell extends React.Component {
  state = {
    isEditing: false,
    currentValue: '',
  };

  onInputEditingDoubleClick = (text) => {
    console.log(text);
    this.setState({
      isEditing: true,
      currentValue: text,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      currentValue: value,
    })
  };

  onDelete = () => {

  };

  render() {
    const { item, title, value, config } = this.props;

    return (
      <td
        className="Table__td"
        onDoubleClick={value.isEditable
          ? () => this.onInputEditingDoubleClick(item[title])
          : null
        }
      >
        {(this.state.isEditing) ? (
          <label>
            <input
              className="Table__input edit"
              type="text"
              name={title}
              value={this.state.currentValue}
              onChange={this.handleChange}
              // onKeyPress={this.onInputEditingChange}
            />
            <button
              className="Table__destroy"
              onClick={this.onDelete}
            >
              X
            </button>
          </label>
        ) : (
          config[title].render ? config[title].render(item) : item[title]
        )}
      </td>
    );
  }
}

export default DataCell;
