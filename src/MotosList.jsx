import React from 'react';
import PropTypes from 'prop-types';

export function MotosList({ motos, showColors, handleDelete, setSortBy }) {
  return (
    <table
      style={{ width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
      <thead style={{ backgroundColor: 'white', color: 'black' }}>
        <tr>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSortBy((prevSortBy) =>
                prevSortBy === 'model' ? 'none' : 'model'
              );
            }}>
            Modelo
          </th>
          <th>Año</th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSortBy((prevSortBy) =>
                prevSortBy === 'type' ? 'none' : 'type'
              );
            }}>
            Tipo
          </th>
          <th
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setSortBy((prevSortBy) =>
                prevSortBy === 'topspeed' ? 'none' : 'topspeed'
              );
            }}>
            Velocidad Maxima
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {motos.map((moto, index) => {
          const backGroundColor = index % 2 === 0 ? 'orange' : 'black';
          const color = showColors ? backGroundColor : 'transparent';

          return (
            <tr key={moto.model} style={{ backgroundColor: color }}>
              <td>{moto.model}</td>
              <td>{moto.year}</td>
              <td>{moto.type}</td>
              <td>{moto.top_speed}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(moto.model);
                  }}>
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

MotosList.propTypes = {
  motos: PropTypes.arrayOf(
    PropTypes.shape({
      model: PropTypes.string,
    })
  ),
  showColors: PropTypes.bool,
  setSortBy: PropTypes.func.isRequired,
  handleDelete: PropTypes.func,
};
