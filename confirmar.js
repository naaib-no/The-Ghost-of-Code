// Función para mostrar el modal de confirmación
function mostrarModal() {
  // Obtiene el elemento del modal por su ID
  const modal = document.getElementById('modalEliminar');
   // Muestra el modal estableciendo el display en 'block'
  modal.style.display = 'block';
   // Actualiza el atributo aria-hidden para accesibilidad
  modal.setAttribute('aria-hidden', 'false');
}
// Función para cerrar el modal de confirmación
function cerrarModal() {
    // Obtiene el elemento del modal por su ID
  const modal = document.getElementById('modalEliminar');
    // Oculta el modal estableciendo el display en 'none'
  modal.style.display = 'none';
    // Actualiza el atributo aria-hidden para accesibilidad
  modal.setAttribute('aria-hidden', 'true');
}
// Evento global para cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
  const modal = document.getElementById('modalEliminar');
   // Si el objetivo del clic es el modal, se cierra
  if (event.target === modal) cerrarModal();
};
// Evento para cerrar el modal al presionar la tecla Escape
document.addEventListener('keydown', function(event) {
   // Si la tecla presionada es Escape, se cierra el modal
  if (event.key === "Escape") cerrarModal();
});
// Inicializa la animación de partículas usando tsParticles
tsParticles.load("tsparticles", {
  // Desactiva el modo de pantalla completa
  fullScreen: { enable: false },
   // Establece el fondo como transparente
  background: { color: { value: "transparent" } },
  // Configuración de las partículas
  particles: {
     // Número de partículas y densidad
    number: { value: 40, density: { enable: true, area: 800 } },
     // Color de las partículas
    color: { value: "#b39ddb" },
      // Forma de las partículas
    shape: { type: "circle" },
    // Opacidad de las partículas (aleatoria)
    opacity: { value: 0.2, random: true },
     // Tamaño de las partículas (aleatorio)
    size: { value: 3, random: true },
     // Movimiento de las partículas
    move: {
      enable: true, speed: 0.8,  direction: "none", 
      random: true, straight: false,
      outModes: { default: "out" }
    }
  },
   // Configuración de la interactividad
  interactivity: {
    events: {
        // Repulsión al pasar el mouse por encima
      onHover: { enable: true, mode: "repulse" },
         // Ajuste al cambiar el tamaño de la ventana
      resize: true
    },
    modes: {
        // Configuración del modo repulse
      repulse: { distance: 70, duration: 0.4 }
    }
  },
  // Detecta pantallas retina para mejor visualización
  detectRetina: true
});
