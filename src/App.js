import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './App.css';
import Datatable from './Datatable';

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
    isSearchable: true, // поиск будет проверять эту и последнюю колонки
    render: (person) => (
      <Link to={`/people/${person.born}`}>{person.name}</Link>
    )
  },
  sex: {
    title: 'Пол',
  },
  born: {
    title: 'Год рождения',
    isSortable: true,
  },
  age: {
    title: 'Возраст',
    render: (person) => person.died - person.born
  },
  father: {
    title: 'Отец',
    isSortable: true,
    isSearchable: true,
  },
  mother: {
    title: 'Мать',
    isSortable: true,
    isSearchable: true,
  }
};

class App extends Component {
  state = {
    people: [],
    config: peopleColumnConfig,
  };

  async componentDidMount() {
    const response = await fetch('https://andreas-just.github.io/library-json/people/people.json');
    const people = await response.json();

    this.setState({ people });
  }

  render () {
    const { people, config } = this.state;

    return (
      <div className="App">
        <h1>Datatable</h1>
        <Datatable
          items={people}
          config={config}
        />
      </div>
    );
  }
}

export default App;
