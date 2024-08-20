import { doc, getDoc, updateDoc } from "firebase/firestore";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { db } from "../../../config/firebase";

export const EditarPublicacion = ({publicacion, onCerrar}) => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [usuarioDetalles, setUsuarioDetalles] = useState(null);

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

    const eliminarImagen = (index) => {
        if (formData.files.length > 1) { 
            const newFiles = formData.files.filter((_, i) => i !== index);
            setFormData({ ...formData, files: newFiles });
            if (currentImageIndex >= newFiles.length) {
                setCurrentImageIndex(newFiles.length - 1);
            }
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'No se puede eliminar',
                text: 'Debe haber al menos una imagen.',
                confirmButtonText: 'Entendido'
            });
        }
    };

    /*
    Actualizar la información de todas las pantallas
    */

    const onEditar = async () => {
        try {
            const publicacionRef = doc(db, "Publicaciones", publicacion.id); 
            await updateDoc(publicacionRef, {
                caption: formData.caption,
                fileUrls: formData.files,
                location: formData.location,
                tags: formData.tags.split(",").map(tag => tag.trim()), 
                fecha: formData.fecha,
                idUsuario: formData.idUsuario
            });
            Swal.fire({
                icon: 'success',
                title: 'Edición guardada',
                text: 'La información ha sido actualizada correctamente.',
                confirmButtonText: 'OK'
            });
            onCerrar(); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al guardar',
                text: 'Ocurrió un error al intentar guardar los cambios.',
                confirmButtonText: 'OK'
            });
            console.error("Error al actualizar el documento: ", error);
        }
    };

    const [formData, setFormData] = useState({
        caption: publicacion ? publicacion.caption : "",
        files: publicacion ? publicacion.fileUrls : [], 
        location: publicacion ? publicacion.location : "",
        tags: publicacion ? publicacion.tags.join(",") : "",
        fecha: publicacion ? publicacion.fecha : "",
        idUsuario: publicacion ? publicacion.idUsuario : "",
    });

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
    }, [])
    

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div className="bg-white text-black rounded-lg shadow-lg w-full max-w-6xl mx-4 flex flex-col relative" style={{ height: '800px' }}>
                
                {/* Barra superior */}
                <div className="flex justify-between items-center px-4 py-2 bg-white text-black">
                    <button 
                        onClick={onCerrar} // Este botón cierra el modal
                        className="text-gray-600 bg-white rounded-full w-auto"
                    >
                        Cancelar
                    </button>
                    <span className="text-lg">Editar información</span> {/* Título */}
                    <button 
                        onClick={onEditar} 
                        className="text-blue-600 bg-white rounded-full w-auto"
                    >
                        Listo
                    </button>
                </div>
    
                {/* Contenedor principal */}
                <div className="flex w-full h-full">
                    {/* Sección de imagen */}
                    <div className="w-2/3 relative flex flex-col">
                        <div className="img-co" style={{ width: '100%', height: '700px', background: 'white' }}>
                            <img 
                                src={formData.files[currentImageIndex]} 
                                alt={`Imagen ${currentImageIndex + 1}`} 
                                className="w-full h-full object-contain" 
                            />
                            <button
                                onClick={() => eliminarImagen(currentImageIndex)}
                                className="absolute top-4 right-5 text-white p-2 rounded-full bg-gray-600 w-auto hover:bg-slate-700"
                            >
                                &#128465;
                            </button>
                        </div>
    
                        {/* Botones del carrusel debajo de la imagen */}       
                        <div className="flex justify-between p-4 absolute bottom-4 w-full">
                            {formData.files.length > 1 && (
                                <button 
                                    onClick={prevImage}
                                    className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                                >
                                    &#8249;
                                </button>
                            )}
                            {formData.files.length > 1 && (
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
                            {usuarioDetalles ? (
                                <div className="flex items-center space-x-3 mb-2">
                                    <img
                                        src={usuarioDetalles.foto}
                                        alt={usuarioDetalles.nombre}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="flex flex-col">
                                        <span 
                                            className="text-xs font-medium cursor-text"
                                        >
                                            {usuarioDetalles.nombre} {usuarioDetalles.apellido}
                                        </span>
                                        
                                    </div>
                                </div>
                            ) : (
                                <p>Cargando detalles del usuario...</p>
                            )}
                            <textarea
                                value={formData.caption}
                                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                className="mb-3 text-xs w-full border rounded p-1"
                            />
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="text-sm text-gray-400 w-full border rounded p-2 mb-4"
                                placeholder="Ubicación"
                            />
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="text-sm text-gray-400 w-full border rounded p-2"
                                placeholder="Tags"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}

EditarPublicacion.propTypes = {
    publicacion: PropTypes.shape({
        caption: PropTypes.string,
        fecha: PropTypes.string,
        fileUrls: PropTypes.arrayOf(PropTypes.string),
        idUsuario: PropTypes.string,
        location: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        id: PropTypes.string
    }).isRequired,
    onCerrar: PropTypes.func
}
