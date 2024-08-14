import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { auth, db, storage } from "../../config/firebase";
import {PropTypes} from "prop-types";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { onDelete, onUpdate } from "../../config/Api";
import { CambiarFotoPerfilModal } from "../modals/CambiarFotoPerfilModal";
import { sendPasswordResetEmail } from "firebase/auth";
import "../../styles/globals.css";
import Swal from "sweetalert2";
import { PublicacionModal } from "../modals/PublicacionModal";
import { InteractuarSolicitudSeguimientoModal } from "../modals/InteractuarSolicitudSeguimientoModal";
import { InteractuarPendienteSolicitudModal } from "../modals/InteractuarPendienteSolicitudModal";
import { InteractuarSiguiendoModal } from "../modals/InteractuarSiguiendoModal";
import { MostrarSiguiendo } from "../modals/MostrarSiguiendo";

export const PerfilCardGeneral = ({idUsuarioE}) => {

  //------------------------------------------------------Generalidades------------------------------------------------------

  //Id del usuario autenticado.
  const [idUsuario, setIdUsuario] = useState();

  //Para navegar entre pantallas.
  const navigate = useNavigate();

  //Da un efecto de que se está "cargando" la información. 
  const [loading, setLoading] = useState(true);

  //Estado para controlar qué sección está activa (Todas las publicaciones (1) | Mostrar publicaciones compartidas (2))
  const [activo, setActivo] = useState(1);

  //------------------------------------------------------Detalle del perfil general------------------------------------------------------

  //Este hook es esenciale para manejar visualmente la pantalla y mostrar la información respectiva del perfil del usuario específico.
  const [usuarioDetalles, setUsuarioDetalles] = useState(null);

  //Cantidad de publicaciones del usuario (idUsuarioE)
  const [cantPublicaciones, setCantPublicaciones] = useState(0);

  //Cantidad de seguidores del usuario (idUsuarioE)
  const [cantSeguidores, setCantSeguidores] = useState(0);

  //Cantidad de seguidos del usuario (idUsuarioE)
  const [cantSeguidos, setCantSeguidos] = useState(0);

  //------------------------------------------------------Publicaciones------------------------------------------------------

  //Arreglo para acomodar publicaciones del perfil.
  const [publicaciones, setPublicaciones] = useState([]);

  //Retorna las publicaciones ordenadas por fecha.
  const publicacionesOrdenadas = publicaciones.slice().sort((a, b) => {
    //Convierte las fechas de las publicaciones a objetos Date para comparar
    const fechaA = new Date(a.fecha);
    const fechaB = new Date(b.fecha);
    
    //Ordena de la más antigua a la más reciente
    return fechaB - fechaA;
  });

  //Para controlar el modal que permite comentar o interactuar con una publicación desde el perfil.
  const [abrirPublicacion, setAbrirPublicacion] = useState(false);

  //Para marcar la publicación que se enviará al modal de PublicacionModal
  const [publicacion, setPublicacion] = useState();

  //------------------------------------------------------Editar perfil (perfil propio)------------------------------------------------------

  //Para controlar el modal que permite editar o eliminar la foto de perfil actual.
  const [mostrarModalFoto, setMostrarModalFoto] = useState(false);

  //Se verifica que el estado esté en editar.
  const [estadoEditar, setEstadoEditar] = useState(false);

  //Para controlar el modal de todos los usuarios seguidores.
  //const [mostrarSeguidores, setMostrarSeguidores] = useState(false);

  //Para controlar el modal de todos los usuarios seguidos.
  const [mostrarSiguiendo, setMostrarSiguiendo] = useState(false);

  //------------------------------------------------------Perfil de otro usuario------------------------------------------------------

  //Para ver si el usuario autenticado sigue al otro usuario.
  const [loSigo, setLoSigo] = useState(null);

  //Verificar la privacidad del perfil del otro usuario.
  const [privacidad, setPrivacidad] = useState(null);

  //Para ver si el otro usuario sigue al usuario autenticado.
  const [teSigue, setTeSigue] = useState(false);

  //Para ver si el otro usuario le ha enviado una solicitud al usuario autenticado.
  const [teHaEnviadoSolicitud, setTeHaEnviadoSolicitud] = useState(false);

  //Para ver si el usuario autenticado ha enviado una solicitud de seguimiento al otro usuario.
  const [hasEnviadoSolicitud, setHasEnviadoSolicitud] = useState(false);

  //Mostrar el modal para interacturar con la solicitud de seguimiento.
  const [mostrarModalSolicitudSeguimiento, setMostrarModalSolicitudSeguimiento] = useState(false);

  //Mostrar el modal para interactuar con botón "Pendiente" (¿eliiminar solicitud de amistad enviada?).
  const [mostrarModalPendienteSolicitud, setMostrarModalPendienteSolicitud] = useState(false);

  //Mostrar el modal para interactuar con botón "Siguiendo" (¿eliiminar seguimiento de usuario?).
  const [mostrarModalSiguiendo, setMostrarModalSiguiendo] = useState(false);

  //------------------------------------------------------Funciones de flecha para editar perfil de usuario autenticado------------------------------------------------------

  const handleInputChange =({target}) =>{
    // se desestructura
    const {name, value}= target;
    setUsuarioDetalles({...usuarioDetalles, [name]:value}) 
  }

  const guardarCambios = async ()=>{
      try {
        if (usuarioDetalles.privacidad == "publica") {
          await onUpdate("Usuarios",idUsuario, usuarioDetalles);
          setEstadoEditar(false);
          await aceptarTodasLasSolicitudes();
          refrescar();
          
        } else {
          await onUpdate("Usuarios",idUsuario, usuarioDetalles);
          setEstadoEditar(false);
          refrescar();
        }
        
        Swal.fire({
          title: "¡Éxito!",
          text: "El perfil fue actualizado correctamente",
          icon: "success"
        });

      } catch (error) {
        console.log(error)
      }
  }

  const aceptarTodasLasSolicitudes = async () => {
    const solicitudesSnapshot = await getDocs(
        collection(db, "Usuarios", idUsuario, "Solicitudes")
    );

    const batch = writeBatch(db);

    solicitudesSnapshot.forEach((solicitudDoc) => {
        const idUsuarioE = solicitudDoc.id;

        const siguiendoRef = doc(db, "Usuarios", idUsuarioE, "Siguiendo", idUsuario);
        batch.set(siguiendoRef, { id: idUsuario });

        const seguidoresRef = doc(db, "Usuarios", idUsuario, "Seguidores", idUsuarioE);
        batch.set(seguidoresRef, { id: idUsuarioE });

        const solicitudRef = doc(db, "Usuarios", idUsuario, "Solicitudes", idUsuarioE);
        batch.delete(solicitudRef);
    });

    await batch.commit();

    const cantSeguidores = await obtenerCantSeguidores(idUsuario);
    setCantSeguidores(cantSeguidores);
  };

  const resetPassword= async ()=>{
    await sendPasswordResetEmail (auth, usuarioDetalles.email)
    .then(()=>{
      Swal.fire({
        title: "Email enviado",
        text: "Se ha enviado un correo electrónico para cambiar su contraseña",
        icon: "success"
      });
    })
  }

  const eliminarUsuario =  () => {
    const user = auth.currentUser;
    if (user) {
      
      Swal.fire({
        title: "¿Estás seguro?",
        text: "La cuenta no se podrá recuperar",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Eliminar cuenta!"
      }).then(async (result) => {
        if (result.isConfirmed) {

        await onDelete("Usuarios",idUsuario)
        
        user
          .delete()
          .then(() => {
            navigate("/login");
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        
        });
          Swal.fire({
            title: "¡Eliminado!",
            text: "Su cuenta fue eliminada correctamente",
            icon: "success"
          });
        }
      });
    } else {
      console.log("No user is currently logged in");
    }
  };

  const handleImageClick = () => {
    setMostrarModalFoto(true);
  };

  const cambiarFotoPerfil = (event) => { 
    const file = event.target.files[0];
    if (file) {
      const extensiones = ['image/png', 'image/jpg', 'image/jpeg']
      if (!extensiones.includes(file.type)){
        Swal.fire({
          title: "Inválido",
          text: "Debe seleccionar un archivo con formato válido (jpg, png, jpeg)",
          icon: "error"
        });
      }else{
        const reader = new FileReader();
        reader.onload = (e) => {
            //setImageSrc(e.target.result);        
            Swal.fire({
              title: "Por favor, confirme si desea cambiar la imagen de perfil por la mostrada arriba.",
              text: "La imagen anterior se perderá",
              imageUrl: e.target.result,
              imageAlt: 'Selected Image',
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sí, ¡cambiar!"
            }).then(async (result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "¡Foto de perfil actualizada!",
                  text: "Su imagen ha sido actualizada correctamente.",
                  icon: "success"
                });           
                const storageRef = ref(storage, `images/${file.name}`)
                const fileUpload= await uploadBytes(storageRef, file)
                const url = await getDownloadURL(fileUpload.ref)
                usuarioDetalles.foto = url;
                await onUpdate("Usuarios", idUsuario, usuarioDetalles);
                refrescar();
                setMostrarModalFoto(false);
              }
            });           
        };
        reader.readAsDataURL(file);
      }     
    }
  };

  const eliminarFotoPerfil = async () => {
    usuarioDetalles.foto= "https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/profile-circle-icon-256x256-cm91gqm2.png?alt=media&token=5b2a71ae-e78d-40c4-b2c7-0e07511ad2a3"
    await onUpdate("Usuarios", idUsuario, usuarioDetalles);
    refrescar();
    setMostrarModalFoto(false);
  };  
  
  const refrescar = async ()=> {
    const docRef = doc(db, "Usuarios",idUsuario);
      const docSnap = await getDoc(docRef);
      setUsuarioDetalles(docSnap.data());
  };  

  //------------------------------------------------------Eventos de los botones "principales" del perfil de otro usuario------------------------------------------------------

  //Botón para la lógica de "Siguiendo"
  const btnSiguiendo_onClick = () => {
    setMostrarModalSiguiendo(true);
  }

  const dejarDeSeguir = async () => {
    try {
      const refSeguidor = doc(db, `Usuarios/${idUsuarioE}/Seguidores/${idUsuario}`);
      await deleteDoc(refSeguidor);

      const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${idUsuarioE}`);
      await deleteDoc(refSeguido)

      const estado = await verificarSiLoSigo(idUsuario, idUsuarioE);
      setLoSigo(estado);  

      const cantSeguidores = await obtenerCantSeguidores(idUsuarioE);
      setCantSeguidores(cantSeguidores);

      const cantSeguidos = await obtenerCantSeguidos(idUsuarioE);
      setCantSeguidos(cantSeguidos);
      setMostrarModalSiguiendo(false);
    } catch (error) {
      console.error("Error al dejar de seguir (dejarDeSeguir)", error); 
    }
  }

  //Botón para la lógica de "Seguir"
  const btnSeguir_onClick = async () => {
    try {
      const refUsuario = doc(db, `Usuarios/${idUsuarioE}`);
      const docUsuarioSnap = await getDoc(refUsuario);
      if (docUsuarioSnap.exists()) {
        const usuarioData = docUsuarioSnap.data();

        if (usuarioData.privacidad === "publica") {
          const refSeguidor = doc(db, `Usuarios/${idUsuarioE}/Seguidores/${idUsuario}`);
          await setDoc(refSeguidor, { id: idUsuario });
          const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${idUsuarioE}`);
          await setDoc(refSeguido, {id: idUsuarioE})
          const estado = await verificarSiLoSigo(idUsuario, idUsuarioE);
          setLoSigo(estado);  

          const cantSeguidores = await obtenerCantSeguidores(idUsuarioE);
          setCantSeguidores(cantSeguidores);

          const cantSeguidos = await obtenerCantSeguidos(idUsuarioE);
          setCantSeguidos(cantSeguidos);

          console.log(`Cuenta seguida`);
        } else if (usuarioData.privacidad === "privada") {
          const refSolicitud = doc(db, `Usuarios/${idUsuarioE}/Solicitudes/${idUsuario}`);
          await setDoc(refSolicitud, { id: idUsuario });
          const estado = await verificarSiHasEnviadoSolicitud(idUsuario, idUsuarioE);
          setHasEnviadoSolicitud(estado);
          console.log(`Solicitud enviada`);
        }
      } else {
        console.log("El usuario no existe.");
      }
    } catch (error) {
      console.error("Error al seguir (btnSeguir_onClick)", error); 
    }
  }

  //Botón para la lógica de "SeguirTambien"
  const btnSeguirTambien_onClick = async () => {
    try {
      const refUsuario = doc(db, `Usuarios/${idUsuarioE}`);
      const docUsuarioSnap = await getDoc(refUsuario);
      if (docUsuarioSnap.exists()) {
        const usuarioData = docUsuarioSnap.data();

        if (usuarioData.privacidad === "publica") {
          const refSeguidor = doc(db, `Usuarios/${idUsuarioE}/Seguidores/${idUsuario}`);
          await setDoc(refSeguidor, { id: idUsuario });
          const refSeguido = doc(db, `Usuarios/${idUsuario}/Siguiendo/${idUsuarioE}`);
          await setDoc(refSeguido, {id: idUsuarioE})
          const estado = await verificarSiLoSigo(idUsuario, idUsuarioE);
          setLoSigo(estado);  

          const cantSeguidores = await obtenerCantSeguidores(idUsuarioE);
          setCantSeguidores(cantSeguidores);

          const cantSeguidos = await obtenerCantSeguidos(idUsuarioE);
          setCantSeguidos(cantSeguidos);

          console.log(`Cuenta seguida`);
        } else if (usuarioData.privacidad === "privada") {
          const refSolicitud = doc(db, `Usuarios/${idUsuarioE}/Solicitudes/${idUsuario}`);
          await setDoc(refSolicitud, { id: idUsuario });
          const estado = await verificarSiHasEnviadoSolicitud(idUsuario, idUsuarioE);
          setHasEnviadoSolicitud(estado);

          console.log(`Solicitud enviada`);
        }
      } else {
        console.log("El usuario no existe.");
      }
    } catch (error) {
      console.error("Error al seguir (btnSeguir_onClick)", error); 
    }
  }

  //Botón para la lógica para aceptar o rechazar solicitud de seguimiento de "Te ha enviado solicitud"
  const btnTeHaEnviadoSolicitud_onClick = () => {
    setMostrarModalSolicitudSeguimiento(true);
  }

  const aceptarSolicitud = async () => {
    try {
      const batch = writeBatch(db);
  
      const refSolicitud = doc(db, `Usuarios/${idUsuario}/Solicitudes/${idUsuarioE}`);
      const refSeguidor = doc(db, `Usuarios/${idUsuario}/Seguidores/${idUsuarioE}`);
      const refSeguido = doc(db, `Usuarios/${idUsuarioE}/Siguiendo/${idUsuario}`);
  
      batch.set(refSeguidor, { id: idUsuarioE });
      batch.delete(refSolicitud);
      batch.set(refSeguido, { id: idUsuario });
  
      await batch.commit();
  
      const estado = await verificarSiTeHaEnviadoSolicitud(idUsuario, idUsuarioE);
      setTeHaEnviadoSolicitud(estado);
  
      const estado2 = await verificarSiTeSigue(idUsuario, idUsuarioE);
      setTeSigue(estado2);
  
      const cantSeguidores = await obtenerCantSeguidores(idUsuarioE);
      setCantSeguidores(cantSeguidores);
  
      const cantSeguidos = await obtenerCantSeguidos(idUsuarioE);
      setCantSeguidos(cantSeguidos);
  
      setMostrarModalSolicitudSeguimiento(false);
    } catch (error) {
      console.error("Error al aceptar solicitud (aceptarSolicitud)", error);
    }
  }

  const rechazarSolicitud = async () => {
    try {
      const ref = doc(db, `Usuarios/${idUsuario}/Solicitudes/${idUsuarioE}`);
      await deleteDoc(ref);

      //Hago desaparecer el botón de "Te ha enviado solicitud"
      const estado = await verificarSiTeHaEnviadoSolicitud(idUsuario, idUsuarioE);
      setTeHaEnviadoSolicitud(estado);

      setMostrarModalSolicitudSeguimiento(false);
    } catch (error) {
      console.error("Error al rechazar solicitud (rechazarSolicitud)" ,error); 
    }
  }

  //Botón para la lógica de "Pendiente"
  const btnPendiente_onClick = async () => {
    setMostrarModalPendienteSolicitud(true);
  }

  const eliminarSolicitud = async () => {
    try {
      const refSolicitud = doc(db, `Usuarios/${idUsuarioE}/Solicitudes/${idUsuario}`);
      await deleteDoc(refSolicitud);
      const estado = await verificarSiHasEnviadoSolicitud(idUsuarioE);
      setHasEnviadoSolicitud(estado);
      setMostrarModalPendienteSolicitud(false);
    } catch (error) {
      console.error("Error al dejar de seguir (dejarDeSeguir)" ,error); 
    }
  }

  //-----------------------------------------------------------------useEffect------------------------------------------------------------------

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setIdUsuario(user.uid);
          //Se obtienen los detalles del usuario con base al id de usuario que se pasa como parámetro del componente funcional.
          const userDetails = await obtenerDetallesUsuario(idUsuarioE);
          if (userDetails) {
            setUsuarioDetalles(userDetails);
            //Se obtienen todas las publicaciones, seguidos y seguidores del usuario.
            const [posts, seguidoresCount, seguidosCount] = await Promise.all([
              obtenerPublicacionesUsuario(idUsuarioE),
              obtenerCantSeguidores(idUsuarioE),
              obtenerCantSeguidos(idUsuarioE)
            ]);
            setPublicaciones(posts);
            setCantPublicaciones(posts.length);
            setCantSeguidores(seguidoresCount);
            setCantSeguidos(seguidosCount);
  
            /*
            Acá se ejecuta la promesa que representa la ejecución de todas las funciones asíncronas para
            hacer todas las verificaciones necesarias.
            */
            const [loSigo, esPublico, sigue, haEnviado, teEnviado] = await Promise.all([
              verificarSiLoSigo(idUsuario, idUsuarioE),
              verificarPrivacidad(idUsuarioE),
              verificarSiTeSigue(idUsuario, idUsuarioE),
              verificarSiHasEnviadoSolicitud(idUsuario, idUsuarioE),
              verificarSiTeHaEnviadoSolicitud(idUsuario, idUsuarioE)
            ]);
            setLoSigo(loSigo);
            setPrivacidad(esPublico);
            setTeSigue(sigue);
            setHasEnviadoSolicitud(haEnviado);
            setTeHaEnviadoSolicitud(teEnviado);
          } else {
            console.log("No se ha encontrado detalle del usuario");
          }
        } catch (error) {
          console.error("Error al hacer fetching de datos: ", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    });
  
    return () => unsubscribe();
  }, [navigate, idUsuarioE, idUsuario]);

  //-----------------------------------------------Funciones para ejecutar en el useEffect y cargar datos / verificar datos------------------------------------------------
  
  const verificarSiTeSigue = async (idUsuarioAutenticado, idUsuarioPerfil) => {
    const ref = doc(db, `Usuarios/${idUsuarioPerfil}/Siguiendo/${idUsuarioAutenticado}`);
    const docSnap = await getDoc(ref);
    return docSnap.exists();
  };
  
  const verificarSiHasEnviadoSolicitud = async (idUsuarioAutenticado, idUsuarioPerfil) => {
    const ref = doc(db, `Usuarios/${idUsuarioPerfil}/Solicitudes/${idUsuarioAutenticado}`);
    const docSnap = await getDoc(ref);
    return docSnap.exists();
  };
  
  const verificarSiTeHaEnviadoSolicitud = async (idUsuarioAutenticado, idUsuarioPerfil) => {
    const ref = doc(db, `Usuarios/${idUsuarioAutenticado}/Solicitudes/${idUsuarioPerfil}`);
    const docSnap = await getDoc(ref);
    return docSnap.exists();
  };

  const obtenerDetallesUsuario = async (id) => {
    try {
      const docRef = doc(db, "Usuarios", id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data() : null;
    } catch (error) {
      console.error("Error al obtener detalles del usuario (obtenerDetallesUsuario): ", error);
    }
  };
  
  const obtenerPublicacionesUsuario = async (id) => {
    try {
      const q = query(collection(db, 'Publicaciones'), where('idUsuario', '==', id));
      const queryPublicaciones = await getDocs(q);
      return queryPublicaciones.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error al obtener publicaciones (obtenerPublicacionesUsuario): ", error);
      return [];
    }
  };
  
  const obtenerCantSeguidores = async (id) => {
    try {
      const queryCantSeguidores = await getDocs(collection(db, `Usuarios/${id}/Seguidores`));
      return queryCantSeguidores.size;
    } catch (error) {
      console.error("Error al obtener cantidad de seguidores (obtenerCantSeguidores): ", error);
      return 0;
    }
  };
  
  const obtenerCantSeguidos = async (id) => {
    try {
      const queryCantSeguidos = await getDocs(collection(db, `Usuarios/${id}/Siguiendo`));
      return queryCantSeguidos.size;
    } catch (error) {
      console.error("Error al obtener cantidad de seguidos (obtenerCantSeguidos): ", error);
      return 0;
    }
  };
  
  const verificarSiLoSigo = async (idUsuarioAutenticado, idUsuarioPerfil) => {
    try {
      if (!idUsuarioAutenticado || !idUsuarioPerfil) {
        /*
        El idUsuarioAutenticado llega sin actualizarse, por eso se controla este valor
        "falsy".
        Por eso se usa "return" para devolver un valor nulo mientras se actualiza y renderizar 
        el componente que controla que si "esAmigo" es nulo, entonces muestre un mensaje de que se
        está verificando la amistad entre usuarios.
        */
        return;
      }
      const usuarioRef = doc(db, 'Usuarios', idUsuarioAutenticado);
      const amistadRef = collection(usuarioRef, 'Siguiendo');
      const q = query(amistadRef, where('__name__', '==', idUsuarioPerfil));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Error al verificar si es un usuario seguido (verificarSiLoSigo): ", error);
      return false;
    }
  };
  
  const verificarPrivacidad = async (id) => {
    try {
      const docRef = doc(db, "Usuarios", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      //Acá se le pone un operador de encadenamiento opcional para evitar errores.
      return data?.privacidad === "publica";
    } catch (error) {
      console.error("Error al verificar privacidad (verificarPrivacidad): ", error);
      return false;
    }
  };

  //Mientras se carga la página al principio
  if (loading) {
    return <div>Cargando datos del perfil...</div>;
  }

  return (
    <div className="perfil-contenedor">
      {idUsuarioE === idUsuario ? (
        <div>
          {usuarioDetalles ? (
            estadoEditar === false ? (
              <div className="gradient-custom-2 bg-white min-h-screen">
                <div className="container py-0 h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="lg:w-9/12 xl:w-9/12">
                      <div className="card bg-white rounded-lg">
                        <div className="text-white flex flex-row bg-primary-500 h-[200px]">
                          <div className="ms-4 mt-5 flex flex-col w-[150px] relative">
                            <img
                              src={usuarioDetalles.foto}
                              alt="Placeholder para foto de perfil"
                              className="mt-4 mb-2 img-thumbnail w-[150px] z-10 cursor-pointer"
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                              onClick={handleImageClick}
                            />
                            <button
                              className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                              onClick={() => setEstadoEditar(true)}
                            >
                              Editar perfil
                            </button>
                          </div>
                          <div className="ms-3 mt-[130px]">
                            <h5>{usuarioDetalles.nombre} {usuarioDetalles.apellido}</h5>
                            <p>{usuarioDetalles.email}</p>
                          </div>
                        </div>
                        <div className="p-4 text-black bg-white">
                          <div className="flex justify-end text-center py-1">
                            <div>
                              <p className="mb-1 text-2xl">{cantPublicaciones}</p>
                              <p className="small text-muted mb-0">Publicaciones</p>
                            </div>
                            <div className="px-3">
                              <p className="mb-1 text-2xl">{cantSeguidores}</p> 
                              <p className="small text-muted mb-0">Seguidores</p>
                            </div>
                            <div>
                              <p className="mb-1 text-2xl">{cantSeguidos}</p>
                              <p 
                                className="small text-muted mb-0 cursor-pointer"
                                onClick={() => setMostrarSiguiendo(true)}
                              >
                                Siguiendo
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-black">
                          <div className="mb-5">
                            <p className="lead fw-normal mb-1">Biografía</p>
                            <div className="p-4 bg-white">
                              <p className="mb-1">{usuarioDetalles.biografia}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                          <p 
                            className={`lead fw-normal mb-0 cursor-pointer ${activo === 1 ? 'underline' : 'hover:underline'}`} 
                            onClick={
                              () => setActivo(1)
                            }
                          >
                            Todas las publicaciones
                          </p>
                          <p 
                            className={`lead fw-normal mb-0 cursor-pointer ${activo === 2 ? 'underline' : 'hover:underline'}`} 
                            onClick={
                              () => setActivo(2)
                              //Cambiar estado para mostrar todas las publicaciones compartidas del usuario del perfil
                            }
                          >
                            Mostrar publicaciones compartidas
                          </p>
                          </div>
                          {activo === 1 && (
                            <div className="flex flex-wrap">
                              {publicacionesOrdenadas.map((publicacion) => (
                                <div
                                  key={publicacion.id}
                                  className="w-1/3 p-1"
                                  style={{ width: '300px', height: '300px' }}
                                >
                                  {publicacion.fileUrls && publicacion.fileUrls.length > 0 && (
                                    <img
                                      src={publicacion.fileUrls[0]}
                                      alt={`Imagen de la publicación ${publicacion.caption}`}
                                      className="w-full rounded-3 cursor-pointer object-fill"
                                      style={{ width: '100%', height: '100%' }}
                                      onClick={() => {
                                        setAbrirPublicacion(true);
                                        setPublicacion(publicacion);
                                        console.log(publicacion.fecha);
                                      }}
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {activo === 2 && (
                            <div className="flex flex-wrap">
                              <p>Acá va la lógica para mapear las publicaciones compartidas basándose en el idUsuario principal que recibe este componente funcional</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gradient-custom-2 bg-white min-h-screen">
                <div className="container py-0 h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="lg:w-9/12 xl:w-9/12">
                      <div className="card bg-white rounded-lg">
                        <div className="text-white flex flex-row bg-primary-500 h-[200px]">
                          <div className="ms-4 mt-5 flex flex-col w-[150px] relative">
                            <img
                              src={usuarioDetalles.foto}
                              alt="Placeholder para foto de perfil"
                              className="mt-4 mb-2 img-thumbnail w-[150px] z-10 cursor-pointer"
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                              onClick={handleImageClick}
                            />
                            <button
                              className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                              onClick={() => setEstadoEditar(false)}
                            >
                              Cancelar
                            </button>
                          </div>
                          <div className="ms-3 mt-[130px]">
                            <h5>Editar perfil</h5>
                          </div>
                        </div>
                        <div className="p-4 text-black bg-white">
                          <div className="flex justify-end text-center py-1">
                            <div>
                            <button 
                              className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded" 
                              onClick={guardarCambios}>
                                Guardar cambios
                            </button> 

                            <button 
                              className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"  
                              onClick={resetPassword}>
                                Cambiar contraseña
                            </button>

                            <button 
                              className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"  
                              onClick={eliminarUsuario}>
                                Eliminar cuenta
                            </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-black">
                          <div className="mb-1">
                            <p className="lead fw-normal mb-1">Nombre</p>
                            <div className="p-1 bg-white">
                            <input
                              className="form form-control"
                              onChange={handleInputChange}
                              type="text"
                              value={usuarioDetalles.nombre}
                              name="nombre"
                              style={{ marginBottom: "2px" }}
                            />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-black">
                          <div className="mb-1">
                            <p className="lead fw-normal mb-1">Apellido</p>
                            <div className="p-1 bg-white">
                            <input
                              className="form form-control"
                              onChange={handleInputChange}
                              type="text"
                              value={usuarioDetalles.apellido}
                              name="apellido"
                              style={{ marginBottom: "2px" }}
                            />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-black">
                          <div className="mb-1">
                            <p className="lead fw-normal mb-1">Biografía</p>
                            <div className="p-4 bg-white">
                            <textarea
                              className="form form-control"
                              onChange={handleInputChange}
                              type="text"
                              value={usuarioDetalles.biografia}
                              name="biografia"
                              style={{ marginBottom: "2px" }}
                            />
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-black">
                          <div className="mb-1">
                            <p className="lead fw-normal mb-1">Privacidad del perfil</p>
                            <div className="p-4 bg-white">
                              <select
                                className="form form-control"
                                onChange={handleInputChange}
                                value={usuarioDetalles.privacidad}
                                name="privacidad"
                                style={{ marginBottom: "2px" }}
                              >
                                <option value="publica">Pública</option>
                                <option value="privada">Privada</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            <p>Esperando por detalles de usuario para cargar...</p>
          )}
        </div>
      ) : (
        <div>
          {loSigo === true ? (
            <div className="gradient-custom-2 bg-white min-h-screen">
              <div className="container py-0 h-full">
                <div className="flex justify-center items-center h-full">
                  <div className="lg:w-9/12 xl:w-9/12">
                    <div className="card bg-white rounded-lg">
                      <div className="text-white flex flex-row bg-primary-500 h-[200px]">
                        <div className="ms-4 mt-5 flex flex-col w-[150px] relative">
                          <img
                            src={usuarioDetalles.foto}
                            alt="Placeholder para foto de perfil"
                            className="mt-4 mb-2 img-thumbnail w-[150px] z-10 cursor-pointer"
                            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                          />
                          <button
                            className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                            onClick={btnSiguiendo_onClick}
                          >
                            Siguiendo
                          </button>
                          
                          {loSigo && teHaEnviadoSolicitud && (
                            <button
                              className="btn btn-outline-dark h-9 overflow-visible bg-white w-64 text-black mt-2 p-2 rounded"
                              onClick={btnTeHaEnviadoSolicitud_onClick}
                            >
                              Te ha enviado solicitud
                            </button>
                          )}
                          
                        </div>
                        <div className="ms-3 mt-[130px]">
                          <h5>{usuarioDetalles.nombre} {usuarioDetalles.apellido}</h5>
                          <p>{usuarioDetalles.email}</p>
                        </div>
                      </div>
                      <div className="p-4 text-black bg-white">
                        <div className="flex justify-end text-center py-1">
                          <div>
                            <p className="mb-1 text-2xl">{cantPublicaciones}</p>
                            <p className="small text-muted mb-0">Publicaciones</p>
                          </div>
                          <div className="px-3">
                            <p className="mb-1 text-2xl">{cantSeguidores}</p>
                            <p className="small text-muted mb-0">Seguidores</p>
                          </div>
                          <div>
                            <p className="mb-1 text-2xl">{cantSeguidos}</p>
                            <p 
                              className="small text-muted mb-0 cursor-pointer"
                              onClick={() => setMostrarSiguiendo(true)}
                            >
                              Siguiendo
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 text-black">
                        <div className="mb-5">
                          <p className="lead fw-normal mb-1">Biografía</p>
                          <div className="p-4 bg-white">
                            <p className="mb-1">{usuarioDetalles.biografia}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mb-4">
                        <p 
                          className={`lead fw-normal mb-0 cursor-pointer ${activo === 1 ? 'underline' : 'hover:underline'}`} 
                          onClick={
                            () => setActivo(1)
                          }
                        >
                          Todas las publicaciones
                        </p>
                        <p 
                          className={`lead fw-normal mb-0 cursor-pointer ${activo === 2 ? 'underline' : 'hover:underline'}`} 
                          onClick={
                            () => setActivo(2)
                          }
                        >
                          Mostrar publicaciones compartidas
                        </p>
                        </div>
                        {activo === 1 && (
                          <div className="flex flex-wrap">
                            {publicacionesOrdenadas.map((publicacion) => (
                              <div
                                key={publicacion.id}
                                className="w-1/3 p-1"
                                style={{ width: '300px', height: '300px' }}
                              >
                                {publicacion.fileUrls && publicacion.fileUrls.length > 0 && (
                                  <img
                                    src={publicacion.fileUrls[0]}
                                    alt={`Imagen de la publicación ${publicacion.caption}`}
                                    className="w-full rounded-3 cursor-pointer object-fill"
                                    style={{ width: '100%', height: '100%' }}
                                    onClick={() => {
                                      setAbrirPublicacion(true);
                                      setPublicacion(publicacion);
                                      console.log(publicacion.fecha);
                                    }}
                                  />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        {activo === 2 && (
                          <div className="flex flex-wrap">
                            <p>Acá va la lógica para mapear las publicaciones compartidas basándose en el idUsuario principal que recibe este componente funcional</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : loSigo === false ? (
            privacidad === false ? (
              <div className="gradient-custom-2 bg-white min-h-screen">
                <div className="container py-0 h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="lg:w-9/12 xl:w-9/12">
                      <div className="card bg-white rounded-lg">
                        <div className="text-white flex flex-row bg-primary-500 h-[200px]">
                          <div className="ms-4 mt-5 flex flex-col w-[150px] relative">
                            <img
                              src={usuarioDetalles.foto}
                              alt="Placeholder para foto de perfil"
                              className="mt-4 mb-2 img-thumbnail w-[150px] z-10 cursor-pointer"
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                            />

                            {!loSigo && !teSigue && !hasEnviadoSolicitud && (
                              <button
                                className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                                onClick={btnSeguir_onClick}
                              >
                                Seguir
                              </button>
                            )}

                            {!loSigo && teSigue && !hasEnviadoSolicitud &&(
                              <button
                                className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                                onClick={btnSeguirTambien_onClick}
                              >
                                Seguir también
                              </button>
                            )}

                            {!loSigo && teHaEnviadoSolicitud && (
                              <button
                                className="btn btn-outline-dark h-9 overflow-visible bg-white w-64 text-black mt-2 p-2 rounded"
                                onClick={btnTeHaEnviadoSolicitud_onClick}
                              >
                                Te ha enviado solicitud
                              </button>
                            )}

                            {hasEnviadoSolicitud && (
                              <button
                                className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                                onClick={btnPendiente_onClick}
                              >
                                Pendiente
                              </button>
                            )}
                          
                          </div>
                          <div className="ms-3 mt-[130px]">
                            <h5>{usuarioDetalles.nombre} {usuarioDetalles.apellido}</h5>
                            <p>{usuarioDetalles.email}</p>
                          </div>
                        </div>
                        <div className="p-4 text-black bg-white">
                          <div className="flex justify-end text-center py-1">
                            <div>
                              <p className="mb-1 text-2xl">{cantPublicaciones}</p>
                              <p className="small text-muted mb-0">Publicaciones</p>
                            </div>
                            <div className="px-3">
                              <p className="mb-1 text-2xl">{cantSeguidores}</p>
                              <p className="small text-muted mb-0">Seguidores</p>
                            </div>
                            <div>
                              <p className="mb-1 text-2xl">{cantSeguidos}</p>
                              <p className="small text-muted mb-0">Siguiendo</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-black">
                          <p>Esta cuenta es privada</p>
                          <p>Síguela para ver sus fotos o videos :D</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : privacidad === true ? (
              <div className="gradient-custom-2 bg-white min-h-screen">
                <div className="container py-0 h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="lg:w-9/12 xl:w-9/12">
                      <div className="card bg-white rounded-lg">
                        <div className="text-white flex flex-row bg-primary-500 h-[200px]">
                          <div className="ms-4 mt-5 flex flex-col w-[150px] relative">
                            <img
                              src={usuarioDetalles.foto}
                              alt="Placeholder para foto de perfil"
                              className="mt-4 mb-2 img-thumbnail w-[150px] z-10 cursor-pointer"
                              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                            />
                            {!loSigo && !teSigue && (
                              <button
                                className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                                onClick={btnSeguir_onClick}
                              >
                                  Seguir
                              </button>
                            )}
                            
                            {!loSigo && teSigue && (
                              <button
                                className="btn btn-outline-dark h-9 overflow-visible bg-white text-black mt-2 p-2 rounded"
                                onClick={btnSeguirTambien_onClick}
                              >
                                Seguir también
                              </button>
                            )}

                            {!loSigo && teHaEnviadoSolicitud && (
                              <button
                                className="btn btn-outline-dark h-9 overflow-visible bg-white w-64 text-black mt-2 p-2 rounded"
                                onClick={btnTeHaEnviadoSolicitud_onClick}
                              >
                                Te ha enviado solicitud
                              </button>
                            )}
                          </div>
                          <div className="ms-3 mt-[130px]">
                            <h5>{usuarioDetalles.nombre} {usuarioDetalles.apellido}</h5>
                            <p>{usuarioDetalles.email}</p>
                          </div>
                        </div>
                        <div className="p-4 text-black bg-white">
                          <div className="flex justify-end text-center py-1">
                            <div>
                              <p className="mb-1 text-2xl">{cantPublicaciones}</p>
                              <p className="small text-muted mb-0">Publicaciones</p>
                            </div>
                            <div className="px-3">
                              <p className="mb-1 text-2xl">{cantSeguidores}</p>
                              <p className="small text-muted mb-0">Seguidores</p>
                            </div>
                            <div>
                              <p className="mb-1 text-2xl">{cantSeguidos}</p>
                              <p className="small text-muted mb-0">Siguiendo</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 text-black">
                          <div className="mb-5">
                            <p className="lead fw-normal mb-1">Biografía</p>
                            <div className="p-4 bg-white">
                              <p className="mb-1">{usuarioDetalles.biografia}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center mb-4">
                          <p 
                            className={`lead fw-normal mb-0 cursor-pointer ${activo === 1 ? 'underline' : 'hover:underline'}`} 
                            onClick={
                              () => setActivo(1)
                            }
                          >
                            Todas las publicaciones
                          </p>
                          <p 
                            className={`lead fw-normal mb-0 cursor-pointer ${activo === 2 ? 'underline' : 'hover:underline'}`} 
                            onClick={
                              () => setActivo(2)
                            }
                          >
                            Mostrar publicaciones compartidas
                          </p>
                          </div>
                          {activo === 1 && (
                            <div className="flex flex-wrap">
                              {publicacionesOrdenadas.map((publicacion) => (
                                <div
                                  key={publicacion.id}
                                  className="w-1/3 p-1"
                                  style={{ width: '300px', height: '300px' }}
                                >
                                  {publicacion.fileUrls && publicacion.fileUrls.length > 0 && (
                                    <img
                                      src={publicacion.fileUrls[0]}
                                      alt={`Imagen de la publicación ${publicacion.caption}`}
                                      className="w-full rounded-3 cursor-pointer object-fill"
                                      style={{ width: '100%', height: '100%' }}
                                      onClick={() => {
                                        setAbrirPublicacion(true);
                                        setPublicacion(publicacion);
                                        console.log(publicacion.fecha);
                                      }}
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          {activo === 2 && (
                            <div className="flex flex-wrap">
                              <p>Acá va la lógica para mapear las publicaciones compartidas basándose en el idUsuario principal que recibe este componente funcional</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p>El usuario no es tu amigo y el estado de privacidad es desconocido.</p>
            )
          ) : (
            <p>No se puede determinar el estado de amistad del usuario. / Determinando estado de amistad</p>
          )}
        </div>
      )}
      {mostrarModalFoto && (
        <CambiarFotoPerfilModal
          onCerrar={() => setMostrarModalFoto(false)}
          onSeleccionar={cambiarFotoPerfil}
          onEliminar={eliminarFotoPerfil}
        />
      )}
      {abrirPublicacion && (
        <PublicacionModal
          onCerrar={() => setAbrirPublicacion(false)}
          publicacion={publicacion}
          idUsuario={idUsuarioE}
        />
      )}
      {mostrarModalSolicitudSeguimiento && (
        <InteractuarSolicitudSeguimientoModal
          onCerrar={() => setMostrarModalSolicitudSeguimiento(false)}
          onAceptar={aceptarSolicitud}
          onRechazar={rechazarSolicitud}
        />
      )}
      {mostrarModalPendienteSolicitud && (
        <InteractuarPendienteSolicitudModal
          onCerrar={() => setMostrarModalPendienteSolicitud(false)}
          onAceptar={eliminarSolicitud}
        />
      )}
      {mostrarModalSiguiendo && (
        <InteractuarSiguiendoModal
          onCerrar={() => setMostrarModalSiguiendo(false)}
          onAceptar={dejarDeSeguir}
        />
      )}
      {mostrarSiguiendo && (
        <MostrarSiguiendo
          onCerrar={() => setMostrarSiguiendo(false)}
          idUsuarioE={idUsuarioE}
          obtenerCantSeguidos={() => obtenerCantSeguidos(idUsuarioE)}
        />
      )}
    </div>
  )
}

PerfilCardGeneral.propTypes={
    idUsuarioE: PropTypes.string
}