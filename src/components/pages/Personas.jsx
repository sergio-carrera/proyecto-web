import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onFindAll } from "../../config/Api";
import "../../styles/personas.css";

export const Personas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const result = await onFindAll("Usuarios");
      setUsuarios(result.docs);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const [seguidores, setSeguidores] = useState({}); // Estado para seguir/pendiente

  const toggleSeguir = (userId) => {
    setSeguidores((prev) => {
      const isFollowing = prev[userId];
      return {
        ...prev,
        [userId]: isFollowing === 'seguir' ? 'dejar-seguir' : (isFollowing === 'pendiente' ? 'pendiente' : 'seguir'),
      };
    });
  };

  const filteredUsuarios = usuarios.filter(user => 
    user.data().nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="personas-container">
      <input
        type="text"
        className="busqueda-input"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Buscar usuarios..."
      />
      {loading ? (
        <div className="loading-container">Cargando usuarios...</div>
      ) : (
        <div className="lista-usuarios">
          {filteredUsuarios.length > 0 ? (
            filteredUsuarios.map((user) => {
              const userId = user.id;
              const estadoSeguir = seguidores[userId] || 'seguir'; // Estado por defecto
              return (
                <Link to={`/perfil/${userId}`} key={userId} className="usuario-card">
                  <img src={user.data().foto} alt="Foto de perfil" className="foto-perfil" />
                  <div>
                    <p>{user.data().nombre}</p>
                    <p>{user.data().email}</p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault(); // Prevenir la redirección al perfil cuando se hace clic en el botón de seguir
                      toggleSeguir(userId);
                    }}
                  >
                    {estadoSeguir === 'seguir' ? 'Seguir' : estadoSeguir === 'dejar-seguir' ? 'Dejar de Seguir' : 'Pendiente'}
                  </button>
                </Link>
              );
            })
          ) : (
            <p>No se encontraron usuarios.</p>
          )}
        </div>
      )}
    </div>
  );
};