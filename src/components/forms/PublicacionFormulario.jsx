import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { PropTypes } from "prop-types";
import { storage, db } from "../../config/firebase"; // Import directly from your firebase.js

export const PublicacionFormulario = ({ post, action, userId }) => {
    console.log("Post:", post);
    console.log("Action:", action);
    console.log("User ID:", userId);
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        caption: post ? post.caption : "",
        files: [], 
        location: post ? post.location : "",
        tags: post ? post.tags.join(",") : "",
    });
    const [errores, setErrores] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "files") {
            setFormData({
                ...formData,
                files: Array.from(files), // Convert FileList to array
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validar = () => {
        const nuevosErrores = {};
        if (!formData.caption) nuevosErrores.caption = "Se requiere un pie de foto o video";
        if (formData.files.length === 0) nuevosErrores.files = "Se requiere añadir al menos una foto";
        if (!formData.location) nuevosErrores.location = "La localización es requerida";
        if (!formData.tags) nuevosErrores.tags = "Los tags son requeridos";
        console.log("Errores de validación:", nuevosErrores);
        return nuevosErrores;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validacionErrores = validar();
        if (Object.keys(validacionErrores).length > 0) {
            setErrores(validacionErrores);
            return;
        }
        setIsLoading(true);
    
        try {
            const fileUrls = [];
            for (const file of formData.files) {
                const fileRef = ref(storage, `publicacionesImages/${file.name}`);
                console.log("Subiendo archivo a la ruta:", fileRef.fullPath);
                await uploadBytes(fileRef, file);
                const fileUrl = await getDownloadURL(fileRef);
                fileUrls.push(fileUrl);
                console.log("File URL:", fileUrl);
            }
    
            const postRef = doc(db, "Publicaciones", post ? post.id : new Date().toISOString());
            console.log("Salvando la publicación en Firestore con el ID:", postRef.id);
            await setDoc(postRef, {
                caption: formData.caption,
                fileUrls, 
                location: formData.location,
                tags: formData.tags.split(",").map(tag => tag.trim()),
                userId,
                ...(post && { id: post.id }) // Update existing post
            });
    
            navigate("/perfil");
        } catch (error) {
            console.error("Error al subir la publicación: ", error);
            setErrores({ form: "Error al subir la publicación. Por favor, intenta de nuevo." });
        } finally {
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
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="border rounded p-2 mt-1"
                    />
                    {errores.location && <span className="text-red-500">{errores.location}</span>}
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
                        {isLoading ? "Loading..." : `${action} Publicación`}
                    </button>
                </div>
            </form>
        </div>
    );
};

PublicacionFormulario.propTypes = {
    post: PropTypes.shape({
        caption: PropTypes.string,
        location: PropTypes.string,
        tags: PropTypes.arrayOf(PropTypes.string),
        fileUrls: PropTypes.arrayOf(PropTypes.string), 
        id: PropTypes.string,
    }),
    action: PropTypes.oneOf(["Crear", "Actualizar"]).isRequired,
    userId: PropTypes.string.isRequired, 
};
