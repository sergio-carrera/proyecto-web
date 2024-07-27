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
import { Login } from '../components/Login';
import { Register } from '../components/Register';
import { Perfil } from '../components/Perfil';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default App;
