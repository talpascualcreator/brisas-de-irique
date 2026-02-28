const words = ["CUCHARA", "TENEDOR"];
let expectedKey = null;
let aciertos = 0;
let nombreJugador = "";
let velocidad = 5000;
let timeoutID = null;

const wordDiv = document.getElementById("word");
const result = document.getElementById("result");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
const puntajeDiv = document.getElementById("puntaje");
const calificacionDiv = document.getElementById("calificacion");
const jugadorDiv = document.getElementById("jugador");

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

function nextWord() {
  result.textContent = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const palabra = words[Math.floor(Math.random() * words.length)];
  wordDiv.textContent = palabra;
  expectedKey = palabra === "CUCHARA" ? 1 : 2;

  // Dibujar la figura inmediatamente para que el usuario pueda verla
  console.log("Drawing figure for:", palabra, "type:", expectedKey);
  drawLine(expectedKey, "black");

  clearTimeout(timeoutID);
  timeoutID = setTimeout(() => {
    if (expectedKey !== null) {
      result.textContent = "¡Muy lento! Descalificado.";
      mostrarCalificacion();
    }
  }, velocidad);
}

function verificarRespuesta(num) {
  if (expectedKey === null) return;

  const correcto = num === expectedKey;
  drawLine(expectedKey, correcto ? "#00e676" : "#ff5252");

  if (correcto) {
    aciertos++;
    puntajeDiv.textContent = `Puntaje: ${aciertos}`;
    expectedKey = null;

    if (aciertos % 3 === 0 && velocidad > 2000) {
      velocidad -= 300;
    }

    result.textContent = "✅ ¡Correcto!";
    setTimeout(nextWord, 1500);
  } else {
    result.textContent = "❌ ¡Incorrecto!";
    expectedKey = null;
    mostrarCalificacion();
  }
}

function mostrarCalificacion() {
  let nota = "";

  if (aciertos >= 15) nota = "¡EXCELENTE!";
  else if (aciertos >= 10) nota = "MUY BIEN";
  else if (aciertos >= 5) nota = "REGULAR";
  else nota = "A MEJORAR";

  calificacionDiv.textContent = `Calificación: ${nota}`;

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

document.addEventListener("keydown", (e) => {
  if (expectedKey === null) return;

  if (e.key === "1" || e.key === "2") {
    verificarRespuesta(Number(e.key));
  }
});



