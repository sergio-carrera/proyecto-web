/*
Este componente funcional es la pantalla principal del Login.
Sirve para iniciar sesión y redirigir una vez que se haya iniciado sesión correctamente al componente
funcional del perfil del usuario.
*/
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { auth } from "./firebase";
import { useNavigate, Link } from "react-router-dom";
import { LoginGoogle } from "./LoginGoogle";
import { LoginFacebook } from "./LoginFacebook";
import "../styles/login.css";

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
            //Para ir al componente funcional del perfil.
            navigate("/perfil");
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="login-container">
                <form onSubmit={handleSubmit}>
                <h3>Login</h3>

                <div className="input-container">
                    <label>Email address</label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                <div className="input-container">
                    <label>Password</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                    Iniciar sesión
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Crear nuevo usuario <Link to="/register">Registro</Link>
                </p>

                {/* Componentes funcionales para iniciar sesión con Google o Facebook*/}
                <LoginGoogle/>
                <LoginFacebook/>
                </form>
            </div>
        </>
    )
}
