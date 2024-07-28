/*
Este componente funcional maneja la lógica para registrar usuarios mediante "createUserWithEmailAndPassword" de
Firebase. Igualmente agrega colecciones de usuarios recién creados para poder identificarlos más adelantes mediante
el "uid" y demás datos (por ahora son: email, nombre, apellido y foto de perfil). 
*/

import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
//Instancias de autenticación y base de datos.
import { auth, db } from "./firebase";
//Para guardar datos en la base de datos (se vio en clases).
import { setDoc, doc } from "firebase/firestore";
import 'bootswatch/dist/litera/bootstrap.min.css'
import "../styles/register.css";
import { Link } from "react-router-dom";

export const Register = () => {

    //Para manejar el estado de los campos del formulario (se vio en clases).
    const [email, setEmail] = useState("");
    const [contrasenna, setContrasenna] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");

    //Función para manejar el registro de un nuevo usuario.
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            //Se utiliza esta función propia de Firebase para crear un nuevo usuario.
            await createUserWithEmailAndPassword(auth, email, contrasenna);
            //Se almacena el objeto del usuario en la constante para poder extraer la información de correo y uid más adelante.
            const user = auth.currentUser;
            //Se imprime en la consola al usuario para verificar que todo esté bien (evidentemente lo quitamos luego).
            console.log(user);
            /*
            Nos aseguramos que el usuario sea existente para poder ingresar a una colección llamada "Usuarios" al usuario.
            Este usuario será identificado con el "user.uid" que se crea automáticamente usando la función "createUserWithEmailAndPassword"
            y nos sirve para identificar al usuario registrado. Luego se almacena información obtenida de los campos del formulario y el
            correo electrónico almacenado en el objeto del usuario "user" (const user = auth.currentUser;). 
            */
            if (user) {
                await setDoc(doc(db, "Usuarios", user.uid), {
                    email: user.email,
                    nombre: nombre,
                    apellido: apellido,
                    foto: "https://firebasestorage.googleapis.com/v0/b/mochimap-proyecto.appspot.com/o/profile-circle-icon-256x256-cm91gqm2.png?alt=media&token=5b2a71ae-e78d-40c4-b2c7-0e07511ad2a3"
                });
            }
            console.log("Usuario registrado correctamente");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            <div className="register-container">
                <form onSubmit={handleRegister}>
                <h3>Registro</h3>

                <div className="input-container">
                    <label>Nombre</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre"
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    />
                </div>

                <div className="input-container">
                    <label>Apellido</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Apellido"
                    onChange={(e) => setApellido(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <label>Correo electrónico</label>
                    <input
                    type="email"
                    className="form-control"
                    placeholder="Ingresa un correo electrónico"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>

                <div className="input-container">
                    <label>Contraseña</label>
                    <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa una contraseña"
                    onChange={(e) => setContrasenna(e.target.value)}
                    required
                    />
                </div>

                <div className="btnR-container">
                    <button type="submit" className="btn btn-primary">
                    Registro
                    </button>
                </div>
                
                <p className="olvido-contrasenna mt-3">
                    ¿Ya tienes usuario? <Link to="/login">Login</Link>
                </p>
                </form>
            </div>
        </>
    )
}
