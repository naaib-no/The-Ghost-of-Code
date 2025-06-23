
const card = document.getElementById('podcastCard');  // Obtiene el elemento con id 'podcastCard'

function toggleCard() { // Alterna la visibilidad de la tarjeta del podcast
  card.classList.toggle('show');  // Alterna la clase 'show' en el elemento con id 'podcastCard'
}

/**
 * Reproduce un audio mostrando una alerta en pantalla.
 * 
 * Esta función simula la reproducción de un audio mediante una ventana de alerta
 * que notifica al usuario que el audio está siendo reproducido. No realiza la reproducción
 * real de ningún archivo de audio, solo muestra un mensaje informativo.
 *
 * @function
 * @returns {void} No retorna ningún valor.
 */
/**
 * Reproduce el audio real del podcast.
 * Busca el elemento de audio con id 'audioPodcast' y llama a su método play().
 * Esto inicia la reproducción del archivo de audio asociado al elemento.
 */
function reproducirAudioReal() { // Reproduce el audio real del podcast
    const audio = document.getElementById('audioPodcast'); // Obtiene el elemento de audio con id 'audioPodcast'
    audio.play(); // Inicia la reproducción del audio real
}

/**
 * Alterna la visibilidad y controles del reproductor de audio.
 * Si el reproductor está oculto, lo muestra, agrega los controles y comienza la reproducción.
 * Si el reproductor está visible, pausa el audio, reinicia el tiempo, lo oculta y elimina los controles.
 * Además, cambia el texto del botón según el estado del reproductor.
 */
function toggleAudioControls() { // Alterna la visibilidad y controles del reproductor de audio
    const audio = document.getElementById('audioPodcast'); // Obtiene el elemento de audio con id 'audioPodcast'
    const btn = document.getElementById('audioToggleBtn'); // Obtiene el botón que alterna el reproductor de audio
    if (audio.style.display === 'none') { // Si el reproductor está oculto
        // Muestra el reproductor, agrega controles y reproduce el audio
        audio.style.display = 'block'; // Muestra el reproductor
        audio.setAttribute('controls', 'controls');
        btn.textContent = 'Ocultar reproductor'; // Cambia el texto del botón a "Ocultar reproductor"
        audio.play(); // Comienza la reproducción del audio
    } else {   // Si el reproductor está visible
        // Pausa, reinicia, oculta el reproductor y elimina controles
        audio.pause(); // Pausa el audio
        audio.currentTime = 0; // Reinicia el tiempo del audio
        audio.style.display = 'none'; // Oculta el reproductor
        audio.removeAttribute('controls'); // Elimina los controles del reproductor
        btn.textContent = '🎧 Escuchar'; //  Cambia el texto del botón a "Escuchar"
    }
}

// Control del menú lateral (sidebar)

// Obtiene el botón que alterna el menú y el elemento del sidebar
const menuToggle = document.getElementById('menuToggle'); // Obtiene el botón que alterna el menú y el elemento del sidebar
const sidebar = document.getElementById('sidebar'); // Obtiene el elemento del sidebar

// Agrega un listener para alternar las clases 'active' en el botón y el sidebar al hacer clic
menuToggle.addEventListener('click', () => { // Agrega un listener para alternar las clases 'active' en el botón y el sidebar al hacer clic
    menuToggle.classList.toggle('active'); // Alterna la clase 'active' en el botón
    sidebar.classList.toggle('active'); // Alterna la clase 'active' en el sidebar
});

// Al cambiar el switch, guarda la preferencia
document.getElementById('darkModeToggle').addEventListener('change', function() { // Al cambiar el switch, guarda la preferencia
  if (this.checked) {
    document.body.classList.add('dark-mode'); // Si el switch se activa, activa el modo oscuro
    localStorage.setItem('darkMode', 'enabled'); // Guardamos la preferencia en localStorage
  } else { // Si el switch se desactiva, desactiva el modo oscuro
    document.body.classList.remove('dark-mode'); // Removemos la clase 'dark-mode' del body
    localStorage.setItem('darkMode', 'disabled'); // Guardamos la preferencia en localStorage
  }
});
// Al cargar la página, revisa la preferencia
window.addEventListener('DOMContentLoaded', function() { // Al cargar la página, revisa la preferencia
  const darkMode = localStorage.getItem('darkMode');  // Obtenemos la preferencia del modo oscuro del localStorage
  const toggle = document.getElementById('darkModeToggle'); // Seleccionamos el toggle del modo oscuro
  if (darkMode === 'enabled') { // Si hay preferencia y es 'enabled', activamos el modo oscuro
    document.body.classList.add('dark-mode'); // Si hay preferencia y es 'enabled', activamos el modo oscuro
    if (toggle) toggle.checked = true; // Si hay preferencia y es 'enabled', activamos el modo oscuro
  } else { // Si no hay preferencia, o es 'disabled', aseguramos que el modo oscuro no esté activo
    document.body.classList.remove('dark-mode'); // Removemos la clase 'dark-mode' del body
    if (toggle) toggle.checked = false; // Aseguramos que el toggle esté en el estado correcto
  }
}); 

// Modo oscuro con texto dinámico
  const toggle = document.getElementById("darkModeToggle"); // Seleccionamos el toggle del modo oscuro
  const label = document.getElementById("darkModeLabel"); // Seleccionamos el label del modo oscuro

  function aplicarModoOscuro(desdeStorage = false) { // Esta función aplica el modo oscuro según el estado del toggle o del localStorage
    const darkMode = // Verificamos si se debe aplicar desde el localStorage
      desdeStorage === true // Verificamos si se debe aplicar desde el localStorage
        ? localStorage.getItem("darkMode") === "enabled" // Verificamos si se debe aplicar desde el localStorage
        : toggle.checked; // Verificamos el estado del toggle o del localStorage

    document.body.classList.toggle("dark-mode", darkMode); // Aplicamos la clase 'dark-mode' al body según el estado del toggle
    toggle.checked = darkMode; // Actualizamos el estado del toggle según el modo oscuro
    if (label) { // Verificamos si el label existe
      label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro"; // Actualizamos el texto del label según el modo
    } // Actualizamos el texto del label según el modo
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled"); // Guardamos la preferencia en localStorage
  }

  // Al cargar la página
  aplicarModoOscuro(true);

  // Al cambiar el switch
  if (toggle) {
    toggle.addEventListener("change", () => aplicarModoOscuro());
  }

  /**
 * Muestra información sobre una zona del mapa sensible de la imagen.
 * Esta función se activa desde el atributo onclick de cada <area> en el mapa.
 *
 * @param {string} mensaje - El texto a mostrar en la alerta o modal.
 */
function mostrarInfoMapa(mensaje) { // Esta función muestra un mensaje de alerta con la información de la zona
  alert(mensaje); // Muestra un mensaje de alerta con la información de la zona
}

document.addEventListener('DOMContentLoaded', function () {
  const triggerBtn = document.querySelector('.trigger-btn'); // Seleccionamos el botón con la clase 'trigger-btn'

  if (triggerBtn) {
    // Agregamos la transición una sola vez
    triggerBtn.style.transition = 'transform 0.3s ease'; // Definimos la transición para la transformación

    // Al pasar el mouse, aplicamos zoom
    triggerBtn.addEventListener('mouseenter', () => {
      triggerBtn.style.transform = 'scale(1.1)'; // Aplicamos la transformación de escala
      triggerBtn.style.cursor = 'pointer'; // Cambiamos el cursor a pointer
    });

    // Al quitar el mouse, volvemos a escala normal
    triggerBtn.addEventListener('mouseleave', () => { // Volvemos a la escala normal
      triggerBtn.style.transform = 'scale(1)'; // Restablecemos la transformación
    });
  }
});

