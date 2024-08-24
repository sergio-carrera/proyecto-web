//MostrarOpcionesOtra.jsx
import { PropTypes } from "prop-types";
import { useState } from "react";
import { db, auth } from "../../../config/firebase"; 
import { addDoc, collection } from "firebase/firestore";

export const MostrarOpcionesOtra = ({ onDenunciar, onCerrar, publicacion }) => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [motivo, setMotivo] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const usuario = auth.currentUser;

    const handleDenunciar = async () => {
        if (!motivo || !descripcion) {
            alert("Por favor, completa todos los campos antes de enviar el reporte.");
            return;
        }

        try {
            const reportarRef = collection(db, `Publicaciones/${publicacion.id}/ReportarPublicacion`);
            await addDoc(reportarRef, {
                motivo,
                descripcion,
                idUsuario: usuario.uid,
                idUsuarioReportado: publicacion.idUsuario,
                idPublicacion: publicacion.id,
                fecha: new Date().toISOString(),
            });

            alert("Reporte enviado exitosamente.");
            handleCerrar();  
        } catch (error) {
            console.error("Error al enviar el reporte: ", error);
            alert("Hubo un error al enviar el reporte. Por favor, intenta nuevamente.");
        }
    };

    const handleCerrar = () => {
        setMostrarFormulario(false);
        setMotivo("");
        setDescripcion("");
        onCerrar();
    };

    const estilos = {
        modal: {
            background: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            width: "400px",
        },
        buttonDenunciar: {
            backgroundColor: "#e3342f",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            marginBottom: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        buttonCancelar: {
            backgroundColor: "#d1c4e9",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        },
        dropdown: {
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            width: "100%",
        },
        textarea: {
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "8px",
            width: "100%",
            minHeight: "100px",
        },
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div style={estilos.modal}>
                <h2 className="text-xl font-semibold mb-4">Reportar Publicación</h2>
                <div className="flex flex-col items-center">
                    {mostrarFormulario ? (
                        <>
                            <select 
                                style={estilos.dropdown}
                                value={motivo} 
                                onChange={(e) => setMotivo(e.target.value)}
                            >
                                <option value="" disabled>Selecciona un motivo</option>
                                <option value="Contenido inapropiado">Contenido inapropiado</option>
                                <option value="Spam">Spam</option>
                                <option value="Acoso">Acoso</option>
                                <option value="Falsificación">Falsificación</option>
                                <option value="Otro">Otro</option>
                            </select>
                            <textarea
                                style={estilos.textarea}
                                placeholder="Describe el motivo de tu reporte"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                            ></textarea>
                            <button 
                                style={estilos.buttonDenunciar} 
                                onClick={handleDenunciar}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#000"}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#e3342f"}
                            >
                                Enviar Reporte
                            </button>
                            <button 
                                style={estilos.buttonCancelar} 
                                onClick={handleCerrar}
                            >
                                Cancelar
                            </button>
                        </>
                    ) : (
                        <>
                            <button 
                                style={estilos.buttonDenunciar} 
                                onClick={() => setMostrarFormulario(true)}
                            >
                                Denunciar
                            </button>
                            <div className="border-b border-gray-300 w-full mb-4"></div>  
                            <button 
                                style={estilos.buttonCancelar} 
                                onClick={handleCerrar}
                            >
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

MostrarOpcionesOtra.propTypes = {
    onDenunciar: PropTypes.func,
    onCerrar: PropTypes.func.isRequired,
    publicacion: PropTypes.shape({
        id: PropTypes.string.isRequired,
        idUsuario: PropTypes.string.isRequired,
    }).isRequired
};
