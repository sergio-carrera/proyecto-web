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
import { Notificaciones } from './pages/Notificaciones';
import { CrearPublicacion } from './pages/CrearPublicacion';
//Archivo para los estilos con TailWindCss
import "../styles/globals.css";
import {Admin} from '../components/pagesAdmin/Admin';
import {AdminGestionUsuario} from '../components/pagesAdmin/AdminGestionUsuario';
import {AdminTodasPublicacion} from '../components/pagesAdmin/AdminTodasPublicacion';
import {AdminReportes} from '../components/pagesAdmin/AdminReportes';
import { RootLayoutAdmin } from '../components/pagesAdmin/RootLayoutAdmin';
import { AdminUsuarioPublicaciones } from './pagesAdmin/AdminUsuarioPublicaciones';
import AdminReporteUsuario from './pagesAdmin/AdminReporteUsuario';

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
          <Route path='/notificaciones' element={<Notificaciones/>}></Route>
          <Route path='/crear-publicacion' element={<CrearPublicacion/>}></Route>
          <Route path="/perfil/:idUsuarioE" element={<Perfil />} />
        </Route>

        {/* Rutas privadas para administradores */}
        <Route path='/admin/' element={<RootLayoutAdmin/>}>
          <Route index element={<Admin/>}></Route>
          <Route path="/admin/AdminGestionUsuario" element={<AdminGestionUsuario/>} />
          <Route path="/admin/AdminTodasPublicacion" element={<AdminTodasPublicacion/>} />
          <Route path="/admin/AdminReportes" element={<AdminReportes/>} />
          <Route path="/admin/AdminUsuarioPublicaciones/:id" element={<AdminUsuarioPublicaciones/>} />
          <Route path="/admin/AdminReporteUsuario" element={<AdminReporteUsuario/>} />
        </Route>

        {/* Cualquier otra ruta */}
        <Route path='*' element={<Navigate to="/login" />}></Route>

      </Routes>
    </Router>
  )
}

export default App;
