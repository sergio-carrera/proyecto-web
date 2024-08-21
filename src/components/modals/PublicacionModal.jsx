import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { MostrarOpcionesPropia } from "./modalsPublicacion/MostrarOpcionesPropia";
import { MostrarOpcionesOtra } from "./modalsPublicacion/MostrarOpcionesOtra";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { MostrarOpcionesComentarioPropio } from "./modalsComentario/MostrarOpcionesComentarioPropio";

export const PublicacionModal = ({ onCerrar, publicacion, obtenerPublicacionesUsuario, setPublicaciones, setCantPublicaciones }) => {
    const usuario = auth.currentUser;
    const idUsuarioAutenticado = usuario.uid;

    const [comentariosExpandidos, setComentariosExpandidos] = useState({});
    const MAX_CHARACTERS = 100;

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
        } catch (error) {
            console.error("Error al comentar la publicación (comentarPublicacion):", error);
        }
    };

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
                                        : comentario.texto.length > MAX_CHARACTERS
                                        ? `${comentario.texto.slice(0, MAX_CHARACTERS)}...`
                                        : comentario.texto}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    {comentario.fecha}
                                </p>
                                {comentario.texto.length > MAX_CHARACTERS && (
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

                    {/* Botones de me gusta y compartir */}
                    <div className="flex justify-between items-center mb-4">
                        <button className="bg-primary-500 text-white px-4 py-2 rounded-md hover:bg-primary-600">
                            Me gusta
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
    obtenerPublicacionesUsuario: PropTypes.func.isRequired,
    setPublicaciones: PropTypes.func.isRequired,
    setCantPublicaciones: PropTypes.func.isRequired
};
