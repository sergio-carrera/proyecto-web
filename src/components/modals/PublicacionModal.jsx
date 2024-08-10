import { PropTypes } from "prop-types";
import { useState } from "react";
//import { useState } from "react";

export const PublicacionModal = ({ onCerrar, publicacion, idUsuario}) => {

    //const [validarOrigenPublicacion, setValidarOrigenPublicacion] = useState(false);
    console.log(publicacion);
    console.log(`Id del usuario: ${idUsuario}`);
    
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
                        <button 
                            onClick={prevImage}
                            className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            &#8249;
                        </button>
                        
                        <button 
                            onClick={onCerrar}
                            className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            Cerrar
                        </button>
                        
                        <button 
                            onClick={nextImage}
                            className="text-black bg-gray-200 rounded-full p-2 hover:bg-gray-300"
                        >
                            &#8250;
                        </button>
                        
                    </div>
                </div>

                {/* Sección de detalles y acciones */}
                <div className="w-1/3 p-4 flex flex-col">
                    {/* Detalles y subtítulo */}
                    <div className="mb-4">
                        <p className="mb-2">
                            <span className="font-bold">{publicacion.idUsuario} </span>
                            {publicacion.caption}
                        </p>
                        <p className="text-sm text-gray-400">Ubicación: {publicacion.location}</p>
                        <div className="text-sm text-gray-400">
                            {publicacion.tags.map(tag => `#${tag} `)}
                        </div>
                    </div>

                    {/* Sección de comentarios */}
                    <div className="flex-1 mb-4 overflow-y-auto">
                        <div className="border-t border-gray-300 pt-4">
                            {/* Placeholder for comments */}
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
                            Publicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

PublicacionModal.propTypes= {
    publicacion: PropTypes.shape({
        caption: PropTypes.string,
        fecha: PropTypes.string,
        fileUrls: PropTypes.arrayOf(PropTypes.string),
        idUsuario: PropTypes.string,
        location: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    idUsuario: PropTypes.string,
    onCerrar: PropTypes.func
}