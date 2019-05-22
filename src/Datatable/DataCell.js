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

  onDelete = () => {

  };

  render() {
    const { item, title, value, config } = this.props;

    return (
      <td
        onDoubleClick={value.isEditable
          ? () => this.onInputEditingDoubleClick(item[title])
          : null
        }
      >
        {(this.state.isEditing) ? (
          <>
            <input
              className="edit"
              type="text"
              value={this.state.currentValue}
              onChange={ (event) => this.setState({ currentValue: event.target.value }) }
              // onKeyPress={this.onInputEditingChange}
            />
            <button
              className="destroy"
              onClick={this.onDelete}
            >
              X
            </button>
          </>
        ) : (
          config[title].render ? config[title].render(item) : item[title]
        )}
      </td>
    );
  }
}

export default DataCell;
