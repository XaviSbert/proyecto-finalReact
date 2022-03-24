import React from "react";

function Form() {
  function añadir() {
    let titulo = document.querySelector("#titulo").value;
    let descripcion = document.querySelector("#descr").value;

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
      });

      fetch("http://localhost:8080/api/tutorials", {
        method: "POST",
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
  }

  return (
    <>
      <form className="formAñadir">
        <br />
        <hr />
        <h3>Añadir tutorial</h3>
        <label>Título:</label>
        <input type="text" name="titulo" id="titulo" />
        <br />
        <label>Descripción:</label>
        <input type="text" name="descr" id="descr" />
        <br />
        <button onClick={añadir}>Añadir</button>
      </form>
    </>
  );
}

export default Form;
