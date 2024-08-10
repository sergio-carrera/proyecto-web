import { PropTypes } from "prop-types";

export const CambiarFotoPerfilModal = ({ onCerrar, onSeleccionar, onEliminar }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <h2 className="text-xl font-bold mb-4">Cambiar foto del perfil</h2>
                <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                        <span className="text-blue-500 cursor-pointer">Subir foto</span>
                        <input 
                            type="file" 
                            name="foto_perfil" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            onChange={onSeleccionar} 
                        />
                    </div>
                    <div className="border-b border-gray-300 w-full mb-4"></div>
                    <button 
                        className="text-red mb-4" 
                        onClick={onEliminar}
                    >
                        Eliminar foto actual
                    </button>
                    <div className="border-b border-gray-300 w-full mb-4"></div>
                    <button 
                        className="text-gray-500" 
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

CambiarFotoPerfilModal.propTypes = {
    onCerrar: PropTypes.func.isRequired,
    onSeleccionar: PropTypes.func.isRequired,
    onEliminar: PropTypes.func.isRequired,
};
