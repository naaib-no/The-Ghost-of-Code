// Barra lateral
const menuToggle = document.getElementById('menuToggle'); // Botón para abrir/cerrar el menú lateral
const sidebar = document.getElementById('sidebar'); // Menú lateral

menuToggle.addEventListener('click', () => { // Escucha el evento click en el botón del menú
  menuToggle.classList.toggle('active'); // Cambia la clase del botón para animar el icono
  sidebar.classList.toggle('active'); // Cambia la clase del menú lateral para mostrarlo u ocultarlo
});

// Switch de modo oscuro
document.getElementById('darkModeToggle').addEventListener('change', function() { // Escucha el cambio del switch
  if (this.checked) { // Si el switch está activado
    document.body.classList.add('dark-mode'); // Añade clase para modo oscuro
    localStorage.setItem('darkMode', 'enabled'); // Guarda la preferencia en localStorage
  } else { // Si el switch está desactivado
    document.body.classList.remove('dark-mode'); // Elimina clase para modo oscuro
    localStorage.setItem('darkMode', 'disabled'); // Guarda la preferencia en localStorage
  }
});
// Al cargar el DOM, se verifica el estado del modo oscuro almacenado en localStorage.
// Si está habilitado, se añade la clase 'dark-mode' al body y se marca el switch correspondiente.
// Si está deshabilitado, se elimina la clase y se desmarca el switch.
window.addEventListener('DOMContentLoaded', function() { // Escucha el evento DOMContentLoaded
   // Obtiene el valor de 'darkMode' almacenado en localStorage
  const darkMode = localStorage.getItem('darkMode');  // Obtiene la preferencia de modo oscuro
    // Obtiene el elemento del switch de modo oscuro
  const toggle = document.getElementById('darkModeToggle'); // Obtiene el switch del modo oscuro
  // Si el modo oscuro está habilitado en localStorage
  if (darkMode === 'enabled') {   // Si el modo oscuro está habilitado
    // Añade la clase 'dark-mode' al body para activar el modo oscuro
    document.body.classList.add('dark-mode');   // Añade clase para modo oscuro
    if (toggle) toggle.checked = true; // Marca el switch si existe
  } else { // Si el modo oscuro no está habilitado
       // Elimina la clase 'dark-mode' del body para desactivar el modo oscuro
    document.body.classList.remove('dark-mode'); // Elimina clase para modo oscuro
     // Desmarca el switch (si existe)
    if (toggle) toggle.checked = false; // Desmarca el switch si existe
  }
});

// Modo oscuro con texto dinámico
  const toggle = document.getElementById("darkModeToggle"); // Switch para activar/desactivar modo oscuro
  const label = document.getElementById("darkModeLabel"); // Etiqueta para mostrar el estado del modo oscuro

  function aplicarModoOscuro(desdeStorage = false) { // Función para aplicar el modo oscuro
    const darkMode = // Verifica si se debe usar el valor del localStorage o el estado del switch
      desdeStorage === true   // Si se llama desde el almacenamiento, usa su valor
        ? localStorage.getItem("darkMode") === "enabled" // Comprueba si el modo oscuro está habilitado
        : toggle.checked; // Si no, usa el estado del switch

    document.body.classList.toggle("dark-mode", darkMode); // Añade o quita la clase dark-mode al body según el estado
    toggle.checked = darkMode;  // Actualiza el estado del switch
    if (label) { // Si existe la etiqueta, actualiza su texto
      label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro";  // Cambia el texto según el estado del modo oscuro
    } 
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled"); // Guarda la preferencia en localStorage
  }

  // Al cargar la página
  aplicarModoOscuro(true);

  // Al cambiar el switch
  if (toggle) {
    toggle.addEventListener("change", () => aplicarModoOscuro());
  }

   // Obtener el elemento del título por su ID
  const titulo = document.getElementById("tituloInstitucion");

  // Array de tres tonos de morado intensos
  const morados = ["#800080", "#9b30ff", "#9932cc"];  // Púrpura, Violeta eléctrico, Orquídea oscura

  // Índice para controlar el color actual
  let indiceColor = 0;

  // Función que cambia el color en bucle
  function animarColor() {
    // Aplicar el color actual del arreglo
    titulo.style.color = morados[indiceColor];

    // Avanzar al siguiente color (circular)
    indiceColor = (indiceColor + 1) % morados.length;

    // Esperar un tiempo antes del siguiente cambio
    setTimeout(animarColor, 700); // Cambia cada 700ms
  }

  // Iniciar la animación
  animarColor();