import React from 'react';

const Datatable = ({ config, items }) => (
  <div className="Datatable">
    <table>
      <thead>
      <tr>
        { Object.values(config).map((value) => (
          <th className={value.isSortable ? 'sortable-column' : ''}>
            {value.title}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {items.map(item =>
        <Row item={item} config={config}/>
      )}
      </tbody>
    </table>
  </div>
);

const Row = ({ item, config }) => {
  const getLink = (cellConfig) => {
    if (!cellConfig.link) {
      return '';
    }

    const [ ,field] = cellConfig.link.match(/\/:(\w+)/);
    return cellConfig.link.replace(`:${field}`, item[field]);
  };

  return (
    <tr>
      { Object.keys(config).map((key) => (
        <Cell link={getLink(config[key])}>
          {item[key]}
        </Cell>
      ))}
    </tr>
  );
};

const Cell = ({children, link}) => (
  link ? (
    <td><a href={link}>{children}</a></td>
  ) : (
    <td>{children}</td>
  )
);


export default Datatable;