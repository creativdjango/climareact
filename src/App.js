import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';

function App() {

  // state principal
  // ciudad = state, guardarCiudad = this.setState
  const [ ciudad, guardarCiudad ] = useState('');
  const [ pais, guardarPais ] = useState('');
  const [ error, guardarError ] = useState(false);
  const [ resultado, guardarResultado ] = useState({})

  useEffect(() => {

    // prevenir ejecucion
    if(ciudad === '') return;

    const consultatAPI = async ()=> {

      const appId = '2903a5899ed071dbccabdb04623ad19a';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
      
      // consultar la url
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarResultado(resultado)
      
    }

    consultatAPI();
  }, [ ciudad, pais ])

  const datosConsulta = datos => {
  //  validad que ambos datos esten
    if(datos.ciudad === '' || datos.pais === '') {
      // un error
      guardarError(true);
      return;
    }
    // ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }
  
  // cargar un componente condicionalmente
  let componente;
  if(error){
    // hay un error mostrarlo
    componente = <Error mensaje='Ambos campos son Obligatorios'/>
  } else if (resultado.cod === "404") {
    componente = <Error mensaje="La ciudad indicadda no existe en nuestros registros de la aplicacion" />
  } else {
    // mostrar el clima
    componente = <Clima 
                    resultado={resultado}
                  />;
  }

  return (
    <div class="App">
      <Header
      titulo="React Temperatura app"
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario 
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
