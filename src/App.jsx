import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import { MotosList } from './MotosList';

function App() {
  const [motos, setMotos] = useState([]);
  const [showColors, setShowColors] = useState(true);
  const [sortByType, setSortByType] = useState(false);
  const [filterType, setFilterType] = useState(null);

  const originalMotos = useRef([]);

  //Fetch Request function
  useEffect(() => {
    fetch('https://api.api-ninjas.com/v1/motorcycles?make=BMW', {
      method: 'GET',
      headers: {
        'X-Api-Key': '0I3WRBlnMomVDN+I/WHrUA==yaDQaKzOSciCPkpB',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setMotos(res);
        originalMotos.current = res;
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredMotos =
    filterType !== null && filterType.length > 0
      ? motos.filter((moto) => {
          return moto.type.toLowerCase().includes(filterType.toLowerCase());
        })
      : motos;

  const sortedMotos = sortByType
    ? [...filteredMotos].sort((a, b) => a.type.localeCompare(b.type))
    : filteredMotos;

  //Reset Everything function
  const handleReset = () => {
    setMotos(originalMotos.current);
  };

  //Delete Everything function
  const handleDelete = (model) => {
    const filteredMotos = motos.filter((moto) => {
      return moto.model !== model;
    });
    setMotos(filteredMotos);
  };

  //Decorating table function
  const toggleColors = () => {
    setShowColors(!showColors);
  };

  //Sorting table function
  const toggleSortByType = () => {
    setSortByType(!sortByType);
  };

  return (
    <div>
      <h1>BMW Top list</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button onClick={toggleSortByType}>
          {sortByType ? 'No Ordenar por Tipo' : 'Ordenar por Tipo'}
        </button>
        <button onClick={handleReset}>Restaurar Todo</button>
        <input
          placeholder="Filtra por tipo"
          onChange={(e) => {
            setFilterType(e.target.value);
          }}
        />
      </header>
      <main>
        <MotosList
          motos={sortedMotos}
          showColors={showColors}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
