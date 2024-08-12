/*
Este componente funcional tiene la lógica para enrutar la aplicación y sus diversos componentes funcionales.
Para simplemente "navegar" por la aplicación mucho más sencillo se le asigna un "path" al "elemento".
El elemento sería el componente funcional referenciado.
Solo se llama al path para navegar hasta el componente referenciado.

En este caso:
 Esta línea de código: "<Route path="/" element={<Navigate to="/login" />} />" permite redirigirnos al
 componente funcional de "Login.jsx" una vez que se inicialize el componente "App.jsx" desde el "main.jsx". Y esto
 da el efecto de que sea la primera "pantalla" que el usuario vea.
*/
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../components/auth/Login';
import { Register } from '../components/auth/Register';
import { Perfil } from '../components/pages/Perfil';
import { RootLayout } from '../components/pages/RootLayout';
import { Home } from './pages/Home';
import { Explorar } from './pages/Explorar';
import { Busqueda } from './pages/Busqueda';
import { Personas } from './pages/Personas';
import { CrearPublicacion } from './pages/CrearPublicacion';
//Archivo para los estilos con TailWindCss
import "../styles/globals.css";
import Admin from './pages/Admin';
import AdminGestionUsuario from './pages/AdminGestionUsuario';
import AdminTodasPublicacion from './pages/AdminTodasPublicacion';

const App = () => {
  return (
      <Router>
      <Routes>
        {/* Rutas públicas*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas privadas*/}
        <Route path='/' element={<RootLayout/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/inicio' element={<Home/>}></Route>
          <Route path='/busqueda' element={<Busqueda/>}></Route>
          <Route path='/explorar' element={<Explorar/>}></Route>
          <Route path='/personas' element={<Personas/>}></Route>
          <Route path='/crear-publicacion' element={<CrearPublicacion/>}></Route>
          <Route path="/perfil" element={<Perfil/>} />
          <Route path="/Admin" element={<Admin></Admin>} />
          <Route path="/AdminGestionUsuario" element={<AdminGestionUsuario></AdminGestionUsuario>} />
          <Route path="/AdminTodasPublicacion" element={<AdminTodasPublicacion></AdminTodasPublicacion>} />
        </Route>

        {/* Cualquier otra ruta */}
        <Route path='*' element={<Navigate to="/login" />}></Route>
      </Routes>
    </Router>
  )
}

export default App;
