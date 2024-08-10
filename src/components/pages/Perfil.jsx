/*
Esto lo hacía Xavier.
Pero yo lo hice solo para probar la manera de autenticar al usuario que ha iniciado sesión y manejar
el caso de que se ingrese por algún motivo a esta ruta sin haber autenticado a ningún usuario anteriormente. 
*/
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useEffect, useState } from "react";
import "../../styles/perfil.css";
import { PerfilCardGeneral } from "../cards/PerfilCardGeneral";
import { useNavigate } from "react-router-dom";

export const Perfil = () => {

  // id para poder utilizarlo a la hora de validar
  const [idUsuario, setIdUsuario] = useState('')

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
    /*
    Esto es un observador que se activa cada vez que cambia el estado de autenticación (por ejemplo, 
    cuando el usuario inicia o cierra sesión). La función de devolución de llamada 
    (currentUser => setUser(currentUser)) actualiza el estado user con el usuario actual.
    */
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
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
    //Hay que limpiar al observador cuando el componente se desmonta, evitando posibles fugas de memoria.
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  return (
    <PerfilCardGeneral idUsuarioE={idUsuario}/>
  )
};