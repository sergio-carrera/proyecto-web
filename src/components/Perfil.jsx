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

export const Perfil = () => {
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
            <p>Nombre: {usuarioDetalles.nombre} {usuarioDetalles.apellido}</p>
          </div>
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
