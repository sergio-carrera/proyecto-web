import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { sidebarLinks } from "./sidebarLinks"
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export const LeftSidebar = () => {


    const [idUsuario, setIdUsuario] = useState('')

    //Estos hooks son esenciales para manejar visualmente la pantalla y mostrar la información respectiva.
    const [usuarioDetalles, setUsuarioDetalles] = useState(null);

    //Da un efecto de que se está "cargando" la información. 
    const [loading, setLoading] = useState(true);

    /*
    Navegamos a través de componentes funcionales con rutas establecidas en el "router". Este hook es propio de "react-router-dom" 
    (ya está instalado).
    */
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await auth.signOut();
          navigate("/login");
          console.log("Sesión cerrada correctamente");
        } catch (error) {
          console.error("Error al cerrar sesión:", error.message);
        }
    };

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

    const { pathname } = useLocation();

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    return (
        <div className="flex flex-col gap-11 border-r border-gray-300">
            <nav className="leftsidebar">
                <div className="flex flex-col gap-11">
                    <Link to="/" className="flex gap-3 items-center">
                        <img 
                            src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/logo.png?alt=media&token=f43be88a-efca-4121-9b50-3f6fbe53ec14" 
                            alt="Mochimap" 
                            width={170}
                            height={36}
                        />
                    </Link>  

                    <ul className="flex flex-col gap-0.5">
                        {sidebarLinks.map(link => {
                            const isActive = pathname === link.route;
                            return (
                                <li
                                    key={link.label}
                                    className={`leftsidebar-link group ${
                                        isActive ? "bg-primary-500" : ""
                                    }`}
                                >
                                    <NavLink
                                        to={link.route}
                                        className="flex gap-4 items-center p-4"
                                    >
                                        <img
                                            src={link.imgURL}
                                            alt={link.label}
                                            width={35}
                                            height={35}
                                            className={`group-hover:invert-white ${
                                                isActive ? "invert-white" : ""
                                            }`}
                                        />
                                        {link.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                        
                        <li className={`leftsidebar-link group ${pathname === `/perfil/${idUsuario}` ? "bg-primary-500" : ""} cursor-pointer`}>
                            {usuarioDetalles ? (
                                <>
                                    <NavLink
                                        to={`/perfil/${idUsuario}`}
                                        className="flex gap-4 items-center p-4">
                                        <img 
                                            src={usuarioDetalles.foto} 
                                            alt="Foto de perfil"
                                            width={35}
                                            height={35} 
                                            className="rounded-full"
                                        />
                                        Perfil
                                    </NavLink>
                                </>
                            ) : (
                                <p>El usuario no tiene foto</p>
                            )}      
                        </li>
                    </ul>
                    <li
                        className="leftsidebar-link group cursor-pointer mt-20"
                        onClick={handleLogout}
                    >
                        <span className="flex gap-4 items-center p-4">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/icons%2Flogout.png?alt=media&token=0f6e4802-6813-486b-8c87-912fca6e5a37" // Add a suitable icon for logout
                                alt="Cerrar sesión"
                                width={35}
                                height={35}
                            />
                            Cerrar Sesión
                        </span>
                    </li>
                </div>
            </nav>
        </div>
    )
}
