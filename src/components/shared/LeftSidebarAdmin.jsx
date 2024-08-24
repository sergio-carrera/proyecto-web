import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { sidebarLinksAdmin } from "./sidebarLinksAdmin";
import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export const LeftSidebarAdmin = () => {
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

    const esAdmin = async email => {
      const referencia = collection(db, "Administradores");
      const consulta = query(referencia, where ('email','==', email));
      const consultaSnap = await getDocs(consulta);
      return !consultaSnap.empty;
  }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            try {
              const e = user.email;
              const essAdmin = await esAdmin(e);
              if (!essAdmin) {
                console.log("no eres admin D:");
                navigate("/login");
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
                    <Link to="/Admin" className="flex gap-3 items-center">
                        <img 
                            src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/Screenshot%202024-08-22%20162349.png?alt=media&token=0d705a3d-50f5-46c0-bb2f-1a28fe0dd5ac" 
                            alt="Mochimap" 
                            width={170}
                            height={36}
                        />
                    </Link>  

                    <ul className="flex flex-col gap-0.5">
                        {sidebarLinksAdmin.map(link => {
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
