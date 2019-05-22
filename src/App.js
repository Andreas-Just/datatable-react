import React from 'react';
import { Link } from 'react-router-dom';

import Datatable from './Datatable/';

import './App.css';

const peopleColumnConfig = {
  checkbox: {
    title: '',
    render: () => (
      <input type="checkbox" />
    )
  },
  name: { // Только для тех ключей которые есть в columnConfig будут колонки в таблице
    title: 'Имя', // в таблице колонка будет так называться
    isSortable: true, // по этой колонке можно сортировать
    isEditable: true, // ячейки из этой колонки можно редактировать
    render: (person) => (
      <Link to={`/people/${person.born}`} className="Table__link">
        {person.name}
      </Link>
    )
  },
  sex: {
    title: 'Пол',
    isEditable: true,
  },
  born: {
    title: 'Год рождения',
    isSortable: true,
    isEditable: true,
  },
  died: {
    title: 'Год смерти',
    isSortable: true,
    isEditable: true,
  },
  age: {
    title: 'Возраст',
    isSortable: (person) => person.died - person.born,
    render: (person) => person.died - person.born
  },
  father: {
    title: 'Отец',
    isSortable: true,
    isEditable: true,
  },
  mother: {
    title: 'Мать',
    isSortable: true,
    isEditable: true,
  }
};

class App extends React.Component {
  state = {
    people: [],
    config: peopleColumnConfig,
    isLoaded: false,
  };

  async componentDidMount() {
    const response = await fetch(
      'https://andreas-just.github.io/library-json/people/people.json'
    );
    const people = await response.json();

    this.setState({
      people,
      isLoaded: true
    });
  }

  render () {
    const { people, config, isLoaded } = this.state;

    return (
      <div className="App">
        <h1>Datatable</h1>
        {isLoaded ? (
          <Datatable
            items={people}
            config={config}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default App;
