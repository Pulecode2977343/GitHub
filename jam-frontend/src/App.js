import React, { useState, useEffect } from 'react';
import './App.css'; // Usamos el CSS que ya existe

function App() {
  // Estado para guardar la lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // useEffect para llamar a la API cuando el componente carga
  useEffect(() => {
    
    console.log("Iniciando llamada a la API..."); // Mensaje de depuración

    fetch('http://localhost:3000/api/usuario')
      .then(response => {
        console.log("Respuesta recibida:", response);
        return response.json();
      })
      .then(data => {
        console.log("Datos recibidos:", data);
        setUsuarios(data); // Guardamos los datos en el estado
      })
      .catch(error => {
        // Aquí es donde veremos el error de CORS
        console.error('ERROR AL LLAMAR A LA API:', error);
      });
  }, []); // El [] asegura que se ejecute solo una vez

  // Renderizado del componente
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Usuarios de J.A.M.</h1>
        
        <ul>
          {usuarios.map(usuario => (
            <li key={usuario.id_usuario}>
              {usuario.nombre} {usuario.apellido} ({usuario.correo_electronico})
            </li>
          ))}
        </ul>
        
        {/* Si la lista está vacía, mostramos un mensaje */}
        {usuarios.length === 0 && <p>Cargando usuarios o no se pudo conectar a la API...</p>}
      
      </header>
    </div>
  );
}

export default App;