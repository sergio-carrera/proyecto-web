import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { PropTypes } from "prop-types";
import { storage, db } from "../../config/firebase"; 

export const PublicacionFormulario = ({ idUsuario }) => {
    /* 
    Esto es puramente para comprobar el recibimiento correcto de los parámetros del componente
    funcional. 
    Evidentemente, si se está llamando desde el componente de CrearPublicacion, no se va a recibir
    el objeto de la publicación y la acción siempre será "Crear". 
    */
    //console.log("Publicacion:", publicacion);
    //console.log("idUsuario:", idUsuario);

    //Navegamos entre componentes con este hook del paquete del react-router-dom.
    const navigate = useNavigate();

    /*
    Hook para armar el objeto de la publicación con la información recupilada del 
    formulario si es que se va a crear o editar.
    Se pregunta primero si es que existe una publicación para editarla con los
    datos ya cargados en la base de datos. En caso de que no, entonces el objeto
    está vacío para que se pueda ir armando la nueva publicación.
    */
    const [formData, setFormData] = useState({
        caption: "",
        files: [], 
        ubicacion: "",
        tags: "",
        fecha: "",
    });

    /*
    Hook para mostrar luego los errores en las etiquetas (span). Esto es visual, por supuesto
    que pueden editarlo como quieran los de Front-End.
    */
    const [errores, setErrores] = useState({});

    /*
    Hook para asemejar que la publicación está cargando para ser creada o editada.
    */
    const [isLoading, setIsLoading] = useState(false);

    /*
    Función de flecha para ir construyendo el objeto de la publicación con la ayuda del hook de la constante
    de "formData".
    Para entender esta función, es importante saber que "e" es el evento de cambio del formulario que sirve para
    obtener "e.target", el cual es el elemento que disparó dicho evento (el campo en el formulario que cambió).
    */
    const handleChange = (e) => {
        /*
        Se desestructuriza el objeto "e.target" para obtener:
        -El nombre del campo del formulario que cambió. 
        -El valor actual del campo (al menos de los campos que son de texto).
        -La lista de archivos que se seleccionaron (en los campos input que sean de tipo "file").
        */
        const { name, value, files } = e.target;
        /*
        Si el campo que ha cambiado es un input de tipo "file", entonces convierte a los archivo(s)
        en un array para luego actualizar el estado de la publicacion (formData) con los archivos seleccionados.
        */
        if (name === "files") {
            setFormData({
                //Ocupamos hacer "spread(...)" para mantener los valores actuales del objeto "formData".
                ...formData,
                //Solo se actualiza la propiedad "files" del objeto "formData" con los nuevos archivos seleccionados.
                files: Array.from(files), 
            });
        //En caso de que no sea un input de tipo "file" que esté cambiando, entonces:
        } else {
            /*
            Se actualiza la información con la misma lógica de los input "file", solo que se actualiza la propiedad/atributo 
            del objeto con el mismo "name".
            */
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    /*
    Se crear esta función que nos ayuda a validar que los datos de los inputs, textarea, etc. almacenen correctamente la información.
    Esta lógica es puramente visual y la pueden cambiar los de Front-End si es que lo quieren hacer más visual y bonito.
    */
    const validar = () => {
        /*
        Básicamente creamos un objeto que nos ayude a almacenar de manera más organizada todos los tipos de errores por input.
        */
        const nuevosErrores = {};
        /*
        Validamos los campos de texto con base a lo que nos interesa saber (en este caso es solo si es que existe información alguna).
        En caso de que no haya información (probablemente porque el usuario no brindó información alguna), entonces se añade la salida
        del "error" al atributo del objeto vacío inicializado con el nombre "nuevosErrores".
        */
        if (!formData.caption) nuevosErrores.caption = "Se requiere un pie de foto o video";
        if (formData.files.length === 0) nuevosErrores.files = "Se requiere añadir al menos una foto";
        if (!formData.ubicacion) nuevosErrores.ubicacion = "La localización es requerida";
        if (!formData.tags) nuevosErrores.tags = "Los tags son requeridos";
        //Evidentemente ocupamos retornar el objeto para luego montar cada error en su debido apartado visual.
        return nuevosErrores;
    };

    /*
    La función que nos ayuda a recorrer la lógica general del componente funcional.
    Esta función se llama únicamente al activar la propiedad de "onSubmit" en el formulario.
    */
    const handleSubmit = async (e) => {
        e.preventDefault();
        /*
        Lo primero que hacemos es validar cada campo para corresponder la información que queremos en la base de datos.
        Llamamos a la función de "validar()" para que nos devuelva el objeto con todos los errores mapeados en sus atributos
        o propiedades.
        */
        const validacionErrores = validar();
        /*
        Leamos lo que hace ".keys"
        -"Returns the names of the enumerable string properties and methods of an object."
        Básicamente nos devuelve la cantidad numérica de propiedades de un objeto. Por lo que
        si es más de "0", es necesario que acomodemos los errores en el objeto del hook de
        "errores" con "setErrores(validacionErrores)". 
        Lo que estamos haciendo es pasar el objeto montado con base a los errores de las validaciones en el hook
        de errores.
        */
        if (Object.keys(validacionErrores).length > 0) {
            setErrores(validacionErrores);
            /*
            En caso de que haya errores, entonces vamos a sacar al usuario de la lógica para no permitirle continuar con el 
            submit.
            */
            return;
        }
        /*
        Vamos a mostrarle al usuario que el botón de Crear o Editar publicación va a cambiar mientras se ejecuta toda
        la siguiente lógica
        */
        setIsLoading(true);

        try {
            /*
            Esto todavía lo estoy probando para permitir crear y editar correctamente una publicación.
            A modo general, estoy decidiendo que si no había información de los archivos (fotos) entonces
            los estoy ingresando por primera vez en el servicio de "storage" de Firebase para luego obtener
            su URL y guardarla en un arreglo que será usado como atributo para la base de datos y luego obtener
            dichas imágenes más fácil.
            */
            //Estoy creando un arreglo vacío que almacenará las URLs de los archivos para guardarlos posteriormente en la base de datos.            
            const fileUrls = [];
            //Un ciclo que recorre cada archivo individual guardado en el objeto de la publicación del formulario.
            for (const file of formData.files) {
                /*
                Si es de tipo "string", eso quiere decir que se trata de URL(s) de archivos previamente cargados (editar publicación), por lo 
                que para esos archivos no hace falta obtener la URL, y se guardan (push) en el arreglo "fileUrls".
                */
                if (typeof file === "string") {
                    fileUrls.push(file);
                /*
                En caso de que no sean archivos previamente cargados (y por eso no se tenga la URL), entonces se procede a obtener cada URL de cada
                archivo con la siguiente lógica (obviamente primero ocupamos cargar cada archivo a "storage" y luego obtener la URL):
                */
                } else{
                    //Vamos a obtener la referencia de la ruta de "storage" en donde vamos a guardar el archivo.
                    const fileRef = ref(storage, `publicacionesImages/${file.name}`);
                    //Guardamos el archivo en la ruta referenciada.
                    await uploadBytes(fileRef, file);
                    /*
                    Guardamos la URL del archivo previamente guardadado
                    getDownloadURL(ref): "Returns the download URL for the given StorageReference.".
                    */
                    const fileUrl = await getDownloadURL(fileRef);
                    //Se guarda (push) la URL en arreglo "fileUrls".
                    fileUrls.push(fileUrl);
                }
            }
    
            /*
            Es importante obtener la referencia de la colección en donde queremos hacer la transacción (crear o editar) en la
            base de datos.
            */
            const collectionRef = collection(db, "Publicaciones");
            /*
            Acá está el truco para tanto crear o editar una publicación y asignarle un id aleatorio generado por Firebase en caso
            de que se cree una publicación.
            Primero vamos a utilizar el atributo solicitado en el componente funcional para preguntar si realmente nos están pasando una
            publicación "publicacion ? doc(db, "Publicaciones", publicacion.id) : doc(collectionRef)", si es que sí nos pasan una publicación (editar), 
            entonces se procederá a editar la publicación usando el id existente, pero si es que no nos pasan una publicación (crear), entonces 
            se genera un nuevo documento referenciado por un id auto generado.
            */
            const postRef = doc(collectionRef);
            /*
            setDoc: "Writes to the document referred to by this DocumentReference. If the document does not yet exist, it will be created.".
            ...(publicacion && { id: publicacion.id }): En caso de que se esté editando una publicación, entonces se agregará como atributo el
            mismo id de referencia para mantener consistencia y trazabilidad de los datos.
            Ocupamos hacer "spread(...)" para asegurarnos de que el id de la publicación se combine correctamente con el objeto (en este caso, el documento) padre.
            (pueden probar que sin el "spread" no mantiene la estructura correcta)
            */
            await setDoc(postRef, {
                caption: formData.caption,
                fileUrls, 
                location: formData.ubicacion,
                tags: formData.tags.split(",").map(tag => tag.trim()),
                fecha: new Date().toString(),
                idUsuario: idUsuario
            });

            const usuarioBaseRef = doc(db, "Usuarios", idUsuario);
            const usuarioBaseDoc = await getDoc(usuarioBaseRef);

            const { foto, nombre, apellido } = usuarioBaseDoc.data();

            const seguidoresRef = collection(db, `Usuarios/${idUsuario}/Seguidores`);
            const seguidoresSnapshot = await getDocs(seguidoresRef);

            seguidoresSnapshot.forEach(async (seguidorDoc) => {
                const idSeguidor = seguidorDoc.id;
          
                const usuarioSeguidorRef = doc(db, "Usuarios", idSeguidor);
                const usuarioSeguidorDoc = await getDoc(usuarioSeguidorRef);
          
                if (usuarioSeguidorDoc.exists()) {
                  const notificacionRef = doc(collection(db, `Usuarios/${idSeguidor}/NotificacionesPublicaciones`));
                  await setDoc(notificacionRef, {
                    idUsuario: idUsuario,
                    fotoPerfil: foto,  
                    nombre,      
                    apellido,    
                    fotoPublicacion: fileUrls[0],
                    fecha : new Date().toString()
                  });
    
                } else {
                  console.error(`El usuario con ID ${idSeguidor} no existe en la colección "Usuarios"`);
                }
            });

            //Luego de terminar con la transacción en la base de datos, vamos a redireccionar al usuario a su perfil para que pueda ver su nueva publicación.
            navigate(`/perfil/${idUsuario}`);
        } catch (error) {
            //Agarramos todos lo errores que pueda dar esta función.
            console.error("Error al subir la publicación: ", error);
            setErrores({ form: "Error al subir la publicación. Por favor, intenta de nuevo." });
        } finally {
            //Dejamos de mostrar en el botón de Crear/Editar que se está cargando la funcionalidad (pero para ese entonces, el usuario ya estará en el perfil.
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-3xl">
                <div className="flex flex-col">
                    <label className="text-gray-700">Pie de foto o video</label>
                    <textarea
                        name="caption"
                        value={formData.caption}
                        onChange={handleChange}
                        className="border rounded p-2 mt-1"
                    />
                    {errores.caption && <span className="text-red-500">{errores.caption}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700">Agrega fotos</label>
                    <input
                        type="file"
                        name="files"
                        multiple 
                        onChange={handleChange}
                        className="border rounded p-2 mt-1"
                    />
                    {errores.files && <span className="text-red-500">{errores.files}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700">Agrega una localización</label>
                    <input
                        type="text"
                        name="ubicacion"
                        value={formData.ubicacion}
                        onChange={handleChange}
                        className="border rounded p-2 mt-1"
                    />
                    {errores.ubicacion && <span className="text-red-500">{errores.ubicacion}</span>}
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700">Agrega Tags (separados por una coma)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        placeholder="Mochilear, Exploración, Conocer"
                        className="border rounded p-2 mt-1"
                    />
                    {errores.tags && <span className="text-red-500">{errores.tags}</span>}
                </div>

                {errores.form && <span className="text-red-500">{errores.form}</span>}

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-400 text-white rounded">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`px-4 py-2 bg-primary-500 text-white rounded ${isLoading ? 'opacity-50' : ''}`}
                        disabled={isLoading}>
                        {isLoading ? "Cargando..." : `Crear Publicación`}
                    </button>
                </div>
            </form>
        </div>
    )
};

PublicacionFormulario.propTypes = {
    idUsuario: PropTypes.string.isRequired, 
};