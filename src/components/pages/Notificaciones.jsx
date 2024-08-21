import { collection, getDoc, getDocs, doc, deleteDoc, writeBatch, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

export const Notificaciones = () => {
  const navigate = useNavigate();

  const usuario = auth.currentUser;

  const idUsuario = usuario.uid;

  const [solicitudes, setSolicitudes] = useState([]);
  const [notificacionesPublicaciones, setNotificacionesPublicaciones] = useState([]);
  const [notificacionesComentarios, setNotificacionesComentarios] = useState([]);

  const obtenerTodasLasSolicitudes = async () => {
    try {
      const solicitudesSnapshot = await getDocs(
        collection(db, "Usuarios", idUsuario, "Solicitudes")
      );
      const solicitudesPromises = solicitudesSnapshot.docs.map(async (solicitudDoc) => {
        const usuarioId = solicitudDoc.id;
        const usuarioDocRef = doc(db, "Usuarios", usuarioId);
        const usuarioDoc = await getDoc(usuarioDocRef);
        if (usuarioDoc.exists()) {
          const usuarioData = usuarioDoc.data();
          return {
            id: usuarioId,
            nombre: usuarioData.nombre,
            apellido: usuarioData.apellido,
            email: usuarioData.email,
            foto: usuarioData.foto,
          };
        } else{
          return null;
        }
      });
      const todasSolicitudes = await Promise.all(solicitudesPromises);
      setSolicitudes(todasSolicitudes);
    } catch (error) {
      console.error("Error al obtener usuarios seguidos: ", error);
    }
  };

  const aceptarSolicitud = async usuarioSeleccionado => {
    const batch = writeBatch(db);
  
    const refSolicitud = doc(db, `Usuarios/${idUsuario}/Solicitudes/${usuarioSeleccionado}`);
    const refSeguidor = doc(db, `Usuarios/${idUsuario}/Seguidores/${usuarioSeleccionado}`);
    const refSeguido = doc(db, `Usuarios/${usuarioSeleccionado}/Siguiendo/${idUsuario}`);

    batch.set(refSeguidor, { id: usuarioSeleccionado });
    batch.delete(refSolicitud);
    batch.set(refSeguido, { id: idUsuario });

    await batch.commit();
    await obtenerTodasLasSolicitudes(); 
  };

  const rechazarSolicitud = async usuarioSeleccionado => {
    try {
      const refSolicitud = doc(db, `Usuarios/${idUsuario}/Solicitudes/${usuarioSeleccionado}`);
      await deleteDoc(refSolicitud);
      await obtenerTodasLasSolicitudes(); 
    } catch (error) {
      console.error("Error al rechazar la solicitud (rechazarSolicitud)", error); 
    }
  };

  const obtenerTodasLasNotificacionesPublicaciones = async () => {
    try {
      const notificacionesRef = collection(db, `Usuarios/${idUsuario}/NotificacionesPublicaciones`);
      const q = query(notificacionesRef, orderBy("fecha", "desc"));
      const notificacionesSnapshot = await getDocs(q);

      const notificaciones = [];
      notificacionesSnapshot.forEach((doc) => {
        notificaciones.push({
          id: doc.id,
          ...doc.data()
        });
      });

      setNotificacionesPublicaciones(notificaciones);
    } catch (error) {
      console.error("Error al obtener usuarios seguidos: ", error);
    }
  };

  const eliminarNotificacionPublicacion = async notificacionSeleccionada => {
    try {
      const refNotificacionPublicacion = doc(db, "Usuarios", idUsuario, "NotificacionesPublicaciones", notificacionSeleccionada);
      await deleteDoc(refNotificacionPublicacion);
      await obtenerTodasLasNotificacionesPublicaciones();
    } catch (error) {
      console.error("Error al eliminar la notificación (eliminarNotificacionPublicacion)", error);
    }
  };

  const obtenerTodasLasNotificacionesComentarios = async () => {
    try {
      const notificacionesRef = collection(db, `Usuarios/${idUsuario}/NotificacionesComentarios`);
      const q = query(notificacionesRef, orderBy("fecha", "desc"));
      const notificacionesSnapshot = await getDocs(q);

      const notificaciones = [];
      notificacionesSnapshot.forEach((doc) => {
        notificaciones.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setNotificacionesComentarios(notificaciones);
    } catch (error) {
      console.error("Error al obtener usuarios seguidos: ", error);
    }
  };

  const eliminarNotificacionComentario = async notificacionSeleccionada => {
    try {
      const refNotificacionPublicacion = doc(db, "Usuarios", idUsuario, "NotificacionesComentarios", notificacionSeleccionada);
      await deleteDoc(refNotificacionPublicacion);
      await obtenerTodasLasNotificacionesComentarios();
    } catch (error) {
      console.error("Error al eliminar la notificación (eliminarNotificacionPublicacion)", error);
    }
  };



  const handlePerfilClick = (id) => {
    navigate(`/perfil/${id}`);
  };

  useEffect(() => {
    obtenerTodasLasSolicitudes();
    obtenerTodasLasNotificacionesPublicaciones();
    obtenerTodasLasNotificacionesComentarios();
  }, [])
  
    return (
      <div style={estiloRapido.container}>
        <div style={estiloRapido.solicitudesContainer}>
          <h2 style={estiloRapido.title}>Solicitudes de seguimiento</h2>
          <ul style={estiloRapido.list}>
            {solicitudes.map((solicitud) => (
              <div key={solicitud.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={solicitud.foto}
                    alt={solicitud.nombre}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span 
                      className="text-xs font-medium cursor-pointer"
                      onClick={() => handlePerfilClick(solicitud.id)}
                    >
                      {solicitud.nombre} {solicitud.apellido} 
                    </span>
                    <span className="text-xs text-gray-400">{solicitud.email}</span>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white rounded-full px-4 py-1 text-xs hover:bg-blue-700 w-auto"
                  onClick={() => aceptarSolicitud(solicitud.id)}
                >
                  Aceptar
                </button>
                <button
                  className="bg-gray-500 text-white rounded-full px-2 py-1 text-xs hover:bg-gray-700 w-auto"
                  onClick={() => rechazarSolicitud(solicitud.id)}
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div style={estiloRapido.solicitudesContainer}>
          <h2 style={estiloRapido.title}>Nuevas publicaciones</h2>
          <ul style={estiloRapido.list}>
            {notificacionesPublicaciones.map((notificacion) => (
              <div key={notificacion.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={notificacion.fotoPerfil}
                    alt={notificacion.nombre}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span 
                      className="text-xs font-medium cursor-pointer"
                      onClick={() => handlePerfilClick(notificacion.idUsuario)}
                    >
                      <strong>{notificacion.nombre} {notificacion.apellido}</strong> ha realizado una nueva publicación.
                    </span>
                  </div>
                  <img
                    src={notificacion.fotoPublicacion}
                    alt={notificacion.nombre}
                    className="w-10 h-10"
                  />
                </div>
                <button
                  className="bg-gray-500 text-white rounded-full px-2 py-1 text-xs hover:bg-gray-700 w-auto"
                  onClick={() => eliminarNotificacionPublicacion(notificacion.id)}
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        </div>
        <div style={estiloRapido.solicitudesContainer}>
          <h2 style={estiloRapido.title}>Nuevos comentarios</h2>
          <ul style={estiloRapido.list}>
            {notificacionesComentarios.map((notificacion) => (
              <div key={notificacion.id} className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={notificacion.fotoPerfil}
                    alt={notificacion.nombre}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span 
                      className="text-xs font-medium cursor-pointer"
                      onClick={() => handlePerfilClick(notificacion.idUsuario)}
                    >
                      <strong>{notificacion.nombre} {notificacion.apellido}</strong> te ha comentado en una publicación.
                    </span>
                  </div>
                  <img
                    src={notificacion.fotoPublicacion}
                    alt={notificacion.nombre}
                    className="w-10 h-10"
                  />
                </div>
                <button
                  className="bg-gray-500 text-white rounded-full px-2 py-1 text-xs hover:bg-gray-700 w-auto"
                  onClick={() => eliminarNotificacionComentario(notificacion.id)}
                >
                  X
                </button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    )
}

//Estilos rápidos
const estiloRapido = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  solicitudesContainer: {
    flex: 1, 
    backgroundColor: 'white',
    padding: '20px',
    boxSizing: 'border-box',
    borderRight: '2px solid gray',
  },
  title: {
    marginBottom: '30px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    overflowY: 'auto', 
    maxHeight: 'calc(100vh - 60px)', 
  },
  listItem: {
    padding: '10px',
    backgroundColor: '#fff',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
  content: {
    flex: 1, 
    padding: '20px',
    boxSizing: 'border-box',
  },
};