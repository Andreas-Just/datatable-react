import React from 'react';

class DataCell extends React.Component {
  state = {
    isEditing: false,
    currentValue: '',
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  myRef = React.createRef();

  handleClickOutside = event => {
    if (!this.myRef.current.contains(event.target)) {
      this.setState({
        currentValue: this.state.currentValue,
        isEditing: false,
      });
    }
  };

  onInputEditingDoubleClick = (text) => {

    this.setState(({ currentValue }) => {
      return {
        isEditing: true,
        currentValue: text && currentValue,
      }
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    const valueYears = /^([1-9]?|[1-9](\d){1,2}|1(\d){3}|20[0-2]\d)$/.test(value);
    const valueSex = /^[mf]?$/.test(value);
    const valueName = /^(?:([A-Z][a-z]{0,20})?)(?:\s[A-Z]?[a-z]{0,20}){0,4}$/.test(value);

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
    const contentTd = config[title].render ? config[title].render(item) : item[title];

    return (
      <td
        className="Table__td"
        onDoubleClick={value.isEditable
          ? () => this.onInputEditingDoubleClick(item[title])
          : null
        }
        ref={this.myRef}
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
        ) : (this.state.currentValue || contentTd)}
      </td>
    );
  }
}

export default DataCell;
