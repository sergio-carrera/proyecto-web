import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { MostrarOpcionesPropia } from "./modalsPublicacion/MostrarOpcionesPropia";
import { MostrarOpcionesOtra } from "./modalsPublicacion/MostrarOpcionesOtra";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { MostrarOpcionesComentarioPropio } from "./modalsComentario/MostrarOpcionesComentarioPropio";
import Swal from "sweetalert2";
import { onFindById } from "../../config/Api";

export const PublicacionModal = ({ onCerrar, publicacion, obtenerPublicacionesUsuario, setPublicaciones, setCantPublicaciones, actualizarCantidadLikes, actualizarCantidadComentarios }) => {
    const usuario = auth.currentUser;
    const idUsuarioAutenticado = usuario.uid;

    const [comentariosExpandidos, setComentariosExpandidos] = useState({});
    const MAX_CARACTERES = 100;

    const toggleExpansion = (id) => {
        setComentariosExpandidos((prev) => ({
          ...prev,
          [id]: !prev[id], 
        }));
    };
    
    const navigate = useNavigate();

    const handlePerfilClick = (id) => {
        navigate(`/perfil/${id}`);
        onCerrar();
    };

    const [usuarioDetalles, setUsuarioDetalles] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [comentarios, setComentarios] = useState([]);
    const [comentarioParaComentar, setComentarioParaComentar] = useState("");
    const [comentarioSeleccionado, setComentarioSeleccionado] = useState("");
    const [mostrarOpcionesComentarioPropio, setMostrarOpcionesComentarioPropio] = useState(false);
    const [esPropia, setEsPropia] = useState(null);
    const [mostrarOpcionesPropia, setMostrarOpcionesPropia] = useState(false);
    const [mostrarOpcionesOtra, setMostrarOpcionesOtra] = useState(false);

    // mostrar cantidad de likes 
    const [cantidadLikes, setCantidadLikes] = useState(0)

    useEffect(() => {
        const obtenerDetallesUsuario = async (id) => {
            try {
                const docRef = doc(db, "Usuarios", id);
                const docSnap = await getDoc(docRef);
                return docSnap.exists() ? docSnap.data() : null;
            } catch (error) {
                console.error("Error al obtener detalles del usuario (obtenerDetallesUsuario): ", error);
                return null;
            }
        };
    
        const cargarDetalles = async () => {
            const detalles = await obtenerDetallesUsuario(publicacion.idUsuario);
            if (detalles) {
                setUsuarioDetalles(detalles);
            } else {
                console.error("No se encontraron detalles del usuario.");
            }
        };
        cargarDetalles();
        obtenerComentarios();
        obtenerCantidadLikes(publicacion.id);
        validarLikePrevio();

        if (publicacion.idUsuario === idUsuarioAutenticado) {
            setEsPropia(true);
        } else {
            setEsPropia(false);
        }
       
    }, [publicacion.idUsuario, idUsuarioAutenticado]);

    const obtenerComentarios = async () => {
        try {
            const comentariosRef = collection(db, `Publicaciones/${publicacion.id}/Comentarios`);
            const q = query(comentariosRef, orderBy("fecha", "asc"));
            const querySnapshot = await getDocs(q);
            const comentariosObtenidos = await Promise.all(
                querySnapshot.docs.map(async (docSnap) => {
                    const comentarioData = docSnap.data();
                    const usuarioRef = doc(db, "Usuarios", comentarioData.idUsuario);
                    const usuarioSnapshot = await getDoc(usuarioRef);
                    const usuarioData = usuarioSnapshot.data();

                    return {
                        id: docSnap.id,
                        ...comentarioData,
                        usuario: {
                            id: usuarioSnapshot.id,
                            foto: usuarioData.foto,
                            nombre: usuarioData.nombre,
                            apellido: usuarioData.apellido,
                        },
                    };
                })
            );
            setComentarios(comentariosObtenidos);
        } catch (error) {
            console.error("Error al obtener comentarios:", error);
        }
    };

    const comentarPublicacion = async () => {
        try {
            if (!comentarioParaComentar.trim()) {
                return;
            }
            const comentariosRef = collection(db, `Publicaciones/${publicacion.id}/Comentarios`);
            await addDoc(comentariosRef, {
                texto: comentarioParaComentar,
                fecha: new Date().toString(),
                idUsuario: idUsuarioAutenticado, 
                idPublicacion: publicacion.id
            });
            if (!esPropia) {
                const usuarioBaseRef = doc(db, "Usuarios", idUsuarioAutenticado);
                const usuarioBaseDoc = await getDoc(usuarioBaseRef);
                const { foto, nombre, apellido } = usuarioBaseDoc.data();
                const notificacionRef = doc(collection(db, `Usuarios/${publicacion.idUsuario}/NotificacionesComentarios`));
                await setDoc(notificacionRef, {
                    idUsuario: idUsuarioAutenticado,
                    fotoPerfil: foto,  
                    nombre,      
                    apellido,    
                    fotoPublicacion: publicacion.fileUrls[0],
                    fecha : new Date().toString()
                });     
            } 
            setComentarioParaComentar(""); 
            obtenerComentarios();

            if (location.pathname==="/inicio"){
                //two way binding desde Home
                actualizarCantidadComentarios(publicacion.id);
                
            }

        } catch (error) {
            console.error("Error al comentar la publicación (comentarPublicacion):", error);
        }
    };



    //--------------------------------- Likes -------------------------------------- 

    //Validart si ya di like 

    const [likePrevio, setLikePrevio] = useState(false)

    const validarLikePrevio =async ()=>{
        // Chequear si ya le di like a una publicacin 

        const likesCollectionRef = collection(db, 'Publicaciones', publicacion.id, 'Likes');
        const q = query(likesCollectionRef, where('idUsuario', '==', idUsuarioAutenticado));
        const querySnapshot = await getDocs(q);

        

        if (querySnapshot.size>0) {
            setLikePrevio(true)
        }else{
            setLikePrevio(false)
        }
    }
    
    // location que se necesita para validar el two way binding ya que en perfil no se debe hacer 
    const location = useLocation();

    // Dar like
  const reaccionar= async ({target})=>{

    // agregar like
    const likeRef = collection(db, `Publicaciones/${target.dataset.id}/Likes`);
    await addDoc(likeRef, {
      idUsuario: idUsuarioAutenticado,
      fecha: new Date().toString(),
    });
    Swal.fire("haz dado like")
    obtenerCantidadLikes(publicacion.id)
    validarLikePrevio();

    if (location.pathname==="/inicio"){
    //two way binding desde Home
    actualizarCantidadLikes(publicacion.id, true)
    
    }
 
  }

  //quitar like
  const quitarReaccionar = async ({target})=>{
    try {
      // Eliminar 
    const likeRef = collection(db, `Publicaciones/${target.dataset.id}/Likes`);
    const q = query(likeRef, where('idUsuario', '==', idUsuarioAutenticado));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
    

      const likeDoc = querySnapshot.docs[0];
      await deleteDoc(doc(db, 'Publicaciones', target.dataset.id, 'Likes', likeDoc.id));

      Swal.fire("Like quitado correctamente.");
      obtenerCantidadLikes(publicacion.id)
        validarLikePrevio();

     if (location.pathname==="/inicio"){
        //two way binding desde Home
        actualizarCantidadLikes(publicacion.id, false)
        
    }
     
    } 

    } catch (error) {
      console.log('error al eliminar')
    }
  }


  // Actualizar cantidad de likes 
  async function obtenerCantidadLikes(postId) {
    try {
      const likesRef = collection(db, `Publicaciones/${postId}/Likes`);
      const querySnapshot = await getDocs(query(likesRef, limit(1)));
      
      if (querySnapshot.empty) {
        setCantidadLikes(0);
      } else {
        const totalDocsSnapshot = await getDocs(likesRef);
        setCantidadLikes(totalDocsSnapshot.size);
      }
    } catch (error) {
      console.error("Error fetching likes:", error);
      setCantidadLikes(0);
    }
  }


  //-------------------------- MODAL likes 

  //modal para ver las personas que han dado like 
const [likesModalOpen, setLikesModalOpen] = useState(false);
const [likesUsuarios, setLikesUsuarios] = useState([]);

// mostrar modal con cantidad de likes
const mostrarLikes = async (postId) => {
    try {
      const likesRef = collection(db, `Publicaciones/${postId}/Likes`);
      const querySnapshot = await getDocs(likesRef);
      const usuarios = querySnapshot.docs.map((doc) => doc.data().idUsuario);
  
      
      const listaAux = await Promise.all(
        usuarios.map(async (element) => {
          const val = await onFindById('Usuarios', element);
          
          return {
            nombre: val.data().nombre +" "+ val.data().apellido, 
            foto: val.data().foto
          }
        })
      );
  
      setLikesUsuarios(listaAux);
      setLikesModalOpen(true);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };


  //-----------------------------------------------------------------------

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex + 1) % publicacion.fileUrls.length
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            (prevIndex - 1 + publicacion.fileUrls.length) % publicacion.fileUrls.length
        );
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-6xl mx-4 flex relative" style={{ height: '800px' }}>
                
                {/* Sección de imagen */}
                <div className="w-2/3 relative flex flex-col">
                    <div className="img-co" style={{ width: '100%', height: '700px', background: 'white' }}>
                        <img 
                            src={publicacion.fileUrls[currentImageIndex]} 
                            alt={`Imagen ${currentImageIndex + 1}`} 
                            className="w-full h-full object-contain" 
                        />
                    </div>

                {/* Botones del carrusel debajo de la imagen */}       
                <div className="flex justify-between p-4 absolute bottom-4 w-full">
                    {publicacion.fileUrls.length > 1 && (
                        <button 
                            onClick={prevImage}
                            className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            &#8249;
                        </button>
                    )}
                        <button 
                            onClick={onCerrar}
                            className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            Cerrar
                        </button>
                    {publicacion.fileUrls.length > 1 && (
                        <button 
                            onClick={nextImage}
                            className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            &#8250;
                        </button>
                    )}
                    </div>
                </div>

                {/* Sección de detalles y acciones */}
                <div className="w-1/3 p-4 flex flex-col">
                    
                    {/* Detalles y subtítulo */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            {usuarioDetalles ? (
                                <div className="flex items-center space-x-3 mb-2">
                                    <img
                                        src={usuarioDetalles.foto}
                                        alt={usuarioDetalles.nombre}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <span 
                                            className="text-xs font-medium cursor-pointer"
                                            onClick={() => handlePerfilClick(publicacion.idUsuario)}
                                        >
                                            {usuarioDetalles.nombre} {usuarioDetalles.apellido}
                                        </span>
                                        
                                    </div>
                                </div>
                            ) : (
                                <p>Cargando detalles del usuario...</p>
                            )}

                            {esPropia && (
                                <button 
                                    className="text-gray-500 hover:bg-gray-100 w-auto" 
                                    onClick={() => setMostrarOpcionesPropia(true)}
                                >
                                    &#8230;
                                </button>
                            )}

                            {!esPropia && (
                                <button 
                                    className="text-gray-500 hover:bg-gray-100 w-auto" 
                                    onClick={() => setMostrarOpcionesOtra(true)}
                                >
                                    &#8230;
                                </button>
                            )}
                        </div>
                        <span className="break-all mb-2 text-xs">
                            {publicacion.caption}
                        </span>
                        
                        <p className="text-sm text-gray-400">{publicacion.fecha}</p>
                        <p className="text-sm text-gray-400">Ubicación: {publicacion.location}</p>
                        <div className="text-sm text-gray-400">
                            {publicacion.tags.map(tag => `#${tag} `)}
                        </div>
                    </div>
                    

                    <div className="flex-grow overflow-y-auto">
                    {comentarios.length > 0 ? (
                        comentarios.map((comentario) => (
                        <div key={comentario.id} className="mb-4 relative">
                            <div className="flex items-start space-x-2">
                            <img
                                src={comentario.usuario.foto}
                                alt={`${comentario.usuario.nombre}`}
                                className="w-8 h-8 rounded-full"
                            />
                            <div className="max-w-full">
                                <div className="text-sm flex flex-col">
                                    <span 
                                        className="font-bold mr-1 cursor-pointer"
                                        onClick={() => handlePerfilClick(comentario.usuario.id)}
                                    >
                                        {comentario.usuario.nombre} {comentario.usuario.apellido}
                                    </span>
                                    {comentario.idUsuario === idUsuarioAutenticado && (
                                        <button 
                                            className="absolute top-0 right-0 text-gray-500 hover:bg-gray-300 w-auto"
                                            onClick={() => {
                                                setComentarioSeleccionado(comentario);
                                                setMostrarOpcionesComentarioPropio(true);
                                            }}
                                        >
                                            &#8230;
                                        </button>
                                    )}
                                    <span className="break-all">
                                        {comentariosExpandidos[comentario.id]
                                        ? comentario.texto
                                        : comentario.texto.length > MAX_CARACTERES
                                        ? `${comentario.texto.slice(0, MAX_CARACTERES)}...`
                                        : comentario.texto}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {comentario.fecha}
                                </p>
                                {comentario.texto.length > MAX_CARACTERES && (
                                    <button
                                        className="text-blue-500 text-xs bg-white w-1/1 items-center"
                                        onClick={() => toggleExpansion(comentario.id)}
                                    >
                                        {comentariosExpandidos[comentario.id] ? "Ver menos" : "Ver más"}
                                    </button>
                                )}
                            </div>
                            </div>
                        </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">Sé el primero en comentar</p>
                    )}
                    </div>


                    <div className="mb-2" style={{color:'#a4a4a4', fontSize:'15px'}}>
                        
                        <span onClick={()=>mostrarLikes(publicacion.id)}>Cantidad de me gusta: {cantidadLikes}</span>
                    </div>


                    {/* Botones de me gusta y compartir */}
                    <div className="flex justify-between items-center mb-4">
                        <button style={likePrevio==true?{backgroundColor:'red'}:{}} data-id={publicacion.id} onClick={likePrevio==true?quitarReaccionar:reaccionar} className="mr-2 bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600" >
                            {likePrevio==true?'Deshacer me gusta':'Me gusta'}
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                            Compartir
                        </button>
                    </div>

                    {/* Área para escribir un comentario */}
                    <div>
                        <textarea 
                            className="w-full border border-gray-300 rounded-md p-2" 
                            placeholder="Añade un comentario..."
                            rows="2"
                            value={comentarioParaComentar}
                            onChange={(e) => setComentarioParaComentar(e.target.value)}
                        ></textarea>
                        <button 
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 w-full"
                            onClick={comentarPublicacion}
                        >
                            Publicar
                        </button>
                    </div>

                    {/* Modal Opciones Publicacion Propia */}
                    {mostrarOpcionesComentarioPropio && (
                        <MostrarOpcionesComentarioPropio
                            obtenerComentarios={obtenerComentarios}
                            onCerrar={() => setMostrarOpcionesComentarioPropio(false)}
                            comentario={comentarioSeleccionado}
                            actualizarCantidadComentarios={actualizarCantidadComentarios}
                        />
                    )}

                    {/* Modal Opciones Publicacion Propia */}
                    {mostrarOpcionesPropia && (
                        <MostrarOpcionesPropia
                            onCerrar={() => setMostrarOpcionesPropia(false)}
                            publicacion={publicacion}
                            obtenerPublicacionesUsuario={obtenerPublicacionesUsuario}
                            setPublicaciones={setPublicaciones}
                            onCerrarPublicacion={onCerrar}
                            setCantPublicaciones={setCantPublicaciones}
                        />
                    )}

                    {/* Modal Opciones Publicacion Otra */}
                    {mostrarOpcionesOtra && (
                        <MostrarOpcionesOtra
                            onCerrar={() => setMostrarOpcionesOtra(false)}
                            publicacion={publicacion}
                        />
                    )}

                    {likesModalOpen && (
                            <div style={modalStyles.overlay}>
                            <div style={modalStyles.modal}>
                                <div style={modalStyles.modalHeader}>
                                <h2 style={{fontWeight:'bold'}}>Usuarios que dieron me gusta</h2>
                            
                                </div>
                                <div style={modalStyles.modalBody}>
                                {likesUsuarios.length > 0 ? (
                                    <ul>
                                    {likesUsuarios.map((usuario, index) => (
                                        <li key={index} className="mb-3">
                                        <img src={usuario.foto} className="mr-3" style={{width:'20px', height:'20px', display:'inline'}}></img>
                                        {usuario.nombre}
                                        
                                        <br />
                                        </li>
                                    ))}
                                    </ul>
                                ) : (
                                    <p>No hay me gusta en esta publicación.</p>
                                )
                                
                                }
                                <br />
                                <button onClick={() =>{ setLikesModalOpen(false);}}>Cerrar</button>
                                </div>
                            </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
};

PublicacionModal.propTypes = {
    onCerrar: PropTypes.func.isRequired,
    publicacion: PropTypes.shape({
        id: PropTypes.string.isRequired,
        idUsuario: PropTypes.string.isRequired,
        fileUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
        caption: PropTypes.string.isRequired,
        fecha: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        location: PropTypes.string
    }).isRequired,
    obtenerPublicacionesUsuario: PropTypes.func,
    setPublicaciones: PropTypes.func,
    setCantPublicaciones: PropTypes.func,
    actualizarCantidadLikes: PropTypes.func,
    actualizarCantidadComentarios: PropTypes.func
};



//Estilos modal de likes
const modalStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "400px",
      maxHeight: "80%",
      overflowY: "auto",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    modalBody: {
      marginTop: "10px",
    },
  };