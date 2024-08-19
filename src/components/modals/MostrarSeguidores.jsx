import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
//import { InteractuarPendienteSolicitudModal2 } from "../modals/modals2/InteractuarPendienteSolicitudModal2";
import { EliminarSeguidorModal } from "../modals/modals2/EliminarSeguidorModal";
import { InteractuarSiguiendoModal2 } from "../modals/modals2/InteractuarSiguiendoModal2";
import { InteractuarPendienteSolicitudModal2 } from "./modals2/InteractuarPendienteSolicitudModal2";
import { useNavigate } from "react-router-dom";

export const MostrarSeguidores = ({ onCerrar, idUsuarioE, obtenerCantSeguidores, setCantSeguidores }) => {

  const navigate = useNavigate();

  const handlePerfilClick = (id) => {
    navigate(`/perfil/${id}`);
    onCerrar();
  };

  const usuario = auth.currentUser;

  const idUsuario = usuario.uid;

  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalEliminarSeguidor, setMostrarModalEliminarSeguidor] = useState(false);
  const [mostrarModalSiguiendo2, setMostrarModalSiguiendo2] = useState(false);
  const [mostrarModalPendienteSolicitud2, setMostrarModalPendienteSolicitud2] = useState(false);

  const verificarSiTeSigue = async idUsuarioVerif => {
    const ref = doc(db, `Usuarios/${idUsuarioVerif}/Siguiendo/${idUsuario}`);
    const docSnap = await getDoc(ref);
    return docSnap.exists();
  };
  
  const verificarSiHasEnviadoSolicitud = async idUsuarioVerif => {
    const ref = doc(db, `Usuarios/${idUsuarioVerif}/Solicitudes/${idUsuario}`);
    const docSnap = await getDoc(ref);
    return docSnap.exists();
  };

  const verificarSiLoSigo = async idUsuarioVerif => {
    try {
      const usuarioRef = doc(db, 'Usuarios', idUsuario);
      const amistadRef = collection(usuarioRef, 'Siguiendo');
      const q = query(amistadRef, where('__name__', '==', idUsuarioVerif));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error al verificar si es un usuario seguido (verificarSiLoSigo): ", error);
      return false;
    }
  };

  const verificarSiEsPerfilAutenticado = async idUsuarioVerif => {
    try {
      if (idUsuarioVerif == idUsuario) {
        return true;
      } else if (idUsuarioVerif !== idUsuario) {
        return false;
      }else{
        return;
      }
    } catch (error) {
      console.error("Error al verificar si es el usuario autenticado (verificarSiEsPerfilAutenticado): ", error);
      return;
    }
  };

  const obtenerTodosLosUsuariosSeguidores = async () => {
    try {
      const usuariosSeguidosSnapshot = await getDocs(
        collection(db, "Usuarios", idUsuarioE, "Seguidores")
      );
      const usuariosSeguidosPromises = usuariosSeguidosSnapshot.docs.map(async (usuarioSeguidoDoc) => {
        const usuarioId = usuarioSeguidoDoc.id;
        const usuarioDocRef = doc(db, "Usuarios", usuarioId);
        const usuarioDoc = await getDoc(usuarioDocRef);
        if (usuarioDoc.exists()) {
          const usuarioData = usuarioDoc.data();
          const [loSigo, teSigue, solicitudPendiente, esPerfilPropio] = await Promise.all([
            verificarSiLoSigo(usuarioId),
            verificarSiTeSigue(usuarioId),
            verificarSiHasEnviadoSolicitud(usuarioId),
            verificarSiEsPerfilAutenticado(usuarioId),
          ]);
          return {
            id: usuarioId,
            nombre: usuarioData.nombre,
            apellido: usuarioData.apellido,
            foto: usuarioData.foto,
            email: usuarioData.email,
            loSigo,
            teSigue,
            solicitudPendiente,
            esPerfilPropio,
          };
        } else {
          console.log(`El usuario con ID ${usuarioId} no existe.`);
          return null; 
        }
      });
      const usuariosSeguidos = await Promise.all(usuariosSeguidosPromises);
      setUsuarios(usuariosSeguidos.filter(usuario => usuario !== null));
    } catch (error) {
      console.error("Error al obtener usuarios seguidos: ", error);
    }
  };
  
  //------------------------------------------------------Para renderizar los botones pertienentes------------------------------------------------------

  //Mostrar el modal para interacturar con la solicitud de seguimiento.
  //const [mostrarModalSolicitudSeguimiento, setMostrarModalSolicitudSeguimiento] = useState(false);

  //Mostrar el modal para interactuar con botón "Pendiente" (¿eliiminar solicitud de amistad enviada?).
  //const [mostrarModalPendienteSolicitud, setMostrarModalPendienteSolicitud] = useState(false);

  //Mostrar el modal para interactuar con botón "Siguiendo" (¿eliiminar seguimiento de usuario?).
  //const [mostrarModalSiguiendo, setMostrarModalSiguiendo] = useState(false);

  //------------------------------------------------------Eventos de los botones "principales" del perfil de otro usuario------------------------------------------------------

  //Botón para eliminar seguidor, la lógica de "Eliminar"
  const btnEliminar_onClick = usuarioSeleccionadO => {
    setUsuarioSeleccionado(usuarioSeleccionadO);
    setMostrarModalEliminarSeguidor(true);
  }

  const eliminarSeguidor = async () => {
    try {   
      const refSeguidor = doc(db, `Usuarios/${idUsuario}/Seguidores/${usuarioSeleccionado.id}`);
      await deleteDoc(refSeguidor);

      const refSeguido = doc(db, `Usuarios/${usuarioSeleccionado.id}/Siguiendo/${idUsuario}`);
      await deleteDoc(refSeguido);
      
      await obtenerTodosLosUsuariosSeguidores(); 
      const seguidores = await obtenerCantSeguidores(idUsuarioE);
      setCantSeguidores(seguidores);
      setMostrarModalEliminarSeguidor(false);
      setUsuarioSeleccionado(null);
    } catch (error) {
      console.error("Error al eliminar seguidor (eliminarSeguidor)", error); 
    }
  }

  //Botón para la lógica de "Siguiendo"
  const btnSiguiendo_onClick = usuarioSeleccionadO => {   
    setUsuarioSeleccionado(usuarioSeleccionadO);
    setMostrarModalSiguiendo2(true);
  }

  const dejarDeSeguir = async () => {
    try {   
      const refSeguidor = doc(db, `Usuarios/${usuarioSeleccionado.id}/Seguidores/${idUsuario}`);
      await deleteDoc(refSeguidor);

      const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${usuarioSeleccionado.id}`);
      await deleteDoc(refSeguido);
      
      await obtenerTodosLosUsuariosSeguidores(); 
      const seguidores = await obtenerCantSeguidores(idUsuarioE);
      setCantSeguidores(seguidores);
      setMostrarModalSiguiendo2(false);
      setUsuarioSeleccionado(null);
    } catch (error) {
      console.error("Error al dejar de seguir (dejarDeSeguir)", error); 
    }
  };

  //Botón para la lógica de "Seguir"
  const btnSeguir_onClick = async idUsuarioASeguir => {
    try {
      const refUsuario = doc(db, `Usuarios/${idUsuarioASeguir}`);
      const docUsuarioSnap = await getDoc(refUsuario);
      if (docUsuarioSnap.exists()) {
        const usuarioData = docUsuarioSnap.data();

        if (usuarioData.privacidad === "publica") {
          const refSeguidor = doc(db, `Usuarios/${idUsuarioASeguir}/Seguidores/${idUsuario}`);
          await setDoc(refSeguidor, { id: idUsuario });
          const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${idUsuarioASeguir}`);
          await setDoc(refSeguido, {id: idUsuarioASeguir})
          console.log(`Cuenta seguida`);
          obtenerTodosLosUsuariosSeguidores();
        } else if (usuarioData.privacidad === "privada") {
          const refSolicitud = doc(db, `Usuarios/${idUsuarioASeguir}/Solicitudes/${idUsuario}`);
          await setDoc(refSolicitud, { id: idUsuario });
          console.log(`Solicitud enviada`);
          obtenerTodosLosUsuariosSeguidores();
        }
      } else {
        console.log("El usuario no existe.");
      }
    } catch (error) {
      console.error("Error al seguir (btnSeguir_onClick)", error); 
    }
  }

  //Botón para la lógica de "SeguirTambien"
  const btnSeguirTambien_onClick = async idUsuarioASeguir => {
    try {
      const refUsuario = doc(db, `Usuarios/${idUsuarioASeguir}`);
      const docUsuarioSnap = await getDoc(refUsuario);
      if (docUsuarioSnap.exists()) {
        const usuarioData = docUsuarioSnap.data();

        if (usuarioData.privacidad === "publica") {
          const refSeguidor = doc(db, `Usuarios/${idUsuarioASeguir}/Seguidores/${idUsuario}`);
          await setDoc(refSeguidor, { id: idUsuario });
          const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${idUsuarioASeguir}`);
          await setDoc(refSeguido, {id: idUsuarioASeguir})
          console.log(`Cuenta seguida`);
          obtenerTodosLosUsuariosSeguidores();
        } else if (usuarioData.privacidad === "privada") {
          const refSolicitud = doc(db, `Usuarios/${idUsuarioASeguir}/Solicitudes/${idUsuario}`);
          await setDoc(refSolicitud, { id: idUsuario });
          console.log(`Solicitud enviada`);
          obtenerTodosLosUsuariosSeguidores();
        }
      } else {
        console.log("El usuario no existe.");
      }
    } catch (error) {
      console.error("Error al seguir (btnSeguir_onClick)", error); 
    }
  }

  //Botón para la lógica de "Pendiente"
  const btnPendiente_onClick = async usuarioSeleccionadO => {
    setUsuarioSeleccionado(usuarioSeleccionadO);
    setMostrarModalPendienteSolicitud2(true);
  }

  const eliminarSolicitud = async () => {
    try {
      const refSolicitud = doc(db, `Usuarios/${usuarioSeleccionado.id}/Solicitudes/${idUsuario}`);
      await deleteDoc(refSolicitud);

      await obtenerTodosLosUsuariosSeguidores(); 
      await obtenerCantSeguidores(idUsuarioE);
      setMostrarModalPendienteSolicitud2(false);
      setUsuarioSeleccionado(null);
    } catch (error) {
      console.error("Error al dejar de seguir (dejarDeSeguir)" ,error); 
    }
  }

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    obtenerTodosLosUsuariosSeguidores();
  }, [])

  return (
    <div className="mostrarseguidores-cointainer">
      {idUsuarioE == idUsuario ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Seguidores</h2>
              <button onClick={onCerrar} className="text-gray-500 hover:text-black text-sm w-auto">
                ✕
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Busca"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 text-black"
              />
            </div>
            <div className="flex flex-col space-y-3 max-h-60 overflow-y-auto">
            {usuariosFiltrados.map((usuario) => (
                <div key={usuario.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={usuario.foto}
                      alt={usuario.nombre}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span 
                        className="text-xs font-medium cursor-pointer"
                        onClick={() => handlePerfilClick(usuario.id)}
                      >
                        {usuario.nombre} {usuario.apellido}
                      </span>
                      <span className="text-xs text-gray-400">{usuario.email}</span>
                    </div>
                  </div>
    
                  <button
                    className="bg-blue-500 text-white rounded-full px-4 py-1 text-xs hover:bg-blue-700 w-auto"
                    onClick={() => btnEliminar_onClick(usuario)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/4 text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Seguidores</h2>
              <button onClick={onCerrar} className="text-gray-500 hover:text-black text-sm w-auto">
                ✕
              </button>
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Busca"
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-md bg-gray-200 text-black"
              />
            </div>
            <div className="flex flex-col space-y-3 max-h-60 overflow-y-auto">
            {usuariosFiltrados.map((usuario) => (
                <div key={usuario.id} className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <img
                      src={usuario.foto}
                      alt={usuario.nombre}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <span 
                        className="text-xs font-medium cursor-pointer"
                        onClick={() => handlePerfilClick(usuario.id)}
                      >
                        {usuario.nombre} {usuario.apellido}
                      </span>
                      <span className="text-xs text-gray-400">{usuario.email}</span>
                    </div>
                  </div>

                  {usuario.loSigo ? (
                    <button
                      className="bg-transparent border border-gray-500 text-gray-500 rounded-full px-3 py-1 text-xs hover:text-black hover:border-black w-auto"
                      onClick={() => btnSiguiendo_onClick(usuario)}
                    >
                      Siguiendo
                    </button>
                  ) : usuario.solicitudPendiente ? (
                    <button
                      className="bg-gray-500 text-white rounded-full px-3 py-1 text-xs cursor-not-allowed w-auto"
                      onClick={() => btnPendiente_onClick(usuario)}
                    >
                      Pendiente
                    </button>
                  ) : usuario.teSigue ? (
                    <button
                      className="bg-blue-500 text-white rounded-full px-1 py-1 text-xs hover:bg-blue-700 w-auto"
                      onClick={() => btnSeguirTambien_onClick(usuario.id)}
                    >
                      Seguir también
                    </button>
                  ) : usuario.esPerfilPropio ? (
                    <button
                      className="bg-white text-gray rounded-full px-4 py-1 text-xs cursor-not-allowed w-auto"
                      disabled
                    >
                      Tu perfil
                    </button>
                  ) : (
                    <button
                      className="bg-primary-500 text-white rounded-full px-4 py-1 text-xs hover:bg-green-700 w-auto"
                      onClick={() => btnSeguir_onClick(usuario.id)}
                    >
                      Seguir
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    {mostrarModalEliminarSeguidor && (
      <EliminarSeguidorModal
        onCerrar={() => setMostrarModalEliminarSeguidor(false)}
        onAceptar={eliminarSeguidor}
        usuarioSeleccionado={usuarioSeleccionado}
      />
    )}
    {mostrarModalSiguiendo2 && (
      <InteractuarSiguiendoModal2
        onCerrar={() => setMostrarModalSiguiendo2(false)}
        onAceptar={dejarDeSeguir}
        usuarioSeleccionado={usuarioSeleccionado}
      />
    )}
    {mostrarModalPendienteSolicitud2 && (
      <InteractuarPendienteSolicitudModal2
        onCerrar={() => setMostrarModalPendienteSolicitud2(false)}
        onAceptar={eliminarSolicitud}
        usuarioSeleccionado={usuarioSeleccionado}
      />
    )}
    </div>
  );
};

MostrarSeguidores.propTypes = {
  onCerrar: PropTypes.func.isRequired,
  idUsuarioE: PropTypes.string.isRequired,
  obtenerCantSeguidores: PropTypes.func.isRequired,
  setCantSeguidores: PropTypes.func.isRequired
};