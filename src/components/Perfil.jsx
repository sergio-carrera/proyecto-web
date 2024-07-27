/*
Esto lo hacía Xavier.
Pero yo lo hice solo para probar la manera de autenticar al usuario que ha iniciado sesión y manejar
el caso de que se ingrese por algún motivo a esta ruta sin haber autenticado a ningún usuario anteriormente. 
*/

import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/perfil.css"
import { onUpdate } from "./Api";
import Swal from "sweetalert2"



const collectionString = 'Usuarios'


export const Perfil = () => {

  // id para poder utilizarlo a la hora de validar
  const [idUsuario, setIdUsuario] = useState('')

  // se verifica que el estado esté en editar
  const [estadoEditar, setEstadoEditar] = useState(false)

  //Estos hooks son esenciales para manejar visualmente la pantalla y mostrar la información respectiva.
  const [usuarioDetalles, setUsuarioDetalles] = useState(null);
  //Da un efecto de que se está "cargando" la información. 
  const [loading, setLoading] = useState(true);
  /*
  Navegamos a través de componentes funcionales con rutas establecidas en el "router". Este hook es propio de "react-router-dom" 
  (ya está instalado).
  */
  const navigate = useNavigate();

  /*
  Esta lógica es muy importante para evitar estar renderizando de más al componente funcional.
  Como hemos estado viendo en clase, el hook "useEffect" nos ayuda para decirle al componente que necesita
  correr cierta lógica antes de ser renderizado.
  */
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUsuarioDetalles(docSnap.data());
            setIdUsuario(user.uid)

          } else {
            console.log("No se ha encontrado detalle del usuario");
          }
        } catch (error) {
          console.error("Error al hacer fetching del detalle del usuario:", error);
        } finally {
          setLoading(false);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
      console.log("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const cancelar= () =>{
    setEstadoEditar(false)
    refrescar();
  }

  const EditarPerfil= () =>{
    setEstadoEditar(true)

  }



  const handleInputChange =({target}) =>{
    // se desestructura
    const {name, value}= target;
    setUsuarioDetalles({...usuarioDetalles, [name]:value})
    
  }

const refrescar = async ()=>{

    const docRef = doc(db, "Usuarios",idUsuario);
      const docSnap = await getDoc(docRef);
      setUsuarioDetalles(docSnap.data());
}
  
const guardarCambios = async ()=>{
    try {
      await onUpdate(collectionString,idUsuario, usuarioDetalles);
      setEstadoEditar(false);
      refrescar();
      
      Swal.fire({
        title: "Exito!",
        text: "El perfil fue actualizado correctamente",
        icon: "success"
      });

    } catch (error) {
      console.log(error)
    }
}

  if (loading) {
    return <p>Cargando datos...</p>;
  }




  return (
    <div className="perfil-container">
      {usuarioDetalles ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={usuarioDetalles.photo}
              width={"40%"}
              style={{ borderRadius: "50%" }}
              alt="Foto de perfil"
            />
          </div>

          <h3>Bienvenido {usuarioDetalles.nombre} {usuarioDetalles.apellido} 🙏🙏</h3>
          <div className="detalle-container">
            <p>Correo electrónico: {usuarioDetalles.email}</p>


            {estadoEditar==false? <p>Nombre: {usuarioDetalles.nombre} {usuarioDetalles.apellido}</p>:
            
              
              <>
                <label >Nombre:</label>
                <input onChange={handleInputChange} type="text" value={usuarioDetalles.nombre} name="nombre"  style={{marginBottom:"20px"}}></input>
                <label >Apellido:</label>
                <input onChange={handleInputChange} type="text" value={usuarioDetalles.apellido} name="apellido" style={{marginBottom:"20px"}} ></input>
                <button onClick={guardarCambios} className="btnEditar" style={{backgroundColor:"blue"}} >
                Guardar Cambios
                </button>  
                <button onClick={cancelar} className="btnEditar" style={{backgroundColor:"#ff4d4d"}}>
                Cancelar cambios
                </button>  
              </>
              


              


            }
    
          </div>


          <button onClick={EditarPerfil} style={estadoEditar==true?{visibility:'hidden'}:{visibility:'visible'}} className="btnEditar" >
            Editar perfil
          </button>
          
          <button className="btnCerrarSesion" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : (
        <p>No se encontraron detalles del usuario.</p>
      )}
    </div>
  );
};
