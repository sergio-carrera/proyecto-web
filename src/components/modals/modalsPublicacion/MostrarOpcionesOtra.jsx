import { PropTypes } from "prop-types";

export const MostrarOpcionesOtra = ({onDenunciar, onCerrar}) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <div className="flex flex-col items-center">
                <button 
                    className="text-red mb-4" 
                    onClick={onDenunciar}
                >
                    Denunciar
                </button>
                <div className="border-b border-gray-300 w-full mb-4"></div>  
                <button 
                    className="text-gray-500 mb-4 " 
                    onClick={onCerrar}
                >
                    Cancelar
                </button>
            </div>
        </div>
      </div>
    )
}

MostrarOpcionesOtra.propTypes = {
  onDenunciar: PropTypes.func,
  onCerrar: PropTypes.func
}
