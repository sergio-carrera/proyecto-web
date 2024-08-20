import { PropTypes } from "prop-types";
import { useState } from "react";
import { EditarPublicacion } from "./EditarPublicacion";
import { auth, db } from "../../../config/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";

export const MostrarOpcionesPropia = ({ onCerrar, onCerrarPublicacion, publicacion, obtenerPublicacionesUsuario, setPublicaciones, setCantPublicaciones }) => {

    const [mostrarEditarPublicacion, setMostrarEditarPublicacion] = useState(false);

    const usuario = auth.currentUser;
    const idUsuario = usuario.uid;

    //Esta función está hecha para poder ser reutilizada
    const borrarSubcoleccion = async (db, idPublicacion, subcoleccion) => {
        const subcoleccionRef = collection(db, "Publicaciones", idPublicacion, subcoleccion);
        const subcoleccionSnapshot = await getDocs(subcoleccionRef);
        const deletePromises = subcoleccionSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
    };

    const eliminarPublicacion = async () => {
        //Para borrar las subcolecciones de la publicacion (esto se puede reutilziar para borrar otras subcolecciones)
        await borrarSubcoleccion(db, publicacion.id, "Comentarios");
        await borrarSubcoleccion(db, publicacion.id, "Reacciones");

        //Para borrar la publicación como tal
        const ref = doc(db, "Publicaciones", publicacion.id);
        await deleteDoc(ref);

        //Actualizar la lista de publicaciones en el perfil (se puede escalar al feed)
        const publicaciones = await obtenerPublicacionesUsuario(idUsuario);
        setPublicaciones(publicaciones);
        setCantPublicaciones(publicaciones.length);

        //Cerrar modales abiertos. onCerrar: cierra "MostrarOpcionesPropia" | onCerrarPublicacion: cierra "PublicacionModal" 
        onCerrar();
        onCerrarPublicacion();
    };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-96">
            <div className="flex flex-col items-center">
                <button 
                    className="text-red mb-4 bg-white"  
                    onClick={eliminarPublicacion}
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
                    className="text-gray-500 mb-2 bg-white" 
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
                obtenerPublicacionesUsuario={obtenerPublicacionesUsuario}
                setPublicaciones={setPublicaciones}
            />
        )}
      </div>
    )
}

MostrarOpcionesPropia.propTypes = {
    onEliminar: PropTypes.func,
    onCerrar: PropTypes.func,
    onCerrarPublicacion: PropTypes.func,
    publicacion: PropTypes.shape({
            caption: PropTypes.string,
            fecha: PropTypes.string,
            fileUrls: PropTypes.arrayOf(PropTypes.string),
            idUsuario: PropTypes.string,
            location: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
            id: PropTypes.string
        }).isRequired,
    obtenerPublicacionesUsuario: PropTypes.func,
    setPublicaciones: PropTypes.func,
    setCantPublicaciones: PropTypes.func
}