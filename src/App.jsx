import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!busqueda) {
      setData([]);
      return;
    }

    const fetchUni = async () => {
      setLoading(true);
      try {
        // REEMPLAZA ESTA URL CON LA TUYA SI ES NECESARIO
        const res = await axios.get(`https://psychic-guacamole-g4p4w9jjp6v6c9756-3001.app.github.dev/api/universidades?name=${busqueda}`);
        setData(res.data);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchUni, 500);
    return () => clearTimeout(delay);
  }, [busqueda]);

  return (
    <div className="container">
      <h2>🎓 Buscador de <br /> 
      Universidades</h2>
      <input 
        type="text" 
        placeholder="Ej: San Marcos, Lima, UTP..." 
        onChange={(e) => setBusqueda(e.target.value)} 
      />
      
      {loading && <p>Buscando...</p>}
      
      <ul>
        {!loading && data.length === 0 && busqueda && <p>No se encontraron resultados.</p>}
        {data.slice(0, 10).map((u, i) => (
          <li key={i} className="uni-card">
            <strong>{u.name}</strong> <br />
            <small>{u.country}</small> <br />
            <a href={u.web_pages[0]} target="_blank" rel="noopener noreferrer">
              {u.web_pages[0]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;