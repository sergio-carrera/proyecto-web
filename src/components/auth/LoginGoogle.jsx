import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../../styles/loginGoogle.css";

export const LoginGoogle = () => {

    /*
    Hook de "react-router-dom" que nos permite navegar entre componentes funcionales mediante rutas establecidas
    anteriormente en el "router".
    */
    const navigate = useNavigate();
    //Se crea una instancia del proveedor de autenticación de Google.
    const proveedor = new GoogleAuthProvider();

    //Función que se activa al presionar el botón "button-google".
    const IniciarSesionConGoogle = async () => {      
        try {
            const resultado = await signInWithPopup(auth, proveedor);
            const usuario = resultado.user;
            
            const userDocRef = doc(db, "Usuarios", usuario.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    email: usuario.email,         
                    nombre: usuario.displayName,  
                    apellido: "",              
                    foto: "https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/profile-circle-icon-256x256-cm91gqm2.png?alt=media&token=5b2a71ae-e78d-40c4-b2c7-0e07511ad2a3"    
                });
                //Para ir al componente funcional del inicio.
                navigate("/");
            } else {
                //Para ir al componente funcional del inicio.
                navigate("/");
            }
        } catch (error) {
            console.error("Error al iniciar sesión con Google: ", error);
        }
    }

    return (
        <>
            <p className="continuar-p base-regular">
                --O continúa con--
            </p>
            <br />
            <div className="loginGoogle-container">
                <button className="btn button-google" onClick={IniciarSesionConGoogle}>
                    <img style={{width:'35px'}} src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/2991148.png?alt=media&token=3f5fc4e6-7dcb-4bd3-92a5-7857ab82d92c" alt="Logo de Google" />
                    Continuar con Google
                </button>
            </div>
        </>
    )
}
