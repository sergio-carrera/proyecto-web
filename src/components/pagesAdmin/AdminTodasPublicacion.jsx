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
        console.log('hola')
    },[])

    return (
        <>
      

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th>Fecha</th>
                        <th>Ubicacion</th>
                        <th>Email del Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lstPublicaciones.map((documento) => (
                        <tr key={documento.id}>
                            <td>{documento.data().caption}</td>
                            <td>{documento.data().fecha}</td>
                            <td>{documento.data().location}</td>
                            <td>{userEmails[documento.id]}</td>
                            <td>
                                <button className="btn btn-primary" style={{ width: '100px', height: '60px' }} data-id={documento.id} onClick={() => handleViewClick(documento)}>Ver publicacion</button>
                                <button className="btn btn-danger ms-3" style={{ width: '100px', height: '60px' }} data-id={documento.id} onClick={borrarPublicacion}>Eliminar publicacion</button>
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
