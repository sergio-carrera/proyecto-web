import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
//import { InteractuarPendienteSolicitudModal2 } from "../modals/modals2/InteractuarPendienteSolicitudModal2";
import { InteractuarSiguiendoModal2 } from "../modals/modals2/InteractuarSiguiendoModal2";

export const MostrarSiguiendo = ({ onCerrar, idUsuarioE, obtenerCantSeguidos }) => {

  const usuario = auth.currentUser;

  const idUsuario = usuario.uid;

  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalSiguiendo2, setMostrarModalSiguiendo2] = useState(false);

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

  const obtenerTodosLosUsuariosSeguidos = async () => {
    try {
      const usuariosSeguidosSnapshot = await getDocs(
        collection(db, "Usuarios", idUsuarioE, "Siguiendo")
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

  //Botón para la lógica de "Siguiendo"
  const btnSiguiendo_onClick = (usuarioSeleccionadO) => {   
    setUsuarioSeleccionado(usuarioSeleccionadO);
    setMostrarModalSiguiendo2(true);
  }

  const dejarDeSeguir = async () => {
    try {   
      const refSeguidor = doc(db, `Usuarios/${usuarioSeleccionado.id}/Seguidores/${idUsuario}`);
      await deleteDoc(refSeguidor);

      const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${usuarioSeleccionado.id}`);
      await deleteDoc(refSeguido);
      
      await obtenerTodosLosUsuariosSeguidos(); 
      await obtenerCantSeguidos(idUsuarioE);
      setMostrarModalSiguiendo2(false);
      setUsuarioSeleccionado(null);
    } catch (error) {
      console.error("Error al dejar de seguir (dejarDeSeguir)", error); 
    }
  };

  /*
  const dejarDeSeguir = async idUsuarioADejarSeguir => {
    try {
      const refSeguidor = doc(db, `Usuarios/${idUsuarioADejarSeguir}/Seguidores/${idUsuario}`);
      await deleteDoc(refSeguidor);

      const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${idUsuarioADejarSeguir}`);
      await deleteDoc(refSeguido)
  
      //const cantSeguidos = await obtenerCantSeguidos(idUsuarioE);
      //setCantSeguidos(cantSeguidos);
      //setMostrarModalSiguiendo(false);
    } catch (error) {
      console.error("Error al dejar de seguir (dejarDeSeguir)", error); 
    }
  }
    */

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
          
          //const estado = await verificarSiLoSigo(idUsuario, idUsuarioASeguir);
          //setLoSigo(estado);  

          //const cantSeguidores = await obtenerCantSeguidores(idUsuarioASeguir);
          //setCantSeguidores(cantSeguidores);

          //const cantSeguidos = await obtenerCantSeguidos(idUsuarioASeguir);
          //setCantSeguidos(cantSeguidos);

          console.log(`Cuenta seguida`);
          obtenerTodosLosUsuariosSeguidos();
        } else if (usuarioData.privacidad === "privada") {
          const refSolicitud = doc(db, `Usuarios/${idUsuarioASeguir}/Solicitudes/${idUsuario}`);
          await setDoc(refSolicitud, { id: idUsuario });

          //const estado = await verificarSiHasEnviadoSolicitud(idUsuario, idUsuarioASeguir);
          //setHasEnviadoSolicitud(estado);
          console.log(`Solicitud enviada`);
          obtenerTodosLosUsuariosSeguidos();
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
          //const estado = await verificarSiLoSigo(idUsuario, idUsuarioASeguir);
          //setLoSigo(estado);  

          //const cantSeguidores = await obtenerCantSeguidores(idUsuarioASeguir);
          //setCantSeguidores(cantSeguidores);

          //const cantSeguidos = await obtenerCantSeguidos(idUsuarioASeguir);
          //setCantSeguidos(cantSeguidos);

          console.log(`Cuenta seguida`);
          obtenerTodosLosUsuariosSeguidos();
        } else if (usuarioData.privacidad === "privada") {
          const refSolicitud = doc(db, `Usuarios/${idUsuarioASeguir}/Solicitudes/${idUsuario}`);
          await setDoc(refSolicitud, { id: idUsuario });
          //const estado = await verificarSiHasEnviadoSolicitud(idUsuario, idUsuarioASeguir);
          //setHasEnviadoSolicitud(estado);

          console.log(`Solicitud enviada`);
          obtenerTodosLosUsuariosSeguidos();
        }
      } else {
        console.log("El usuario no existe.");
      }
    } catch (error) {
      console.error("Error al seguir (btnSeguir_onClick)", error); 
    }
  }

  /*
  //Botón para la lógica de "Pendiente"
  const btnPendiente_onClick = async () => {
    //setMostrarModalPendienteSolicitud(true);
  }

  const eliminarSolicitud = async idUsuarioAEliminarSolicitud => {
    try {
      const refSolicitud = doc(db, `Usuarios/${idUsuarioAEliminarSolicitud}/Solicitudes/${idUsuario}`);
      await deleteDoc(refSolicitud);
      //const estado = await verificarSiHasEnviadoSolicitud(idUsuarioAEliminarSolicitud);
      //setHasEnviadoSolicitud(estado);
      //setMostrarModalPendienteSolicitud(false);
    } catch (error) {
      console.error("Error al dejar de seguir (dejarDeSeguir)" ,error); 
    }
  }
  */
  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    obtenerTodosLosUsuariosSeguidos();
  }, [idUsuario, idUsuarioE])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-black">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Siguiendo</h2>
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
                  <span className="text-xs font-medium">{usuario.nombre} {usuario.apellido}</span>
                  <span className="text-xs text-gray-400">{usuario.email}</span>
                </div>
              </div>

              {usuario.loSigo ? (
                <button
                  className="bg-transparent border border-gray-500 text-gray-500 rounded-full px-4 py-1 text-xs hover:text-black hover:border-black w-auto"
                  onClick={() => btnSiguiendo_onClick(usuario)}
                >
                  Siguiendo
                </button>
              ) : usuario.solicitudPendiente ? (
                <button
                  className="bg-gray-500 text-white rounded-full px-3 py-1 text-xs cursor-not-allowed w-auto"
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
                  className="bg-gray-500 text-white rounded-full px-4 py-1 text-xs cursor-not-allowed w-auto"
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
      {mostrarModalSiguiendo2 && (
        <InteractuarSiguiendoModal2
          onCerrar={() => setMostrarModalSiguiendo2(false)}
          onAceptar={dejarDeSeguir}
          usuarioSeleccionado={usuarioSeleccionado}
        />
      )}
    </div>
  );
};


MostrarSiguiendo.propTypes = {
  onCerrar: PropTypes.func.isRequired,
  idUsuarioE: PropTypes.string.isRequired,
  obtenerCantSeguidos: PropTypes.func.isRequired
};
