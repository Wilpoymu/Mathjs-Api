window.addEventListener("load", () => {
  const form = document.querySelector("#form");
  const nombres = document.getElementById("nombres");
  const apellidos = document.getElementById("apellidos");
  const email = document.getElementById("email");
  const telefono = document.getElementById("tel");
  const parrafo = document.getElementById("warnings");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let warnings = [];
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    let entrar = false;
    if (
      nombres.value.length < 3 ||
      nombres.value[0] !== nombres.value[0].toUpperCase()
    ) {
      warnings.push(
        "El nombre debe comenzar con una letra mayúscula y tener al menos 3 caracteres"
      );
      entrar = true;
    }
    if (
      apellidos.value.length < 3 ||
      apellidos.value[0] !== apellidos.value[0].toUpperCase()
    ) {
      warnings.push(
        "El apellido debe comenzar con una letra mayúscula y tener al menos 3 caracteres"
      );
      entrar = true;
    }
    if (!regexEmail.test(email.value)) {
      warnings.push("El email no es válido");
      entrar = true;
    }
    if (telefono.value.length < 10 || telefono.value[0] !== "3") {
      warnings.push(
        "El teléfono debe comenzar con el número 3 y tener al menos 10 caracteres"
      );
      entrar = true;
    }
    if (entrar) {
      parrafo.innerHTML = warnings.join("<br>");
    } else {
      const operacion = document.getElementById("operacion");
      const resultado = document.getElementById("resultado");
      const submit = document.getElementById("submit");
      submit.addEventListener("click", () => {
        let operacionUTF8 = encodeURIComponent(operacion.value);
        fetch(`http://api.mathjs.org/v4/?expr=${operacionUTF8}`)
          .then((response) => response.json())
          .then((data) => {
            resultado.innerHTML = "Resultado = " + data;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  });
});
