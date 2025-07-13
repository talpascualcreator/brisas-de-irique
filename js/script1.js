const words = ["CUCHARA", "TENEDOR"];
let expectedKey = null;
let aciertos = 0;
let nombreJugador = "";
let velocidad = 5000; // tiempo inicial para responder (ms)
let timeoutID = null;

const wordDiv = document.getElementById("word");
const result = document.getElementById("result");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const puntajeDiv = document.getElementById("puntaje");
const calificacionDiv = document.getElementById("calificacion");
const jugadorDiv = document.getElementById("jugador");

// Comienza el juego después de ingresar nombre
function iniciarJuego() {
  const input = document.getElementById("nombre");
  nombreJugador = input.value.trim();

  if (nombreJugador === "") {
    alert("Por favor ingresa tu nombre.");
    return;
  }

  document.getElementById("inicio").style.display = "none";
  document.getElementById("juego").style.display = "block";
  jugadorDiv.textContent = `Jugador: ${nombreJugador}`;

  aciertos = 0;
  velocidad = 5000;
  puntajeDiv.textContent = "Puntaje: 0";
  calificacionDiv.textContent = "";

  nextWord();
}

// Dibuja línea
function drawLine(type, color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.beginPath();
  if (type === 1) {
    ctx.moveTo(200, 50);
    ctx.lineTo(200, 150);
  } else {
    ctx.moveTo(150, 100);
    ctx.lineTo(250, 100);
  }
  ctx.stroke();
}

// Nueva ronda
function nextWord() {
  result.textContent = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const palabra = words[Math.floor(Math.random() * words.length)];
  wordDiv.textContent = palabra;
  expectedKey = palabra === "CUCHARA" ? "1" : "2";

  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    if (expectedKey) {
      result.textContent = "¡Muy lento! Descalificado.";
      mostrarCalificacion();
    }
  }, velocidad);
}

// Reinicio tras error
function reiniciarJuego() {
  setTimeout(() => {
    aciertos = 0;
    velocidad = 5000;
    puntajeDiv.textContent = "Puntaje: 0";
    calificacionDiv.textContent = "";
    nextWord();
  }, 3000);
}

function mostrarCalificacion() {
  let nota = "";

  if (aciertos >= 15) nota = "¡EXCELENTE!";
  else if (aciertos >= 10) nota = "MUY BIEN";
  else if (aciertos >= 5) nota = "REGULAR";
  else nota = "A MEJORAR";

  calificacionDiv.textContent = `Calificación: ${nota}`;

  // Pregunta si desea jugar de nuevo
  setTimeout(() => {
    const deseaReiniciar = confirm("❌ Perdiste. ¿Quieres comenzar de nuevo?");
    if (deseaReiniciar) {
      aciertos = 0;
      velocidad = 5000;
      puntajeDiv.textContent = "Puntaje: 0";
      calificacionDiv.textContent = "";
      nextWord();
    } else {
      result.textContent = "🎮 Juego terminado.";
    }
  }, 1000);
}

// Capturar teclado
document.addEventListener("keydown", (e) => {
  if (!expectedKey) return;

  if (e.key === "1" || e.key === "2") {
    const correcto = e.key === expectedKey;
    drawLine(parseInt(e.key), correcto ? "green" : "red");

    if (correcto) {
      aciertos++;
      puntajeDiv.textContent = `Puntaje: ${aciertos}`;
      expectedKey = null;

      // Disminuir tiempo si va acertando
      if (aciertos % 3 === 0 && velocidad > 2000) {
        velocidad -= 300; // se vuelve más rápido
      }

      result.textContent = "¡Correcto!";
      setTimeout(nextWord, 1500);
    } else {
      result.textContent = "¡Descalificado!";
      expectedKey = null;
      mostrarCalificacion();
    }
  }
});