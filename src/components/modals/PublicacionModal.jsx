import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { MostrarOpcionesPropia } from "./modalsPublicacion/MostrarOpcionesPropia";
import { MostrarOpcionesOtra } from "./modalsPublicacion/MostrarOpcionesOtra";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const PublicacionModal = ({ onCerrar, publicacion }) => {
    const usuario = auth.currentUser;
    const idUsuarioAutenticado = usuario.uid;

    const navigate = useNavigate();

    const handlePerfilClick = (id) => {
        navigate(`/perfil/${id}`);
        onCerrar();
    };

    const [usuarioDetalles, setUsuarioDetalles] = useState(null);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    // Validación del usuario autenticado y el usuario que creó la publicación
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


        if (publicacion.idUsuario === idUsuarioAutenticado) {
            setEsPropia(true);
        } else if (publicacion.idUsuario !== idUsuarioAutenticado) {
            setEsPropia(false);
        } else {
            setEsPropia(null);
        }
       
    }, [publicacion.idUsuario, idUsuarioAutenticado]);

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

                            {esPropia === true && (
                                <button 
                                    className="text-gray-500 hover:bg-gray-100 w-auto" 
                                    onClick={() => setMostrarOpcionesPropia(true)}
                                >
                                    &#8230;
                                </button>
                            )}

                            {esPropia === false && (
                                <button 
                                    className="text-gray-500 hover:bg-gray-100 w-auto" 
                                    onClick={() => setMostrarOpcionesOtra(true)}
                                >
                                    &#8230;
                                </button>
                            )}

                            {esPropia === null && (
                                <button 
                                    className="text-gray-500 hover:bg-gray-100" 
                                    onClick={() => console.log("sss")}
                                >
                                    &#8230;
                                </button>
                            )}
                        </div>
                        <p className="mb-2 text-xs">{publicacion.caption}</p>
                        <p className="text-sm text-gray-400">Ubicación: {publicacion.location}</p>
                        <div className="text-sm text-gray-400">
                            {publicacion.tags.map(tag => `#${tag} `)}
                        </div>
                    </div>

                    {/* Sección de comentarios */}
                    <div className="flex-1 mb-4 overflow-y-auto">
                        <div className="border-t border-gray-300 pt-4">
                            <p className="text-sm text-gray-500">Sección de los comentarios</p>
                        </div>
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
                        ></textarea>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 w-full">
                            Comentar
                        </button>
                    </div>
                </div>
            </div>
            {mostrarOpcionesPropia && (
                <MostrarOpcionesPropia
                    onCerrar={() => setMostrarOpcionesPropia(false)}
                    publicacion={publicacion}
                />
            )}
            {mostrarOpcionesOtra && (
                <MostrarOpcionesOtra
                    onCerrar={() => setMostrarOpcionesOtra(false)}
                />
            )}
        </div>
    )
}

PublicacionModal.propTypes = {
    publicacion: PropTypes.shape({
        caption: PropTypes.string,
        fecha: PropTypes.string,
        fileUrls: PropTypes.arrayOf(PropTypes.string),
        idUsuario: PropTypes.string,
        location: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onCerrar: PropTypes.func
}
