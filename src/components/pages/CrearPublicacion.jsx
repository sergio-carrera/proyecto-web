import { PublicacionFormulario } from "../forms/PublicacionFormulario"
import { auth } from "../../config/firebase";
import { useEffect, useState } from "react";

export const CrearPublicacion = () => {
  const [user, setUser] = useState(null);

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

  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
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
          <PublicacionFormulario action="Crear" userId={user.uid} />
        </div>
      </div>
    </>
  )
}