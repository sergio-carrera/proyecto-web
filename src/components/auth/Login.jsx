/*
Este componente funcional es la pantalla principal del Login.
Sirve para iniciar sesión y redirigir una vez que se haya iniciado sesión correctamente al componente
funcional del perfil del usuario.
*/
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "../../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { LoginGoogle } from "./LoginGoogle";
import { LoginFacebook } from "./LoginFacebook";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../../styles/login.css";

export const Login = () => {
    
    //Para manejar el estado de los campos del formulario (se vio en clases).
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /*
    Hook de "react-router-dom" que nos permite navegar entre componentes funcionales mediante rutas establecidas
    anteriormente en el "router".
    */
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login correcto");
            //Para ir al componente funcional del inicio.
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 h-screen flex items-center justify-center">
            <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                <h3 className="text-center text-xl font-bold mb-4">Login</h3>

                <div className="mb-4">
                    <input
                    type="email"
                    className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                <div className="mb-4">
                    <input
                    type="password"
                    className="form-control w-full p-2 border border-gray-300 rounded mt-1"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                <div className="d-grid mb-4">
                    <button type="submit" className="btn btn-primary w-full p-2 bg-blue-500 text-white rounded">
                    Iniciar sesión
                    </button>
                </div>
                <div className="forgot-password text-center">
                    ¿No tenés cuenta?
                    <br />
                    <Link to="/register" className="text-blue-500">Regístrate acá</Link>
                </div>
                <br />
                <LoginGoogle />
                <br />
                <LoginFacebook />
                </form>
            </div>
        </div>
    );
}
