 // Menú lateral con animación de hamburguesa a X
    function toggleMenu(button) {
       // Obtiene el menú lateral y el overlay
      const menu = document.getElementById('sideMenu'); // Menú lateral
      const overlay = document.getElementById('menuOverlay'); // Overlay que cubre el contenido
       // Cambia la clase para animar el botón y mostrar/ocultar el menú y overlay
      button.classList.toggle('active'); // Cambia el estado del botón hamburguesa
      menu.classList.toggle('open'); // Abre o cierra el menú lateral
      overlay.classList.toggle('active'); // Muestra u oculta el overlay
    }
    // Cerrar menú lateral al hacer click fuera
    document.addEventListener('click', function (event) {  // Escucha clicks en el documento
      const menu = document.getElementById('sideMenu'); // Obtiene el menú lateral
      const overlay = document.getElementById('menuOverlay'); // Obtiene el overlay
      const hamburger = document.getElementById('hamburgerBtn'); // Obtiene el botón hamburguesa
      // Si el click no es dentro del menú ni del botón hamburguesa, cierra el menú
      if (
        !menu.contains(event.target) && // Verifica si el click no es dentro del menú
        !hamburger.contains(event.target) // Verifica si el click no es dentro del botón hamburguesa
      ) {
        menu.classList.remove('open'); // Cierra el menú lateral
        overlay.classList.remove('active'); // Oculta el overlay
        hamburger.classList.remove('active'); // Desactiva el botón hamburguesa
      }
    });
    // Cerrar menú con ESC
    document.addEventListener('keydown', function (event) { // Escucha eventos de teclado
      // Si se presiona la tecla Escape, cierra el menú
      if (event.key === "Escape") { // Verifica si la tecla es Escape
        document.getElementById('sideMenu').classList.remove('open'); // Cierra el menú lateral
        document.getElementById('menuOverlay').classList.remove('active'); // Oculta el overlay
        document.getElementById('hamburgerBtn').classList.remove('active');   // Desactiva el botón hamburguesa
      }
    });
   // Al cambiar el switch, guarda la preferencia de modo oscuro
document.getElementById('darkModeToggle').addEventListener('change', function() { // Escucha el cambio del switch
  if (this.checked) { // Si el switch está activado
    // Activa modo oscuro y guarda preferencia
    document.body.classList.add('dark-mode'); // Añade clase para modo oscuro
    localStorage.setItem('darkMode', 'enabled'); // Guarda la preferencia en localStorage
  } else { // Si el switch está desactivado
     // Desactiva modo oscuro y guarda preferencia
    document.body.classList.remove('dark-mode');  // Elimina clase para modo oscuro
    localStorage.setItem('darkMode', 'disabled'); // Guarda la preferencia en localStorage
  }
});
// Al cargar la página, revisa la preferencia
window.addEventListener('DOMContentLoaded', function() { // Escucha el evento DOMContentLoaded
  const darkMode = localStorage.getItem('darkMode'); // Obtiene la preferencia guardada
  const toggle = document.getElementById('darkModeToggle'); // Obtiene el switch del modo oscuro
  if (darkMode === 'enabled') {
     // Si estaba activado, aplica modo oscuro y marca el switch
    document.body.classList.add('dark-mode'); // Añade clase para modo oscuro
    if (toggle) toggle.checked = true; // Marca el switch si existe
  } else {  // Si no estaba activado, revisa si el switch existe
    // Si no, desactiva modo oscuro y desmarca el switch 
    document.body.classList.remove('dark-mode'); // Elimina clase para modo oscuro
    if (toggle) toggle.checked = false; // Desmarca el switch si existe
  }
});
// Partículas estilo PS5
const canvas = document.getElementById('backgroundParticles'); // Obtiene el canvas para las partículas
const ctx = canvas.getContext('2d'); // Obtiene el contexto 2D del canvas
let particles = []; // Array para almacenar las partículas
// Ajusta el tamaño del canvas al tamaño de la ventana
function resizeCanvas() {   // Ajusta el tamaño del canvas al tamaño de la ventana
  canvas.width = window.innerWidth; // Ancho del canvas igual al ancho de la ventana
  canvas.height = window.innerHeight; // Alto del canvas igual al alto de la ventana
}
resizeCanvas(); // Llama a resizeCanvas al redimensionar la ventana
window.addEventListener('resize', resizeCanvas); // Escucha el evento de redimensionamiento de la ventana para ajustar el canvas
// Crea las partículas con posiciones y velocidades aleatorias
function createParticles() { // Crea partículas con posiciones y velocidades aleatorias
  particles = []; // Reinicia el array de partículas
  for (let i = 0; i < 40; i++) { // Crea 40 partículas
    particles.push({ // Añade una nueva partícula al array
      x: Math.random() * canvas.width, // posición x aleatoria
      y: Math.random() * canvas.height, // posición y aleatoria
      r: Math.random() * 2 + 1,// radio
      dx: (Math.random() - 0.5) * 0.5,// velocidad x
      dy: (Math.random() - 0.5) * 0.5, // velocidad y
      alpha: Math.random() * 0.5 + 0.5 // transparencia
    });
  }
}
createParticles(); // Llama a createParticles al cargar la página
// Dibuja y anima las partículas en el canvas
function drawParticles() { // Dibuja y anima las partículas en el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas antes de dibujar
  for (let p of particles) { // Itera sobre cada partícula
    ctx.beginPath();  // Comienza un nuevo camino para dibujar la partícula
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); // Dibuja un círculo para la partícula
    ctx.fillStyle = `rgba(30, 144, 255, ${p.alpha})`; // azul neón
    ctx.shadowColor = "#00e6ff"; // Color de la sombra
    ctx.shadowBlur = 10; // Desenfoque de la sombra
    ctx.fill(); // Rellena el círculo con el color y la transparencia
        // Actualiza posición
    p.x += p.dx; // Mueve la partícula según su velocidad
    p.y += p.dy; // Mueve la partícula según su velocidad
        // Rebota en los bordes
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1; // Si la partícula sale por los bordes izquierdo o derecho, invierte su velocidad
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1; // Si la partícula sale por los bordes superior o inferior, invierte su velocidad
  }
    // Llama de nuevo para animar
  requestAnimationFrame(drawParticles); // Llama a drawParticles de nuevo para continuar la animación
}
drawParticles(); // Llama a drawParticles al cargar la página para iniciar la animación
// Si tienes un toggle para  dark mode, asegúrate de redibujar las partículas al cambiar
document.getElementById('darkModeToggle').addEventListener('change', () => { // Escucha el cambio del switch de modo oscuro
  drawParticles(); // Redibuja las partículas al cambiar el modo oscuro
});
// Modo oscuro con texto dinámico
  const toggle = document.getElementById("darkModeToggle"); // Obtiene el switch del modo oscuro
  const label = document.getElementById("darkModeLabel"); // Obtiene el label del modo oscuro
// Aplica el modo oscuro y cambia el texto del label
  function aplicarModoOscuro(desdeStorage = false) {  // Función para aplicar el modo oscuro
    const darkMode =  // Verifica si se debe usar el valor del localStorage o el estado del toggle
      desdeStorage === true     // Si se llama desde el almacenamiento
        ? localStorage.getItem("darkMode") === "enabled" // Verifica si el modo oscuro está habilitado en localStorage
        : toggle.checked; // O usa el estado del toggle

    document.body.classList.toggle("dark-mode", darkMode); // Añade o quita la clase dark-mode al body según el estado
    toggle.checked = darkMode; // Marca el toggle según el estado del modo oscuro
    if (label) { // Si existe el label, cambia su texto
      label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro";  // Cambia el texto del label según el estado del modo oscuro
    }
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled"); // Guarda el estado del modo oscuro en localStorage
  }

// Al cargar la página, aplica el modo oscuro según preferencia guardada
  aplicarModoOscuro(true);  // Llama a la función para aplicar el modo oscuro al cargar la página

// Al cambiar el switch, aplica el modo oscuro
  if (toggle) { // Verifica si el toggle existe
    toggle.addEventListener("change", () => aplicarModoOscuro()); // Escucha el cambio del toggle y aplica el modo oscuro
  }