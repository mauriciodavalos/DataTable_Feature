import React from 'react';
import PropTypes from 'prop-types';

export function UsersList({ users, showColors, handleDelete }) {
  return (
    <table
      style={{ width: '100%', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
      <thead style={{ backgroundColor: 'white', color: 'black' }}>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => {
          const backGroundColor = index % 2 === 0 ? '#456' : '#555';
          const color = showColors ? backGroundColor : 'transparent';

          return (
            <tr key={user.email} style={{ backgroundColor: color }}>
              <td>
                <img src={user.picture.thumbnail} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    handleDelete(user.email);
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

UsersList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        first: PropTypes.string.isRequired,
        last: PropTypes.string.isRequired,
      }).isRequired,
      email: PropTypes.string.isRequired,
      location: PropTypes.shape({
        country: PropTypes.string.isRequired,
      }).isRequired,
      picture: PropTypes.shape({
        medium: PropTypes.string.isRequired,
      }).isRequired,
      login: PropTypes.shape({
        uuid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  showColors: PropTypes.bool,
  sortByCountry: PropTypes.bool,
  handleDelete: PropTypes.func,
};
