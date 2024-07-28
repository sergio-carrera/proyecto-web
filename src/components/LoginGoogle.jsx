import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../styles/loginGoogle.css";

export const LoginGoogle = () => {

    /*
    Hook de "react-router-dom" que nos permite navegar entre componentes funcionales mediante rutas establecidas
    anteriormente en el "router".
    */
    const navigate = useNavigate();

    //Función que se activa al presionar el botón "button-google".
    function IniciarSesionConGoogle() {
        //Se crea una instancia del proveedor de autenticación de Google.
        const proveedor = new GoogleAuthProvider(); 
        //Esta función de sirve para autenticar al usuario con Google mediante una ventana emergente.
        signInWithPopup(auth, proveedor).then(async (resultado) => {
            console.log(resultado);
            /*
            Evidentemente ocupamos saber al objeto del usuario, por lo que se utiliza el resultado de la autenticación para
            obtener al usuario (resultado.user). No necesariamente tiene que llamarse "resultado", es simplemente un nombre
            establecido para almacenar el "UserCredential" que pide la función "signInWithPopup".
            */
            const user = resultado.user;
            if (user) {
                //Para guardar la información/detalle del usuario en la colección "Usuarios".
                await setDoc(doc(db, "Usuarios", user.uid), {
                    email: user.email,         
                    nombre: user.displayName,  
                    apellido: "",              
                    foto:  "https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/profile-circle-icon-256x256-cm91gqm2.png?alt=media&token=5b2a71ae-e78d-40c4-b2c7-0e07511ad2a3"    
                });
                console.log("Usuario logueado correctamente con Google");
                //Para ir al componente funcional del perfil.
                navigate("/perfil");
            }
        });
    }

    return (
        <>
            <p className="continuar-p">--O continúa con--</p>
            <div className="loginGoogle-container">
                <button className="btn button-google" onClick={IniciarSesionConGoogle}>
                    <img style={{width:'35px'}} src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/2991148.png?alt=media&token=3f5fc4e6-7dcb-4bd3-92a5-7857ab82d92c" alt="Logo de Google" />
                    Continuar con Google
                </button>
            </div>
        </>
    )
}
