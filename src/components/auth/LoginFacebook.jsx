import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth, db } from "../../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../../styles/loginFacebook.css";

export const LoginFacebook = () => {

    /*
    Hook de "react-router-dom" que nos permite navegar entre componentes funcionales mediante rutas establecidas
    anteriormente en el "router".
    */
    const navigate = useNavigate();
    //Se crea una instancia del proveedor de autenticación de Facebook.
    const proveedor = new FacebookAuthProvider();

    //Función que se activa al presionar el botón "button-google".
    const IniciarSesionConFacebook = async () => {      
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
            <div className="loginFacebook-container">
                <button className="btn button-facebook" onClick={IniciarSesionConFacebook}>
                    <img 
                    style={{width:'30px'}}  
                    src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/124010.png?alt=media&token=21d88bcd-e646-408a-bb5a-68329d39c336" 
                    alt="Logo de Facebook" />
                    Continuar con Facebook
                </button>
            </div>
        </>
    )
}
