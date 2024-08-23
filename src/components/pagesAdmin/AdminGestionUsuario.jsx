import { useEffect, useState } from "react"
import { onFindAll, onFindById, onUpdate } from "../../config/Api"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";

export const AdminGestionUsuario = () => {
  
  
  const navigate = useNavigate();

  const goUserPost =(id)=>{
      navigate(`/admin/AdminUsuarioPublicaciones/${id}`)
  }

    const collectionString = 'Usuarios'

    const [lstUsuarios, setLstUsuarios]  = useState([])
    
    const onGetUsuarios= async () =>{
        setLstUsuarios((await onFindAll(collectionString)).docs)
    }
    
    useEffect (()=>{
        onGetUsuarios(collectionString)
    },[])  
  
    const eliminarUsuario = async   ({target}) => {
        
      const datos = await onFindById(collectionString,target.dataset.id)
      
      const objectAux = datos.data()

      

      if (objectAux.estado == 'Inactivo'){
        objectAux.estado = "Activo"
        Swal.fire("Usuario activado correctamente!");
      
      }else{
        objectAux.estado = "Inactivo"
        Swal.fire("Usuario desactivado correctamente!");
      }

      onUpdate(collectionString, target.dataset.id, objectAux)

      
      onGetUsuarios(collectionString)
    };
  
return (
    <>
      <h2 style={{
        textAlign: 'center',
        margin: '20px 0',
        color: '#ff69b4',
        padding: '10px',
        borderBottom: '2px solid #ff69b4'
    }}>
        Gestión de usuarios
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
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Foto de perfil</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody>
            {lstUsuarios.map((documento) => (
                <tr key={documento.id} style={{
                    transition: 'background-color 0.3s ease',
                    cursor: 'pointer',
                    textAlign: 'center'  // Centering text in all rows
                }} 
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                >
                    <td style={{ padding: '10px' }}>{documento.data().nombre}</td>
                    <td style={{ padding: '10px' }}>{documento.data().apellido}</td>
                    <td style={{ padding: '10px' }}>{documento.data().email}</td>
                    <td style={{ padding: '10px' }}>{documento.data().estado}</td>
                    <td style={{ padding: '10px' }}>
                        <img
                            src={documento.data().foto}
                            style={{
                                height: '75px',
                                width: '75px',
                                borderRadius: '50%', // Making the image circular
                                objectFit: 'cover'
                            }}
                            alt="Perfil"
                        />
                    </td>
                    <td style={{ padding: '10px' }}>
                        <button
                            className="btn m-1"
                            style={{
                                backgroundColor: '#fcc1d7',
                                color: 'black',
                                width: '200px',
                                height: '50px',
                                borderRadius: '20px',
                                marginRight: '10px',
                                transition: 'background-color 0.3s ease'
                            }}
                            data-id={documento.id}
                            onClick={() => goUserPost(documento.data().idUsuario)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff69b4'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fcc1d7'}
                        >
                            Ver publicaciones del usuario
                        </button>
                        <button
                            className="btn m-1"
                            style={
                              {
                              backgroundColor: '#fcc1d7',
                              color: 'black',
                              width: '200px',
                              height: '50px',
                              borderRadius: '20px',
                              marginRight: '10px',
                              transition: 'background-color 0.3s ease'
                          }}
                            data-id={documento.id}
                            onClick={eliminarUsuario}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'red'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fcc1d7'}
                        >
                            {documento.data().estado === "Inactivo" ? 'Activar Usuario' : 'Desactivar usuario'}
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
  )
}
