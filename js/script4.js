let jugador = "";
let puntaje = 0;
let velocidad = 1500; // milisegundos
let timeout;
const colores = ["AZUL", "ROJO", "AMARILLO", "VERDE"];

function iniciarJuego() {
  jugador = document.getElementById("nombre").value.trim();
  if (!jugador) {
    alert("Ingresa tu nombre.");
    return;
  }

  document.getElementById("inicio").style.display = "none";
  document.getElementById("juego").style.display = "block";
  document.getElementById("jugador").innerText = `Jugador: ${jugador}`;

  puntaje = 0;
  velocidad = 1500;
  actualizarDatos();
  nuevaRonda();
}

function nuevaRonda() {
  clearTimeout(timeout);
  const color = colores[Math.floor(Math.random() * colores.length)];
  document.getElementById("color-palabra").innerText = color;
  document.getElementById("color-palabra").setAttribute("data-correcto", color);
  timeout = setTimeout(() => fallar(), velocidad);
}

function verificar(seleccionado) {
  clearTimeout(timeout);
  const correcto = document.getElementById("color-palabra").getAttribute("data-correcto");
  
  if (seleccionado === correcto) {
    document.getElementById("resultado").innerText = "¡Fallaste! Diste clic al color prohibido.";
    mostrarCalificacion();
    reiniciar();
  } else {
    puntaje++;
    document.getElementById("resultado").innerText = "¡Correcto!";
    if (puntaje % 3 === 0 && velocidad > 500) velocidad -= 100; // aumenta velocidad
    actualizarDatos();
    setTimeout(() => {
      document.getElementById("resultado").innerText = "";
      nuevaRonda();
    }, 800);
  }
}

function fallar() {
  document.getElementById("resultado").innerText = "⏱ Tiempo agotado. ¡Fallaste!";
  mostrarCalificacion();
  reiniciar();
}

function actualizarDatos() {
  document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}`;
  document.getElementById("velocidad").innerText = `Velocidad: ${(velocidad / 1000).toFixed(1)}s`;
}

function mostrarCalificacion() {
  let mensaje = "Sigue intentándolo.";
  if (puntaje >= 15) mensaje = "¡Impresionante! 🎉";
  else if (puntaje >= 10) mensaje = "¡Muy bien!";
  else if (puntaje >= 5) mensaje = "Vas bien 👍";
  document.getElementById("calificacion").innerText = `Calificación: ${mensaje}`;
}

function reiniciar() {
    clearTimeout(timeout);
  
    setTimeout(() => {
      const deseaReiniciar = confirm("😓 Perdiste. ¿Deseas volver a comenzar?");
      if (deseaReiniciar) {
        puntaje = 0;
        velocidad = 1500;
        actualizarDatos();
        document.getElementById("resultado").innerText = "";
        document.getElementById("calificacion").innerText = "";
        nuevaRonda();
      } else {
        document.getElementById("resultado").innerText = "🎮 Juego terminado.";
      }
    }, 1000);
  }