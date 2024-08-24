//AdminReportes.jsx
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  margin: '20px 0',
  fontSize: '1rem',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f8f9fa',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
};

const thStyle = {
  backgroundColor: '#fcc1d7',
  color: '#333',
  padding: '10px',
  borderBottom: '2px solid #e5e5e5',
  textAlign: 'left',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #e5e5e5',
};

const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s, transform 0.3s',
};

const modalFooterButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'pink',
  fontSize: '20px',
};

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

const modalHeaderStyle = {
  backgroundColor: 'pink', 
  padding: '10px',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  color: 'black',
  fontSize: '30px',
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

const modalBodyStyle = {
  padding: '20px',
  fontSize: '16px',
  color: '#333',
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

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',  
  alignItems: 'center',  
  flexWrap: 'wrap',  
  gap: '20px',  
};

const imageStyle = {
  height: '200px', 
  width: '200px',
  margin: '10px',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const modalFooterStyle = {
  padding: '10px',
  textAlign: 'right',
  borderTop: '1px solid #e5e5e5',
};

export const AdminReportes = () => {
    const [reportes, setReportes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    useEffect(() => {
      const fetchReportes = async () => {
          const reportesList = [];
          const publicacionesRef = collection(db, "Publicaciones");
  
          const publicacionesSnapshot = await getDocs(publicacionesRef);
          for (const doc of publicacionesSnapshot.docs) {
              const reportesRef = collection(db, `Publicaciones/${doc.id}/ReportarPublicacion`);
              const reportesSnapshot = await getDocs(reportesRef);
  
              for (const reporteDoc of reportesSnapshot.docs) {
                  const reporteData = reporteDoc.data();
                  // Obtén los datos de la publicación
                  const publicacionData = doc.data();
                  
                  // Combina los datos del reporte y la publicación
                  const combinedData = {
                      ...reporteData,
                      ...publicacionData,
                      id: reporteDoc.id,
                      publicacionId: doc.id
                  };
  
                  reportesList.push(combinedData);
              }
          }
  
          setReportes(reportesList);
      };
  
      fetchReportes();
  }, []);

    const handleOmitir = async (id, publicacionId) => {
        try {
            const reporteDocRef = doc(db, `Publicaciones/${publicacionId}/ReportarPublicacion`, id);
            await deleteDoc(reporteDocRef);
            console.log("Omitiendo reporte con id:", id);
            setReportes(reportes.filter(reporte => reporte.id !== id));
        } catch (error) {
            console.error("Error al omitir el reporte:", error);
        }
    };

    const handleVerReporte = (reporte) => {
        setSelectedData(reporte);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedData(null);
    };

    const borrarSubcoleccion = async (db, idPublicacion, subcoleccion) => {
        const subcoleccionRef = collection(db, "Publicaciones", idPublicacion, subcoleccion);
        const subcoleccionSnapshot = await getDocs(subcoleccionRef);
        const deletePromises = subcoleccionSnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
    };

    const borrarPublicacion = async (publicacionId) => {
        const result = await Swal.fire({
            title: "¿Seguro que deseas borrar la publicación?",
            text: "No podrás recuperar la publicación.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar"
        });

        if (result.isConfirmed) {
            try {
                await borrarSubcoleccion(db, publicacionId, "Likes");
                await borrarSubcoleccion(db, publicacionId, "Comentarios");
                await borrarSubcoleccion(db, publicacionId, "ReportarPublicacion");
                const publicacionRef = doc(db, "Publicaciones", publicacionId);
                await deleteDoc(publicacionRef);
                Swal.fire({
                    title: "Eliminada!",
                    text: "Publicación eliminada",
                    icon: "success"
                });
                // Actualiza la lista de reportes
                setReportes(reportes.filter(reporte => reporte.publicacionId !== publicacionId));
            } catch (error) {
                console.error("Error al eliminar la publicación:", error);
            }
        }
    };

    return (
      <div>
          <table style={tableStyle}>
              <thead>
                  <tr>
                      <th style={thStyle}>Motivo</th>
                      <th style={thStyle}>Descripción</th>
                      <th style={thStyle}>ID Publicación</th>
                      <th style={thStyle}>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  {reportes.map((reporte) => (
                      <tr key={reporte.id}>
                          <td style={tdStyle}>{reporte.motivo}</td>
                          <td style={tdStyle}>{reporte.descripcion}</td>
                          <td style={tdStyle}>{reporte.idPublicacion}</td>
                          <td style={tdStyle}>
                              <button className='btn m-1' style={{backgroundColor:'#fcc1d7'}} onClick={() => handleOmitir(reporte.id, reporte.publicacionId)}>Omitir</button>
                              <button className='btn m-1' style={{backgroundColor:'#fcc1d7'}} onClick={() => handleVerReporte(reporte)}>Ver Reporte</button>
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
                                  <p><strong>Motivo:</strong> {selectedData.motivo}</p>
                                  <p><strong>Descripción:</strong> {selectedData.descripcion}</p>
                                  <p><strong>ID Publicación:</strong> {selectedData.idPublicacion}</p>
                                  
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
                          <button style={modalFooterButtonStyle} onClick={() => borrarPublicacion(selectedData.idPublicacion)}>Eliminar publicación</button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}
