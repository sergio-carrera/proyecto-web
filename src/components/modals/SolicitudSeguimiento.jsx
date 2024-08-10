import { PropTypes } from "prop-types";

export const SolicitudSeguimiento = ({ onCerrar, onAceptar, onRechazar }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
                <h2 className="text-xl font-bold mb-4">¿Aceptar solicitud de seguimiento?</h2>
                <div className="flex flex-col items-center">
                    <div className="border-b border-gray-300 w-full mb-4"></div>
                        <button 
                            className="text-green-500 mb-4" 
                            onClick={onAceptar}
                        >
                            Aceptar
                    </button>
                    <div className="border-b border-gray-300 w-full mb-4"></div>
                        <button 
                            className="text-red mb-4" 
                            onClick={onRechazar}
                        >
                            Rechazar
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

SolicitudSeguimiento.propTypes = {
    onCerrar: PropTypes.func.isRequired,
    onAceptar: PropTypes.func.isRequired,
    onRechazar: PropTypes.func.isRequired,
};


