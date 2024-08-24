/*
Este componente funcional es la pantalla principal del Login.
Sirve para iniciar sesión y redirigir una vez que se haya iniciado sesión correctamente al componente
funcional del perfil del usuario.
*/
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react"
import { auth, db } from "../../config/firebase";
import { useNavigate, Link } from "react-router-dom";
import { LoginGoogle } from "./LoginGoogle";
import { LoginFacebook } from "./LoginFacebook";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../../styles/login.css";
import logo from '../../images/logo2.jpg';
import Swal from "sweetalert2";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Login = () => {
    
    //Para manejar el estado de los campos del formulario (se vio en clases).
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleLogout = async () => {
        try {
          await auth.signOut();
          navigate("/login");
          
        } catch (error) {
          console.error("Error al cerrar sesión:", error.message);
        }
    };
    /*
    Hook de "react-router-dom" que nos permite navegar entre componentes funcionales mediante rutas establecidas
    anteriormente en el "router".
    */
    const navigate = useNavigate();

    const esAdmin = async () => {
        const referencia = collection(db, "Administradores");
        const consulta = query(referencia, where ('email','==', email));
        const consultaSnap = await getDocs(consulta);
        return !consultaSnap.empty;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password);

            const referencia = collection(db,"Usuarios");

            const consulta = query(referencia, where ('email','==', email))

            const datosConsulta = await getDocs(consulta)

            const estadoCuenta = datosConsulta.docs[0].data().estado
            
                if (estadoCuenta==='Inactivo'){
                    Swal.fire("Cuenta deshabilitada por el administrador, no es posible ingresar");
                    handleLogout()
                    setEmail('')
                    setPassword('')
                }else{
                    const essAdmin = await esAdmin();
                    if (essAdmin) {
                        console.log("es admin");
                        navigate("/admin");
                    } else {
                        console.log("es usuario");
                        navigate("/");
                    }

                    //Para ir al componente funcional del inicio.
                    
                }
        } catch (error) {
            //Swal.fire("Cuenta no valida, revise sus credenciales"); 
            console.log(error); 
        }
    }

    const recoverPassword = ()=>{
        Swal.fire({
            title: "Digite su correo electronico",
            input: "text",
            inputAttributes: {
              autocapitalize: "off"
            },
            showCancelButton: true,
            confirmButtonText: "Recuperar contraseña",
            showLoaderOnConfirm: true,
            preConfirm: async (username) => {
                
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailPattern.test(username)) {
                Swal.showValidationMessage("Debe digitar un correo electrónico válido");
                return;
            }

            try {
                await sendPasswordResetEmail (auth, username)
                .then(()=>{
                  Swal.fire({
                    title: "Email enviado",
                    text: "Se ha enviado un correo para cambiar su contraseña",
                    icon: "success"
                  });
                })
                
              } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Debe digitar un correo electrónico valido",
                    icon: "error"
                  });
              }
            },
            allowOutsideClick: () => !Swal.isLoading()
          })
    }

    return (
        
              <div className="login-container">
                <div className="container-welcome">
                    <img src={logo} alt="Logo" className="logo2" />
                    <h3>Bienvenido</h3>
                    <p>Por favor inicia sesión para continuar.</p>
                </div>
    
                <div className="container-form">
                    <form onSubmit={handleSubmit}>
                        <h1 className="text-center text-xl font-bold mb-4">Login</h1>
    
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="botonini">
                            <button type="submit" className="btn">
                                Iniciar sesión
                            </button>
                        </div>
                        <div className="forgot-password text-center">
                            ¿No tenés cuenta?
                            <br />
                            <Link to="/register" className="text-500">Regístrate acá</Link>
                        </div>
                        <br />
                        <LoginGoogle />
                        <br />
                        <LoginFacebook />
                        <hr className="mt-3" />
                        <label className="mt-3">¿Olvidaste tu contraseña?</label>
                        <div>
                            <button type="button" onClick={recoverPassword} className="btn-secondary">
                                Recuperar contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }