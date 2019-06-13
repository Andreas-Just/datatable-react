import React from 'react';

class DataCell extends React.Component {
  state = {
    isEditing: false,
    currentValue: '',
  };

  onInputEditingDoubleClick = (text) => {
    // console.log(text);
    this.setState({
      isEditing: true,
      currentValue: text,
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const valueYears = /^([1-9]?|[1-9](\d){1,2}|1(\d){3}|20[0-2]\d)$/.test(value);
    const valueSex = /^[mf]?$/.test(value);
    const valueName = /^(?:([A-Z][a-z\.]{0,20})?)(?:\s[A-Z]?[a-z\.]{0,20}){0,4}$/.test(value);

    if (name === 'sex' && !valueSex) {
      return;
    }
    if (name === 'born' || name === 'died') {
      if (!valueYears) return;
    }
    if (name === 'name' || name === 'mother' || name === 'father') {
      if (!valueName) return;
    }

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
