/*
Acá estoy usando las funcionalidades de "Authentication" y "Firestore Database" que brinda Firebase.
*/
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyyK3p9wP83jfxys-VuA0Sxzs2bpbkoqg",
  authDomain: "mochimap-proyectoqa.firebaseapp.com",
  projectId: "mochimap-proyectoqa",
  storageBucket: "mochimap-proyectoqa.appspot.com",
  messagingSenderId: "246109666847",
  appId: "1:246109666847:web:016d0833784e581a97df2a"
};

/*
Con esta constante se inicializa la "aplicación" Firebase con la configuración proporcionada anteriormente 
en el objeto "firebaseConfig".
*/
const app = initializeApp(firebaseConfig);

/*
Se obtiene la instancia del servicio de autenticación de Firebase y se exporta para poder usar esta funcionalidad 
en todos los componentes funcionales respectivos. (con esto podemos contrastar si un usuario está registrado,
logueado, cuál es el id del usuario, etc.).
*/
export const auth = getAuth();

/*
Se obtiene la instancia del servicio de almacenamiento de Firebase y se exporta para poder usar esta funcionalidad 
en todos los componentes funcionales respectivos. (con esto podemos subir, descargar y gestionar archivos).
*/
export const storage = getStorage(app);

/*
Se exporta la base de datos como hemos visto en clase, para poder realizar CRUD con la base de datos.
*/
export const db = getFirestore(app);
 
//Se exporta la "aplicación" Firebase.
export default app;