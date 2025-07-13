// Puedes agregar scripts aquí más adelante
console.log("Revista Digital - I.E. Brisas de Iriqué cargada correctamente.");

// Ejemplo: alerta al hacer clic en sección futura
document.querySelectorAll('section').forEach(sec => {
  sec.addEventListener('click', () => {
    if (!sec.querySelector('*')) {
      alert("Esta sección está en construcción.");
    }
  });
});

  document.querySelectorAll('.acordeon-titulo').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.style.display = (content.style.display === 'block') ? 'none' : 'block';
    });
  });

