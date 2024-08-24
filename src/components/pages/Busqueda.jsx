import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { PublicacionModal } from "../modals/PublicacionModal";

export const Busqueda = () => {

  const usuario = auth.currentUser;
  const idUsuario = usuario.uid;
  const [abrirPublicacion, setAbrirPublicacion] = useState(false);
  const [publicacion, setPublicacion] = useState();
  const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");

  const publicacionesFiltro = publicacionesFiltradas.filter((publicacion) =>
    publicacion.tags.some((tag) =>
      tag.toLowerCase().includes(terminoBusqueda.toLowerCase())
    )
  );
  
  const fetchPosts = async () => {
    try {
      const usuariosPRef = collection(db, "Usuarios");
      const consulta = query(usuariosPRef, where('privacidad', '==', 'publica'));
      const usuariosPSnapshot = await getDocs(consulta);
      const usuariosPIds = usuariosPSnapshot.docs.map(doc => doc.id);

      const siguiendoRef = collection(db, "Usuarios", idUsuario, "Siguiendo");
      const siguiendoSnapshot = await getDocs(siguiendoRef);
      const siguiendoIds = siguiendoSnapshot.docs.map((doc) => doc.id);
      
      const usuariosNoSeguidosIds = usuariosPIds.filter(
        (id) => !siguiendoIds.includes(id)
      );

      if (usuariosNoSeguidosIds.length > 0) {
        const publicacionesRef = collection(db, "Publicaciones");
        const publicacionesQuery = query(publicacionesRef, where("idUsuario", "in", usuariosNoSeguidosIds));
        const publicacionesSnapshot = await getDocs(publicacionesQuery);
        const publicaciones = publicacionesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })); 
        setPublicacionesFiltradas(publicaciones);        
      } else {
        setPublicacionesFiltradas([]);
      }
    } catch (error) {
        console.error("Error obteniendo publicaciones:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [])
  
  return (
    <>
      <div className="flex flex-col items-center sticky top-0">
        {/* Barra de búsqueda */}
        <div className="mb-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Buscar por etiquetas"
            className="p-2 border border-gray-300 rounded w-full"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
      {/* Mostrar publicaciones filtradas */}
      <div className="grid grid-cols-3 gap-4">
        {publicacionesFiltro.map((publicacion) => (
          <div
            key={publicacion.id}
            className="w-300 h-300 p-1"
            style={{ width: "300px", height: "300px" }}
          >
            {publicacion.fileUrls && publicacion.fileUrls.length > 0 && (
              <img
                src={publicacion.fileUrls[0]}
                alt={`Imagen de la publicación ${publicacion.caption}`}
                className="w-full h-full rounded-3 cursor-pointer object-cover"
                onClick={() => {
                  setAbrirPublicacion(true);
                  setPublicacion(publicacion);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
    {abrirPublicacion && (
      <PublicacionModal
        onCerrar={() => setAbrirPublicacion(false)}
        publicacion={publicacion}
      />
    )}
    </>
  )
}
