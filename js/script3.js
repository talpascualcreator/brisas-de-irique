let nombreJugador = "";
let puntaje = 0;
const palabras = ["AZUL", "SI", "NO"];
const coloresTexto = ["blue", "red", "green", "black"];

function iniciarJuego() {
  const nombreInput = document.getElementById("nombre");
  nombreJugador = nombreInput.value.trim();

  if (!nombreJugador) {
    alert("Por favor escribe tu nombre.");
    return;
  }

  document.getElementById("inicio").style.display = "none";
  document.getElementById("juego").style.display = "block";
  document.getElementById("jugador").innerText = `Jugador: ${nombreJugador}`;
  puntaje = 0;
  actualizarPuntaje();
  nuevaRonda();
}

function nuevaRonda() {
  const palabra = palabras[Math.floor(Math.random() * palabras.length)];
  const color = coloresTexto[Math.floor(Math.random() * coloresTexto.length)];

  const pregunta = document.getElementById("pregunta");
  pregunta.innerText = palabra;
  pregunta.style.color = color;

  pregunta.setAttribute("data-respuesta", palabra);
}

function verificar(respuesta) {
  const correcta = document.getElementById("pregunta").getAttribute("data-respuesta");

  if (respuesta === correcta) {
    puntaje++;
    document.getElementById("resultado").innerText = "¡Correcto!";
    actualizarPuntaje();

    setTimeout(() => {
      document.getElementById("resultado").innerText = "";
      nuevaRonda();
    }, 1000);
  } else {
    document.getElementById("resultado").innerText = "¡Fallaste!";
    mostrarCalificacion();
    
    setTimeout(() => {
      const deseaReiniciar = confirm("❌ Perdiste. ¿Quieres volver a jugar?");
      if (deseaReiniciar) {
        puntaje = 0;
        actualizarPuntaje();
        document.getElementById("resultado").innerText = "";
        document.getElementById("calificacion").innerText = "";
        nuevaRonda();
      } else {
        document.getElementById("resultado").innerText = "🎮 Juego terminado.";
      }
    }, 1000);
  }
}

function actualizarPuntaje() {
  document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}`;
}

function mostrarCalificacion() {
  let calif = "Sigue intentándolo";
  if (puntaje >= 15) calif = "¡Genio absoluto!";
  else if (puntaje >= 10) calif = "Muy bien!";
  else if (puntaje >= 5) calif = "Bien, pero puedes más";

  document.getElementById("calificacion").innerText = `Calificación: ${calif}`;
}

function reiniciarJuego() {
  document.getElementById("inicio").style.display = "block";
  document.getElementById("juego").style.display = "none";
  document.getElementById("nombre").value = "";
  document.getElementById("jugador").innerText = "";
  document.getElementById("puntaje").innerText = "";
  document.getElementById("resultado").innerText = "";
  document.getElementById("calificacion").innerText = "";
}