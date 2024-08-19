import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../../styles/loginGoogle.css";
import Swal from "sweetalert2";


export const LoginGoogle = () => {

    /*
    Hook de "react-router-dom" que nos permite navegar entre componentes funcionales mediante rutas establecidas
    anteriormente en el "router".
    */
    const navigate = useNavigate();
    //Se crea una instancia del proveedor de autenticación de Google.
    const proveedor = new GoogleAuthProvider();

    const handleLogout = async () => {
        try {
          await auth.signOut();
          navigate("/login");
          
        } catch (error) {
          console.error("Error al cerrar sesión:", error.message);
        }
      };

    //Función que se activa al presionar el botón "button-google".
    const IniciarSesionConGoogle = async () => {      
        try {
            const resultado = await signInWithPopup(auth, proveedor);
            const usuario = resultado.user;
            
            const userDocRef = doc(db, "Usuarios", usuario.uid);
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    idUsuario: usuario.uid,
                    email: usuario.email,         
                    nombre: usuario.displayName,  
                    apellido: "",              
                    foto: "https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/profile-circle-icon-256x256-cm91gqm2.png?alt=media&token=5b2a71ae-e78d-40c4-b2c7-0e07511ad2a3",
                    biografia: "",
                    estado: "activo",
                    privacidad: "publica"     
                });
                //Para ir al componente funcional del inicio.
                navigate("/");
            } else {
                const referencia = collection(db,"Usuarios");

                const consulta = query(referencia, where ('email','==', usuario.email))

                const datosConsulta = await getDocs(consulta)

                const estadoCuenta = datosConsulta.docs[0].data().estado
            
                if (estadoCuenta==='Inactivo'){
                    Swal.fire("Cuenta deshabilitada por el administrador , no es posible ingresar");
                    handleLogout()
                }else{
                    //Para ir al componente funcional del inicio.
                    navigate("/");
                }  
            }
        } catch (error) {
            console.error("Error al iniciar sesión con Google: ", error);
        }
    }

    return (
        <>
            <p className="flex items-center justify-center my-1">
                <span className="border-t border-gray-300 flex-grow mr-3"></span>
                <span className="text-gray-500">O</span>
                <span className="border-t border-gray-300 flex-grow ml-3"></span>
            </p>
            <div className="loginGoogle-container">
                <button className="btn button-google" onClick={IniciarSesionConGoogle}>
                    <img 
                    style={{width:'35px'}} 
                    src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/2991148.png?alt=media&token=3f5fc4e6-7dcb-4bd3-92a5-7857ab82d92c" 
                    alt="Logo de Google"
                     />
                    Continuar con Google
                </button>
            </div>
        </>
    )
}
