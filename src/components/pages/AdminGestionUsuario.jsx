import { useEffect, useState } from "react"
import { onDelete, onFindAll } from "../../config/Api"
import { auth } from "../../config/firebase"
import Swal from "sweetalert2"



const AdminGestionUsuario = () => {
  
    const collectionString = 'Usuarios'

    const [lstUsuarios, setLstUsuarios]  = useState([])
    
    const onGetUsuarios= async () =>{
        setLstUsuarios((await onFindAll(collectionString)).docs)
    }
    
    useEffect (()=>{
        onGetUsuarios(collectionString)
    },[])  
  
    const eliminarUsuario =  () => {
        
        
        /*if (user) {
          
          Swal.fire({
            title: "Estas seguro?",
            text: "La cuenta no se podrá recuperar",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar cuenta!"
          }).then(async (result) => {
            if (result.isConfirmed) {
            await onDelete(collectionString,target.dataset.id)
            user
              .delete()
              .then(() => {
                onGetUsuarios();
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
            
            });
              Swal.fire({
                title: "Eliminado!",
                text: "la cuenta fue eliminada correctamente",
                icon: "success"
              });
            }
          });
        } */
      };
  
return (
    <>
      <table className="table table-striped">
        <thead>
            <tr >
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Foto de perfil</th>
            </tr>
        </thead>

        <tbody>
                    {
                        lstUsuarios.map((documento) =>(

                            
                           <tr key={documento.id}>
                                <th>{documento.data().nombre}</th>
                                <th>{documento.data().apellido}</th>
                                <th>{documento.data().email}</th>
                                <th><img src={documento.data().foto} style={{height:'75px', width:'80px'}}></img></th>
                                    <th>
                              
                                    <button className="btn btn-primary " style={{width:'200px',height:'65px'}}  data-id={documento.id} >Ver publicaciones del usuario</button>
                                    <button className="btn btn-danger ms-3" data-id={documento.id} style={{width:'200px',height:'65px'}} onClick={eliminarUsuario} >Eliminar usuario</button>
                                </th>
                                
                            </tr>
                            
                        ))
                    }

                </tbody>
      </table>
    </>
  )
}

export default AdminGestionUsuario
