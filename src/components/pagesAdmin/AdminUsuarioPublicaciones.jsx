import { useEffect, useState } from "react";
import { onDelete, onFindById } from "../../config/Api";
import Swal from "sweetalert2";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { PropTypes } from "prop-types";
import { useParams } from "react-router-dom";

export const AdminUsuarioPublicaciones = () => {

    const [showModal, setShowModal] = useState(false); 
    const [selectedData, setSelectedData] = useState(null);

    const handleViewClick = (documento) => {
        setSelectedData(documento);  // Updated to pass the correct data
        setShowModal(true);  
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedData(null);
    };

    const collectionString = 'Publicaciones';

    const [lstPublicaciones, setLstPublicaciones] = useState([]);

    const { id } = useParams();

    const [datos, setDatos] = useState({})

    const getDatosUser = async () =>{
        const datosAux = await onFindById('Usuarios',id)

        setDatos(datosAux)

        
    }

    const onGetPublicaciones = async () => {
        const publicacionesRef = collection(db, "Publicaciones");
        const q = query(publicacionesRef, where("idUsuario", "==", id));

        const querySnapshot = await getDocs(q);

        const publicaciones = [];
        querySnapshot.forEach((doc) => {
            publicaciones.push({ id: doc.id, ...doc.data() });
        });

        setLstPublicaciones(publicaciones);
    };

    const borrarPublicacion = ({ target }) => {
        Swal.fire({
            title: "Seguro que deseas borrar la publicacion?",
            text: "No podras recuperar la publicacion",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await onDelete(collectionString, target.dataset.id);
                Swal.fire({
                    title: "Eliminada!",
                    text: "Publicacion eliminada",
                    icon: "success"
                });
                onGetPublicaciones();
            }
        });
    };

    useEffect(() => {
        getDatosUser();
        onGetPublicaciones();
        
    }, []);

    return (
        <>

            
            {lstPublicaciones.length === 0 ? (
                <div style={styles.container}>
               
                <img 
                  src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/logoredondo.jpg?alt=media&token=bc5ff39d-8022-4597-aa2a-511b58221f83" 
                  alt="Logo" 
                  style={styles.image} 
                />
                <h1 style={styles.title}>Este usuario aún no tiene publicaciones</h1>
                <p style={styles.paragraph}></p>
              </div>
            ) : (
                <>
                    <h5 className="text-center my-4" style={{fontWeight:"bold"}}>Publicaciones de: {datos.data().nombre + " " + datos.data().apellido}</h5>
                    <h5 className="text-center mb-4 " style={{fontWeight:"bold"}}>Email: {datos.data().email}</h5>
                    <hr />

<table className="table table-bordered">
    <thead className="table-light">
        <tr style={{textAlign:"center"}} >
            <th>Descripción</th>
            <th>Fecha</th>
            <th>Ubicación</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
        {lstPublicaciones.map((documento) => (
            <tr style={{textAlign:"center"}} key={documento.id}>
                <td>{documento.caption}</td>
                <td>{documento.fecha}</td>
                <td>{documento.location}</td>
                <td>
                    <button
                        className="btn btn-light text-dark border rounded-pill px-4 py-2 m-1"
                        style={{ backgroundColor: '#fcc1d7', color: '#333', marginRight: '10px' }}
                        data-id={documento.id}
                        onClick={() => handleViewClick(documento)}
                    >
                        Ver publicación
                    </button>
                    <button
                        className="btn btn-light text-dark border rounded-pill px-4 py-2 m-1"
                        style={{ backgroundColor: '#fcc1d7', color: '#333' }}
                        data-id={documento.id}
                        onClick={borrarPublicacion}
                    >
                        Eliminar publicación
                    </button>
                </td>
            </tr>
        ))}
    </tbody>
</table>


                    {showModal && (
                        <div className="modal" style={modalStyle}>
                            <div className="modal-content" style={modalContentStyle}>
                                <div style={modalHeaderStyle}>
                                    Detalles de la Publicación
                                    <span
                                        className="close"
                                        style={closeButtonStyle}
                                        onClick={handleCloseModal}
                                    >
                                        &times;
                                    </span>
                                </div>
                                <div style={modalBodyStyle}>
                                    {selectedData && (
                                        <>
                                            <p className="mt-2"><strong>Descripción:</strong> {selectedData.caption}</p>
                                            <p className="mt-2"><strong>Fecha:</strong> {selectedData.fecha}</p>
                                            <p className="mt-2"><strong>Ubicación:</strong> {selectedData.location}</p>

                                            <p className="mt-4"><strong>Tags: </strong></p>
                                            <div>
                                                {selectedData.tags && selectedData.tags.map((tag, index) => (
                                                    <span key={index} style={tagStyle}>{tag}</span>
                                                ))}
                                            </div>

                                            <p className="mt-4"><strong>Fotos: </strong></p>
                                            <div style={imageContainerStyle}>
                                                {selectedData.fileUrls && selectedData.fileUrls.map((url, index) => (
                                                    <img key={index} src={url} style={imageStyle} />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div style={modalFooterStyle}>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: 'pink', fontSize: '20px' }}
                                        onClick={handleCloseModal}
                                    >
                                        Cerrar publicacion
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

AdminUsuarioPublicaciones.propTypes = {
    idUsuario: PropTypes.string
};

//-------------------- Estilos modal 

const modalStyle = {
    display: 'block',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',  
};

const modalContentStyle = {
    backgroundColor: '#fff',
    margin: '10% auto',
    padding: '20px',
    borderRadius: '10px',  
    width: '40%',  
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',  
    textAlign: 'center',  
    position: 'relative',  
};

const modalHeaderStyle = {
    backgroundColor: 'pink', 
    padding: '10px',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    color: 'black',
    fontSize: '30px',
};

const modalBodyStyle = {
    padding: '20px',
    fontSize: '16px',
    color: '#333',
};

const modalFooterStyle = {
    padding: '10px',
    textAlign: 'right',
    borderTop: '1px solid #e5e5e5',
};

const closeButtonStyle = {
    position: 'absolute',
    right: '20px',
    top: '10px',
    color: 'black',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
};

const tagStyle = {
    display: 'inline-block',
    backgroundColor: 'pink',
    color: 'black',
    borderRadius: '20px',
    padding: '5px 10px',
    margin: '5px',
    fontSize: '14px',
};

const imageStyle = {
    height: '200px', 
    width: '200px',
    margin: '10px',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',  
    alignItems: 'center',  
    flexWrap: 'wrap',  
    gap: '20px',  
};

// Estilos en caso de que no hayan publicaciones

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fff',
      color: '#333',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    image: {
      width: '150px',
      height: '150px',
      marginBottom: '20px',
    },
    title: {
      fontSize: '36px',
      fontWeight: 'bold',
      color: 'black', 
    },
    
  };