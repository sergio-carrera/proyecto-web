/*
Este componente funcional maneja la lógica para registrar usuarios mediante "createUserWithEmailAndPassword" de
Firebase. Igualmente agrega colecciones de usuarios recién creados para poder identificarlos más adelantes mediante
el "uid" y demás datos (por ahora son: email, nombre, apellido y foto de perfil). 
*/

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
//Instancias de autenticación y base de datos.
import { auth, db } from "../../config/firebase";
//Para guardar datos en la base de datos (se vio en clases).
import { setDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../../styles/register.css";
import Swal from "sweetalert2";

export const Register = () => {

    //Para manejar el estado de los campos del formulario (se vio en clases).
    const [email, setEmail] = useState("");
    const [contrasenna, setContrasenna] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [estado] = useState("Activo");

    const navigate = useNavigate();

    const navigateToLogin =() =>{
        navigate('/Login')
    }

    //Función para manejar el registro de un nuevo usuario.
    const handleRegister = async (e) => {
        e.preventDefault();
        // Validar que los campos no estén en blanco
        if (!email || !contrasenna || !nombre || !apellido) {
            Swal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error"
            });
            return; // Detener la ejecución si hay campos vacíos
        }
        try {
            //Se utiliza esta función propia de Firebase para crear un nuevo usuario.
            await createUserWithEmailAndPassword(auth, email, contrasenna);
            //Se almacena el objeto del usuario en la constante para poder extraer la información de correo y uid más adelante.
            const user = auth.currentUser;
            /*
            Nos aseguramos que el usuario sea existente para poder ingresar a una colección llamada "Usuarios" al usuario.
            Este usuario será identificado con el "user.uid" que se crea automáticamente usando la función "createUserWithEmailAndPassword"
            y nos sirve para identificar al usuario registrado. Luego se almacena información obtenida de los campos del formulario y el
            correo electrónico almacenado en el objeto del usuario "user" (const user = auth.currentUser;). 
            */
            if (user) {
                await setDoc(doc(db, "Usuarios", user.uid), {
                    idUsuario: user.uid,
                    email: user.email,
                    nombre: nombre,
                    apellido: apellido,
                    foto: "https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/profile-circle-icon-256x256-cm91gqm2.png?alt=media&token=5b2a71ae-e78d-40c4-b2c7-0e07511ad2a3",
                    biografia: "",
                    estado: estado,
                    privacidad: "publica"
                });
            }

            Swal.fire({
                title: "Exito",
                text: "Usuario registrado correctamente, proceda a loguearse",
                icon: "success"
              });
              navigateToLogin();
        } catch (error) {
            Swal.fire("El correo electrónico ya está en uso")
            setEmail("");
            setContrasenna("");
            setNombre("");
            setApellido("");
        }
    };

    return (
        <div className="container2">
            <div className="container-form2">
                <form onSubmit={handleRegister}>
                    <h2>Registro</h2>
                    <div className="container-input">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>
                    <div className="container-input2">
                        <input
                            type="text"
                            placeholder="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className="container-input2">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="container-input2">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={contrasenna}
                            onChange={(e) => setContrasenna(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="button2">
                        Registro
                    </button>
                    <div className="forgot-password text-center2">
                        ¿Tienes una cuenta?
                        <br />
                        <Link to="/login" className="text-blue-500">Inicia sesión</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
