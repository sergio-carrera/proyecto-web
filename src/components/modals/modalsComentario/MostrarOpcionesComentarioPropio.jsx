import { PropTypes } from "prop-types";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";

export const MostrarOpcionesComentarioPropio = ({obtenerComentarios, onCerrar, comentario}) => {

    const eliminarComentario = async() => {
        const ref = doc(db, "Publicaciones", comentario.idPublicacion, "Comentarios", comentario.id);
        await deleteDoc(ref);
        
        await obtenerComentarios();
        onCerrar();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <div className="flex flex-col items-center">
                    <button 
                        className="text-red mb-4 bg-white" 
                        onClick={eliminarComentario}
                    >
                        Eliminar
                    </button>
                    <div className="border-b border-gray-300 w-full mb-4"></div>  
                    <button 
                        className="text-gray-500 mb-2 bg-white" 
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

MostrarOpcionesComentarioPropio.propTypes = {
    obtenerComentarios: PropTypes.func,
    onCerrar: PropTypes.func,
    comentario: PropTypes.shape({
        fecha: PropTypes.string.isRequired,
        idPublicacion: PropTypes.string.isRequired,
        idUsuario: PropTypes.string.isRequired,
        texto: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired
}
