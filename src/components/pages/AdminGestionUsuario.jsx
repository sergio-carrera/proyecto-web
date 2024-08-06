import { useEffect, useState } from "react"
import { onFindAll, onFindById, onUpdate } from "../../config/Api"
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
  
    const eliminarUsuario = async   ({target}) => {
        
      const datos = await onFindById(collectionString,target.dataset.id)
      
      const objectAux = datos.data()

      

      if (objectAux.Estado == 'Inactivo'){
        objectAux.Estado = "Activo"
        Swal.fire("Usuario activado correctamente!");
      
      }else{
        objectAux.Estado = "Inactivo"
        Swal.fire("Usuario desactivado correctamente!");
      }

      onUpdate(collectionString, target.dataset.id, objectAux)

      
      onGetUsuarios(collectionString)
    };
  
return (
    <>
      <table className="table table-striped">
        <thead>
            <tr >
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Estado</th>
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
                                <th>{documento.data().Estado}</th>
                                <th><img src={documento.data().foto} style={{height:'75px', width:'80px'}}></img></th>
                                    <th>
                              
                                    <button className="btn btn-primary " style={{width:'200px',height:'65px'}}  data-id={documento.id} >Ver publicaciones del usuario</button>
                                    <button className={documento.data().Estado=="Inactivo"?'btn btn-success mt-3':'btn btn-danger mt-3'} data-id={documento.id} style={{width:'200px',height:'65px'}} onClick={eliminarUsuario} >{documento.data().Estado=="Inactivo"?'Activar Usuario':'Desactivar usuario'}</button>
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
