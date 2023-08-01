import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import { UsersList } from './UsersList';

function App() {
  const [users, setUsers] = useState([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const [filterCountry, setFilterCountry] = useState(null);

  const originalUsers = useRef([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry(!sortByCountry);
  };

  const handleDelete = (email) => {
    const filteredUsers = users.filter((user) => {
      return user.email !== email;
    });
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers =
    filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;

  const sortedUser = sortByCountry
    ? [...filteredUsers].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : filteredUsers;

  return (
    <div>
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? 'No Ordenar por Pais' : 'Ordenar por Pais'}
        </button>
        <button onClick={handleReset}>Restaurar Todo</button>
        <input
          placeholder="Filtra por pais"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main>
        <UsersList
          users={sortedUser}
          showColors={showColors}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
