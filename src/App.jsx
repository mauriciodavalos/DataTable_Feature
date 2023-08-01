import React from 'react';
import { useEffect, useState, useRef } from 'react';
import './App.css';
import { MotosList } from './MotosList';

function App() {
  const [motos, setMotos] = useState([]);
  const [showColors, setShowColors] = useState(false);
  const [sortBy, setSortBy] = useState('none');
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

  //sort by model and type
  let sortedMotos = filteredMotos;
  if (sortBy === 'type') {
    sortedMotos = [...filteredMotos].sort((a, b) =>
      a.type.localeCompare(b.type)
    );
  } else if (sortBy === 'model') {
    sortedMotos = [...filteredMotos].sort((a, b) =>
      a.model.localeCompare(b.model)
    );
  } else if (sortBy === 'none') {
    sortedMotos = filteredMotos;
  } else if (sortBy === 'topspeed') {
    sortedMotos = [...filteredMotos].sort((a, b) => {
      const speedA = parseFloat(a.top_speed);
      const speedB = parseFloat(b.top_speed);

      return speedA - speedB;
    });
  }

  //Reset Everything function without changing formatting
  const handleReset = () => {
    setMotos(originalMotos.current);
    setSortBy('none');
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

  return (
    <div>
      <h1>Top BMW Motos</h1>
      <header>
        <button onClick={toggleColors}>Colorear Filas</button>
        <button
          onClick={() => {
            setSortBy('type');
          }}>
          Ordenar por Tipo
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
          setSortBy={setSortBy}
        />
      </main>
    </div>
  );
}

export default App;
