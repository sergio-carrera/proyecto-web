import { PublicacionFormulario } from "../forms/PublicacionFormulario"
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/crearPublicacion.css";

export const CrearPublicacion = () => {
  const [user, setUser] = useState(null);
  //Navegamos entre componentes con este hook del paquete del react-router-dom.
  const navigate = useNavigate();

  /*
  Es necesario este hook para obtener el id del usuario correctamente y pasarlo
  al formulario para crear una publicacion
  */
  useEffect(() => {
    /*
    Esto es un observador que se activa cada vez que cambia el estado de autenticación (por ejemplo, 
    cuando el usuario inicia o cierra sesión). La función de devolución de llamada 
    (currentUser => setUser(currentUser)) actualiza el estado user con el usuario actual.
    */
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    //Hay que limpiar al observador cuando el componente se desmonta, evitando posibles fugas de memoria.
    return () => unsubscribe();
  }, []);

  /*
  Es un efecto visual más rápido para "asemejar" que está cargando la página. Evidente dura un tiempo en que el user pase
  a ser algo que no sea null, porque hay que esperar a que el "useEffect" llegue a "setUser(user)". Además, el user siempre 
  empieza en null "useState(null)".
  */
  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  /*
  En caso de que no haya ningún usuario autenticado, entonces se procede a informar
  al usuario que refresque la página o que mejor inicie sesión nuevamente. Lo envía directamente
  a la página del Login.
  (Nunca debería suceder esto, porque siempre se debería de obtener al usuario autenticado, porque si no se
  le redireccionaría a la página del login desde la lógica del componente funcional "LeftSidebar").
  */
  if (!user) {
    navigate("/login");
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Por favor, refresca la página o inicia sesión nuevamente para crear una publicación.</p>
      </div>
    );
  }

  return (
    <>
        <div className="flex flex-1 h-screen">
        <div className="common-container">
          <div className="flex items-center justify-center gap-3 w-full max-w-5xl mx-auto">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/icons%2FcreatePost.png?alt=media&token=ddd546c1-ca27-4425-9735-ec4dad43272a"
              width={36}
              height={36}
              alt="add"
            />
            <h2 className="text-2xl md:text-3xl font-bold">Crear publicación</h2>
          </div>
          {/* 
          Como estamos llavando a este formulario de publicacion desde la parte de crear publicacion, entonces
          la acción predeterminada será la de "Crear", y no "Editar". El id del usuario se obtiene del objeto
          usuario almacenado en la constante "user" del hook "const [user, setUser] = useState(null)".
          */}
          <PublicacionFormulario idUsuario={user.uid} />
        </div>
      </div>
    </>
  )
}