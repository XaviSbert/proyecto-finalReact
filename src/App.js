import logo from './logo.svg';
import React from 'react';
import './App.css';
import { useState } from "react";
import Tutoriales from "./components/tutoriales";
import Form from "./components/añadir";

function App() {
  const [tutoriales, setTutoriales] = useState(null);
  
  const reqApi = async () => {

    let publicado = document.querySelector('#publi').checked;
    if (publicado == true) {
      const api = await fetch("http://localhost:8080/api/tutorials/published");
      const tutoApi = await api.json();
      console.log(tutoApi);
      setTutoriales(tutoApi);
    }else{
      const api = await fetch("http://localhost:8080/api/tutorials");
      const tutoApi = await api.json();
      console.log(tutoApi);
      setTutoriales(tutoApi);
    }
        // console.log(api);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Tutoriales</h1>
        {tutoriales ? (
          <Tutoriales tutoriales={tutoriales} setTutoriales={setTutoriales}/>
           ) : (
            <>
            <button onClick={reqApi}>Buscar tuoriales</button>
            <br></br>
            <span>Publicado: </span>
            <input type="checkbox" id="publi"/>
            <Form></Form>
            </>
        )}
      </header>
    </div>
  );
}

export default App;
