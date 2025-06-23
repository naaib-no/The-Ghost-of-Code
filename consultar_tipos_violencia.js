// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
 // Menú hamburguesa
  // Selecciona el botón del menú hamburguesa y la barra lateral
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
 // Si existen ambos elementos, agrega un evento para alternar la visibilidad de la barra lateral
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }
 // Modo oscuro con texto dinámico
  // Obtiene el interruptor de modo oscuro y su etiqueta de texto
  const toggle = document.getElementById("darkModeToggle");
  const label = document.getElementById("darkModeLabel");
// Función para aplicar el modo oscuro, puede recibir un parámetro para indicar si viene de localStorage
  function aplicarModoOscuro(desdeStorage = false) {
    // Determina si el modo oscuro debe estar habilitado
    const darkMode =
      desdeStorage === true
        ? localStorage.getItem("darkMode") === "enabled"// Si viene de storage, lee el valor guardado
        : toggle.checked; // Si no, usa el estado actual del interruptor
 // Aplica o quita la clase 'dark-mode' al body según corresponda
    document.body.classList.toggle("dark-mode", darkMode);
    // Actualiza el estado del interruptor visualmente
    toggle.checked = darkMode;
    // Cambia el texto de la etiqueta según el modo
    if (label) {
      label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro";
    }
     // Guarda la preferencia en localStorage
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }

// Al cargar la página, aplica el modo oscuro según la preferencia guardada
  aplicarModoOscuro(true);

 // Si existe el interruptor, agrega un evento para cambiar el modo oscuro cuando se interactúe con él
  if (toggle) {
    toggle.addEventListener("change", () => aplicarModoOscuro());
  }
});
