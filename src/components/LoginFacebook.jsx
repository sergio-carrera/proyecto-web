import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../styles/loginFacebook.css";

export const LoginFacebook = () => {

    /*
    Hook de "react-router-dom" que nos permite navegar entre componentes funcionales mediante rutas establecidas
    anteriormente en el "router".
    */
    const navigate = useNavigate();

    //Función que se activa al presionar el botón "button-facebook".
    function IniciarSesionConFacebook() {
        //Se crea una instancia del proveedor de autenticación de Facebook.
        const proveedor = new FacebookAuthProvider();
        //Esta función de sirve para autenticar al usuario con Google mediante una ventana emergente.
        signInWithPopup(auth, proveedor).then(async (resultado) => {
            console.log(resultado);
            /*
            Evidentemente ocupamos saber al objeto del usuario, por lo que se utiliza el resultado de la autenticación para
            obtener al usuario (resultado.user). No necesariamente tiene que llamarse "resultado", es simplemente un nombre
            establecido para almacenar el "UserCredential" que pide la función "signInWithPopup".
            */
            const user = resultado.user;
            if(resultado.user){
                //Para guardar la información/detalle del usuario en la colección "Usuarios".
                await setDoc(doc(db, "Usuarios", user.uid),{
                    email: user.email,
                    nombre: user.displayName,
                    apellido: "",
                    foto: "https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/profile-circle-icon-256x256-cm91gqm2.png?alt=media&token=5b2a71ae-e78d-40c4-b2c7-0e07511ad2a3"
                });
                console.log("Usuario logueado correctamente con Facebook");
                //Para ir al componente funcional del perfil.
                navigate("/perfil");
            }
        });
    }

    return (
        <>
            <div className="loginFacebook-container">
                <button className="btn button-facebook " onClick={IniciarSesionConFacebook}>
                    <img style={{width:'30px'}}  src="https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/124010.png?alt=media&token=21d88bcd-e646-408a-bb5a-68329d39c336" alt="Logo de Facebook" />
                    Continuar con Facebook
                </button>
            </div>
        </>
    )
}
