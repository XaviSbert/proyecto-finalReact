import React from "react";

export default function Tutoriales(props) {
  console.log(props);
  const tutorial = props.Tutoriales;
  const { tutoriales, setTutoriales } = props;
  const resetTutoriales = () => {
    setTutoriales(null);
  };

  const eliminar = (id) => {
    fetch("http://localhost:8080/api/tutorials/" + id, {
      method: "DELETE",
    })
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        console.log(data);
        window.location.reload(false);
      });
  };

  const editar = (id) => {
    let titulo = document.querySelector("#titulo").value;
    let descripcion = document.querySelector("#descr").value;
    let publicado = document.querySelector("#publi").checked;
    console.log(titulo, descripcion, publicado);

    let expresionRegular = /^([a-z]+[0-9]{0,2}){2,30}$/;

    if (titulo.match(expresionRegular) && descripcion.match(expresionRegular)) {
      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        title: titulo,
        description: descripcion,
        published: publicado,
      });

      fetch("http://localhost:8080/api/tutorials/" + id, {
        method: "PUT",
        body: bodyContent,
        headers: headersList,
      })
        .then(function(response) {
          return response.text();
        })
        .then(function(data) {
          console.log(data);
        });
    } else {
      alert("Datos introducidos incorrectos");
    }
  };

  return (
    <div>
      <center>
        <button onClick={resetTutoriales}>Volver</button>
      </center>
      <div className="tutoriales">
        {tutoriales.map((tutorial, index) => (
          <div className="contenedor__tutoriales" key={index}>
            {/* <p>ID: {tutorial.id}</p> */}
            <p>Titulo: {tutorial.title}</p>
            <p>Descripcion: {tutorial.description}</p>
            <p>
              {tutorial.published === true ? (
                <p>✅Publicado✅</p>
              ) : (
                <p>❌Sin publicar❌</p>
              )}
            </p>
            <button className="eliminar" onClick={() => eliminar(tutorial.id)}>
              Eliminar tutorial
            </button>
            <div className="FormEditar" id="FormEditar">
              <form className="formAñadir">
                <hr />
                <h3>Modificar tutorial</h3>
                <label>Título:</label>
                <input
                  type="text"
                  name="titulo"
                  id="titulo"
                  required
                  defaultValue={tutorial.title}
                />
                <br />
                <label>Descripción:</label>
                <input
                  type="text"
                  name="descr"
                  id="descr"
                  defaultValue={tutorial.description}
                  required
                />
                <br />
                <label>Publicado:</label>
                <input type="checkbox" id="publi" />
                <br />
                <button onClick={() => editar(tutorial.id)}>Guardar</button>
              </form>
            </div>
          </div>
        ))}
      </div>
      <center>
        <button onClick={resetTutoriales}>Volver</button>
      </center>
    </div>
  );
}
