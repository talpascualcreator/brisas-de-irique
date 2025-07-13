let palabras = [
  "casa", "murciélago", "computadora", "perro", "camión", "biblioteca", "flor", "universidad",
  "mesa", "canción", "pelota", "mariposa", "jirafa", "árbol", "zanahoria", "cielo", "bandera"
];

let jugador = "";
let puntaje = 0;
let velocidad = 5000;
let timeoutID = null;
let correcta = 0;

function iniciarJuego() {
  const nombreInput = document.getElementById("nombre");
  jugador = nombreInput.value.trim();

  if (!jugador) {
    alert("Por favor escribe tu nombre.");
    return;
  }

  document.getElementById("inicio").style.display = "none";
  document.getElementById("juego").style.display = "block";
  document.getElementById("jugador").innerText = `Jugador: ${jugador}`;
  puntaje = 0;
  velocidad = 5000;
  document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}`;
  document.getElementById("calificacion").innerText = "";
  nuevaRonda();
}

function nuevaRonda() {
  clearTimeout(timeoutID);
  const palabra = palabras[Math.floor(Math.random() * palabras.length)];
  const silabas = contarSilabas(palabra);

  correcta = silabas;

  document.getElementById("palabra").innerText = palabra;

  const opciones = generarOpciones(silabas);
  const botones = document.querySelectorAll(".opciones button");

  botones.forEach((btn, index) => {
    btn.innerText = opciones[index];
  });

  timeoutID = setTimeout(() => {
    perder();
  }, velocidad);
}

function verificar(btn) {
  clearTimeout(timeoutID);
  const respuesta = parseInt(btn.innerText);

  if (respuesta === correcta) {
    puntaje++;
    document.getElementById("resultado").innerText = "✅ ¡Correcto!";
    document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}`;

    if (puntaje % 3 === 0 && velocidad > 2000) {
      velocidad -= 300;
    }

    setTimeout(() => {
      document.getElementById("resultado").innerText = "";
      nuevaRonda();
    }, 1000);
  } else {
    perder();
  }
}

function perder() {
  document.getElementById("resultado").innerText = "❌ Fallaste.";
  mostrarCalificacion();

  setTimeout(() => {
    const reiniciar = confirm("¿Quieres volver a jugar?");
    if (reiniciar) {
      puntaje = 0;
      velocidad = 5000;
      document.getElementById("puntaje").innerText = `Puntaje: ${puntaje}`;
      document.getElementById("calificacion").innerText = "";
      document.getElementById("resultado").innerText = "";
      nuevaRonda();
    } else {
      document.getElementById("resultado").innerText = "🎮 Juego terminado.";
    }
  }, 1000);
}

function mostrarCalificacion() {
  let mensaje = "Sigue practicando.";
  if (puntaje >= 15) mensaje = "¡Increíble! 🎉";
  else if (puntaje >= 10) mensaje = "¡Muy bien!";
  else if (puntaje >= 5) mensaje = "Bien, vas mejorando.";

  document.getElementById("calificacion").innerText = `Calificación: ${mensaje}`;
}

function contarSilabas(palabra) {
  const vocales = "aeiouáéíóúü";
  let count = 0;
  let anteriorEsVocal = false;

  for (let letra of palabra.toLowerCase()) {
    if (vocales.includes(letra)) {
      if (!anteriorEsVocal) {
        count++;
        anteriorEsVocal = true;
      }
    } else {
      anteriorEsVocal = false;
    }
  }

  return count;
}

function generarOpciones(correcta) {
  let opciones = new Set();
  opciones.add(correcta);
  while (opciones.size < 3) {
    const variacion = correcta + (Math.floor(Math.random() * 5) - 2);
    if (variacion > 0) opciones.add(variacion);
  }
  return Array.from(opciones).sort(() => Math.random() - 0.5);
}