
  document.querySelectorAll('.evento img').forEach(img => {
    img.addEventListener('click', function () {
      const evento = this.closest('.evento');

      // Cierra otros abiertos
      document.querySelectorAll('.evento').forEach(e => {
        if (e !== evento) e.classList.remove('activo');
      });

      // Alterna visibilidad del texto actual
      evento.classList.toggle('activo');
    });
  });




