import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [lugares, setLugares] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Todas");
  useEffect(() => {
    const data = [
      {
        nombre: "Bar Irlanda",
        ubicacion: "Yerba Buena",
        categoria: "Bar",
        fuente: "Mock",
      },
      {
        nombre: "Café Martínez",
        ubicacion: "San Miguel de Tucumán",
        categoria: "Café",
        fuente: "Mock",
      },
      {
        nombre: "Festival Norte",
        ubicacion: "Tucumán",
        categoria: "Evento",
        fuente: "Mock",
      },
    ];

    setLugares(data);
  }, []);
  // Extraer categorías únicas para el filtro
  const categorias = ["Todas", ...new Set(lugares.map((lugar) => lugar.categoria))];

  // Filtrar lugares según búsqueda y categoría
  const filteredLugares = lugares.filter((lugar) => {
    const matchesSearch = lugar.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lugar.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "Todas" || lugar.categoria === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app-container">
      <div className="header">
        <h1>Explora Tucumán</h1>
        <p>Dashboard de bares, restaurantes y eventos de la provincia</p>
        <div className="stats-badge">Total descubiertos: {lugares.length}</div>
      </div>

      <div className="controls-container">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o ubicación..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="category-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categorias.map((cat, index) => (
            <option key={index} value={cat}>
              {cat === "Todas" ? "Todas las categorías" : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredLugares.length === 0 ? (
        <div className="empty-state">No se encontraron resultados para tu búsqueda.</div>
      ) : (
        <div className="grid-container">
          {filteredLugares.map((lugar) => (
            <div key={lugar.id} className="card">
              <h3>{lugar.nombre}</h3>

              <div className="card-content">
                <div className="info-row">
                  <strong>Ubicación</strong>
                  <span>{lugar.ubicacion}</span>
                </div>
                <div className="info-row">
                  <strong>Categoría</strong>
                  <span className="category-tag">{lugar.categoria}</span>
                </div>
                <div className="info-row">
                  <strong>Fuente</strong>
                  <span>{lugar.fuente}</span>
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <span className={`status-badge ${lugar.activo ? 'status-active' : 'status-inactive'}`}>
                  {lugar.activo ? "● Abierto / Activo" : "○ Inactivo"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;