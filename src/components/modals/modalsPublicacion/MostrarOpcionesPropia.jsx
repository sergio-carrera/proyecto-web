import { PropTypes } from "prop-types";
import { useState } from "react";
import { EditarPublicacion } from "./EditarPublicacion";

export const MostrarOpcionesPropia = ({onEliminar, onCerrar, publicacion}) => {

    const [mostrarEditarPublicacion, setMostrarEditarPublicacion] = useState(false);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <div className="flex flex-col items-center">
                <button 
                    className="text-red mb-4 bg-white"  
                    onClick={onEliminar}
                >
                    Eliminar
                </button>
                <div className="border-b border-gray-300 w-full mb-4"></div>
                <button 
                    className="text-gray-500 mb-4 bg-white" 
                    onClick={() => setMostrarEditarPublicacion(true)}
                >
                    Editar
                </button>
                <div className="border-b border-gray-300 w-full mb-4"></div>  
                <button 
                    className="text-gray-500 mb-4 bg-white" 
                    onClick={onCerrar}
                >
                    Cancelar
                </button>
            </div>
        </div>
        {mostrarEditarPublicacion && (
            <EditarPublicacion
                publicacion={publicacion}
                onCerrar={() => setMostrarEditarPublicacion((false))}
            />
        )}
      </div>
    )
}

MostrarOpcionesPropia.propTypes = {
  onEliminar: PropTypes.func,
  onCerrar: PropTypes.func,
  publicacion: PropTypes.shape({
        caption: PropTypes.string,
        fecha: PropTypes.string,
        fileUrls: PropTypes.arrayOf(PropTypes.string),
        idUsuario: PropTypes.string,
        location: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired
}