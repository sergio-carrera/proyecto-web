import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
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
                    foto: user.photoURL
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
                <button className="button-facebook" onClick={IniciarSesionConFacebook}>
                    <img src="google-icon.png" alt="Logo de Facebook" />
                    Continuar con Facebook
                </button>
            </div>
        </>
    )
}
