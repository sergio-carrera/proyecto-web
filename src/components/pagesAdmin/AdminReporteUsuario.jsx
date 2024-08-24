import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../config/firebase';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminReporteUsuario = () => {


    const [listaReporte, setListaReporte] = useState([])

    const eliminarReporte = async (userId, reporteId) => {
        try {
          await deleteDoc(doc(db, `Usuarios/${userId}/reporte`, reporteId));
         
          Swal.fire("Reporte eliminado");
          obtenerReportes();
       
        } catch (error) {
          console.error("Error al eliminar el reporte: ", error);
        }
      };
      const navigate = useNavigate();
      const goToPerfil = (id)=>{
    
        navigate(`/perfil/${id}`);
      }

    const obtenerReportes = async () => {
        try {
          const QuerySnapshot = await getDocs(collection(db, 'Usuarios'));
          const listaAux = [];
    
          for (const doc of QuerySnapshot.docs) {
            const referenciaSubCollection = collection(db, `Usuarios/${doc.id}/reporte`);
            const reportesSnapshot = await getDocs(referenciaSubCollection);
    
            if (!reportesSnapshot.empty) {
              const reportes = [];
              reportesSnapshot.forEach((reporteDoc) => {
                reportes.push({ id: reporteDoc.id, ...reporteDoc.data() });
              });
              listaAux.push({ id: doc.id, ...doc.data(), reportes });
            }
          }
    
          setListaReporte(listaAux);
        } catch (error) {
          console.error("Error fetching users with reports: ", error);
        }
      };

      

useEffect(()=>{
    obtenerReportes();
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
        Gestión de reportes de usuarios
      </h2>

      <div>
        {listaReporte.length === 0 ? (
          <p>No hay usuarios con reportes.</p>
        ) : (
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '20px 0'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f2f2f2',
                    borderBottom: '2px solid #ff69b4'
                  }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Nombre</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Apellido</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Fecha de Reporte</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Razón del Reporte</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listaReporte.map(user => (
                    user.reportes.map(reporte => (
                      <tr key={reporte.id}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.nombre}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.apellido}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{user.email}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reporte.fecha}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reporte.razonReporte}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            <button className='btn m-1' style={{backgroundColor:'#fcc1d7'}} onClick={()=>goToPerfil(user.id)}>Ver perfil</button>
                            <button className='btn m-1' style={{backgroundColor:'#fcc1d7'}} onClick={() => eliminarReporte(user.id, reporte.id)}>Eliminar reporte</button>
                        </td>
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
          
        )}
      </div>
    </>
  )
}

export default AdminReporteUsuario
