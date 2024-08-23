import { useEffect, useState } from "react";
import { onDelete, onFindAll, onFindById } from "../../config/Api";
import Swal from "sweetalert2";

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

export const AdminTodasPublicacion = () => {
    const collectionString = 'Publicaciones'

    const [lstPublicaciones, setLstPublicaciones] = useState([])
    const [userEmails, setUserEmails] = useState({})  


    const [showModal, setShowModal] = useState(false); 
    const [selectedData, setSelectedData] = useState(null);

    const onGetPublicaciones = async () => {
        const publicaciones = (await onFindAll(collectionString)).docs
        setLstPublicaciones(publicaciones)

        const emails = {}
        for (const doc of publicaciones) {
            const userId = doc.data().idUsuario 
            emails[doc.id] = await onGetUsuario(userId)

        }
        setUserEmails(emails)
    }

    const onGetUsuario = async (id) => {
        const usuarioAux = await onFindById('Usuarios', id)
        return usuarioAux.data().email
    }

    const handleViewClick = (documento) => {
        setSelectedData(documento.data());  
        setShowModal(true);  
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedData(null);
    };

    const borrarPublicacion =  ({target})=>{
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
            await onDelete(collectionString, target.dataset.id)
              Swal.fire({
                title: "Eliminada!",
                text: "Publicacion eliminada",
                icon: "success"
              });
              onGetPublicaciones()
            }
          });
    }

    useEffect(() => {
        onGetPublicaciones()
        console.log(lstPublicaciones.length)
    },[])

    return (
        <>


<h2 style={{
        textAlign: 'center',
        margin: '20px 0',
        color: '#ff69b4',
        padding: '10px',
        borderBottom: '2px solid #fcc1d7'
    }}>
        Gestión de todas las publicaciones
    </h2>

    <table className="table table-striped" style={{
        width: '100%',
        margin: '0 auto',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden'
    }}>
        <thead>
            <tr style={{
                backgroundColor: '#ffe6f0',
                color: '#ff69b4',
                fontWeight: 'bold',
                fontSize: '16px',
                textAlign: 'center'
            }}>
                <th>Descripcion</th>
                <th>Fecha</th>
                <th>Ubicacion</th>
                <th>Email del Usuario</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {lstPublicaciones.map((documento) => (
                <tr key={documento.id} style={{
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer',
                     textAlign: 'center'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                    <td style={{ padding: '10px' }}>{documento.data().caption}</td>
                    <td style={{ padding: '10px' }}>{documento.data().fecha}</td>
                    <td style={{ padding: '10px' }}>{documento.data().location}</td>
                    <td style={{ padding: '10px' }}>{userEmails[documento.id]}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button
                            className="btn m-1"
                            style={{
                                backgroundColor: '#fcc1d7',
                                color: 'black',
                                width: '120px',
                                height: '55px',
                                borderRadius: '20px',
                                marginRight: '10px',
                                transition: 'background-color 0.3s ease'
                            }}
                            data-id={documento.id}
                            onClick={() => handleViewClick(documento)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff69b4'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fcc1d7'}
                        >
                            Ver publicación
                        </button>
                        <button
                            className="btn m-1"
                            style={{
                                backgroundColor: '#fcc1d7',
                                color: 'black',
                                width: '120px',
                                height: '55px',
                                borderRadius: '20px',
                                transition: 'background-color 0.3s ease'
                            }}
                            data-id={documento.id}
                            onClick={borrarPublicacion}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff4d4d'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fcc1d7'}
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
                            <span className="close" style={closeButtonStyle} onClick={handleCloseModal}>&times;</span>
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
                            <button className="btn " style={{backgroundColor:'pink', fontSize:'20px'} } onClick={handleCloseModal}>Cerrar publicacion</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
