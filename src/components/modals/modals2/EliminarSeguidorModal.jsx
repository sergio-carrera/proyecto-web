import PropTypes from "prop-types";

export const EliminarSeguidorModal = ({ onCerrar, onAceptar, usuarioSeleccionado }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                <img 
                    src={usuarioSeleccionado.foto} 
                    alt="Foto de perfil" 
                    className="w-20 h-20 rounded-full mx-auto mb-4" 
                />
                <h2 className="text-black text-sm mb-4">
                    ¿Eliminar seguidor? Mochimap no informará a <span className="font-bold">{usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}</span> de que ya no forma parte de tus seguidores.
                </h2>
                <div className="border-t border-gray-700 w-full mb-4"></div>
                <div className="flex flex-col items-center">
                    <button 
                        className="text-red font-bold mb-4" 
                        onClick={onAceptar}
                    >
                        Eliminar
                    </button>
                    <button 
                        className="text-gray-500" 
                        onClick={onCerrar}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

EliminarSeguidorModal.propTypes = {
    onCerrar: PropTypes.func.isRequired,
    onAceptar: PropTypes.func.isRequired,
    usuarioSeleccionado: PropTypes.shape({
        foto: PropTypes.string.isRequired,
        nombre: PropTypes.string.isRequired,
        apellido: PropTypes.string.isRequired,
    }).isRequired,
};