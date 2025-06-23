function updateScore() { // Actualiza el puntaje en la interfaz y verifica si es un nuevo récord
  const scoreEl = document.getElementById('score'); // Obtiene el elemento del puntaje actual
  const highscoreEl = document.getElementById('highscore'); // Obtiene el elemento del récord

  scoreEl.textContent = score; // Actualiza el texto del puntaje actual
  animarPuntajeJS(scoreEl, true); // animación verde porque es correcto

  if (score > highscore) { // Si el puntaje actual es mayor que el récord
    highscore = score; // Actualiza el récord con el puntaje actual
    highscoreEl.textContent = highscore; // Actualiza el texto del récord
    animarPuntajeJS(highscoreEl, true); // animación verde para nuevo récord
  }
}
// Array de objetos que contiene las imágenes y si representan violencia de género
const images = [ // Array de imágenes con sus rutas y si representan violencia de género
  { src: "../imagenes/violencia_genero.jpg", isViolence: true }, // Imagen que representa violencia de género
  { src: "../imagenes/violencia_genero2.jpg", isViolence: true }, //imagen que representa violencia de género
   { src: "../imagenes/violencia_genero3.jpg", isViolence: true }, //imagen que representa violencia de género
  { src: "../imagenes/No_violencia_genero.jpg", isViolence: false }, // Imagen que no representa violencia de género
  { src: "../imagenes/No_violencia_genero2.jpg", isViolence: false }, // Imagen que no representa violencia de género
    { src: "../imagenes/No_violencia_genero3.jpg", isViolence: false }, // Imagen que no representa violencia de género
  // Agrega más imágenes según tu carpeta /img
];

// Variables para el índice actual, puntaje y récord
let currentIndex = 0;   // Índice de la imagen actual
let score = 0; // Puntaje del jugador
let highscore = localStorage.getItem('highscore') || 0; // Récord guardado en localStorage, o 0 si no existe

// Muestra el récord guardado en localStorage
document.getElementById('highscore').textContent = highscore;   // Muestra el récord en el elemento con id 'highscore'

// Inicia el juego: reinicia puntaje, índice y mezcla las imágenes
function startGame() { // Reinicia el juego
  score = 0; // Reinicia el puntaje a 0
  currentIndex = 0; // Reinicia el índice a 0
  shuffle(images); // Mezcla las imágenes para que aparezcan en orden aleatorio
  document.getElementById('score').textContent = score; // Muestra el puntaje inicial en el elemento con id 'score'
  loadImage(); // Carga la primera imagen
}

// Carga la imagen actual o termina el juego si no hay más
function loadImage() { // Carga la imagen actual en el elemento con id 'image'
  if (currentIndex < images.length) { // Verifica si hay más imágenes para mostrar
    const img = document.getElementById('image'); // Obtiene el elemento de imagen
    img.src = images[currentIndex].src; // Establece la fuente de la imagen al src de la imagen actual
  } else { // Si no hay más imágenes, termina el juego
    alert("Juego terminado. Tu puntaje: " + score); // Muestra una alerta con el puntaje final
    // Actualiza el récord si el puntaje es mayor
    if (score > highscore) { // Verifica si el puntaje actual es mayor que el récord
      highscore = score; // Actualiza el récord con el puntaje actual
      localStorage.setItem('highscore', highscore); // Guarda el nuevo récord en localStorage
      document.getElementById('highscore').textContent = highscore; // Actualiza el elemento con id 'highscore' para mostrar el nuevo récord
    }
  }
}

// Verifica la respuesta del usuario y actualiza el puntaje
function checkAnswer(userAnswer) { // Verifica si la respuesta del usuario es correcta
  if (currentIndex >= images.length) return; // Si ya no hay más imágenes, no hace nada

  const currentImage = images[currentIndex]; // Obtiene la imagen actual del array
 if (userAnswer === currentImage.isViolence) {
  score++;
  updateScore(); // Actualiza el puntaje y muestra la animación de puntaje correcto
  animarPuntajeJS(document.getElementById('score'), true); // Animación de puntaje correcto
} else { // Si la respuesta del usuario es incorrecta
  animarPuntajeJS(document.getElementById('score'), false);  // Animación de puntaje incorrecto
} // Verifica si la respuesta del usuario es correcta comparando con isViolence

  currentIndex++; // Incrementa el índice para pasar a la siguiente imagen
  loadImage(); // Carga la siguiente imagen
}

// Mezcla aleatoriamente el array de imágenes (Fisher-Yates)
function shuffle(array) { // Función para mezclar el array de imágenes usando el algoritmo Fisher-Yates
  for (let i = array.length - 1; i > 0; i--) { // Itera desde el último elemento hasta el segundo
    const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio entre 0 y i
    [array[i], array[j]] = [array[j], array[i]]; // Intercambia los elementos en las posiciones i y j
  }
}

// Control del menú lateral (sidebar)
const menuToggle = document.getElementById('menuToggle'); // Botón para abrir/cerrar el menú lateral
const sidebar = document.getElementById('sidebar'); // Menú lateral

menuToggle.addEventListener('click', () => { // Escucha el evento click en el botón del menú
  menuToggle.classList.toggle('active'); // Cambia la clase del botón para animar el icono
  sidebar.classList.toggle('active'); // Cambia la clase del menú lateral para mostrarlo u ocultarlo
});

// Al cambiar el switch de modo oscuro, guarda la preferencia
document.getElementById('darkModeToggle').addEventListener('change', function() { // Escucha el cambio del switch
  if (this.checked) { // Si el switch está activado
    document.body.classList.add('dark-mode'); // Añade clase para modo oscuro
    localStorage.setItem('darkMode', 'enabled'); // Guarda la preferencia en localStorage
  } else { // Si el switch está desactivado
    document.body.classList.remove('dark-mode'); // Elimina clase para modo oscuro
    localStorage.setItem('darkMode', 'disabled'); // Guarda la preferencia en localStorage
  }
});

// Al cargar la página, revisa la preferencia de modo oscuro
window.addEventListener('DOMContentLoaded', function() { // Escucha el evento DOMContentLoaded
  const darkMode = localStorage.getItem('darkMode'); // Obtiene la preferencia guardada en localStorage
  const toggle = document.getElementById('darkModeToggle'); // Obtiene el switch del modo oscuro
  if (darkMode === 'enabled') { // Si estaba activado, aplica modo oscuro y marca el switch
    document.body.classList.add('dark-mode'); // Añade clase para modo oscuro
    if (toggle) toggle.checked = true; // Marca el switch si existe
  } else { // Si no estaba activado, revisa si el switch existe
    document.body.classList.remove('dark-mode'); // Elimina clase para modo oscuro
    if (toggle) toggle.checked = false; // Desmarca el switch si existe
  }
});

// Modo oscuro con texto dinámico en el label
const toggle = document.getElementById("darkModeToggle"); // Switch para activar/desactivar modo oscuro
const label = document.getElementById("darkModeLabel");   // Etiqueta para mostrar el estado del modo oscuro

// Aplica el modo oscuro y actualiza el texto del label
function aplicarModoOscuro(desdeStorage = false) { // Función para aplicar el modo oscuro
  const darkMode = // Verifica si se debe usar el valor del localStorage o el estado del switch
    desdeStorage === true // Si se llama desde el almacenamiento, usa su valor
      ? localStorage.getItem("darkMode") === "enabled" // Comprueba si el modo oscuro está habilitado
      : toggle.checked; // Si no, usa el estado del switch

  document.body.classList.toggle("dark-mode", darkMode); // Añade o quita la clase dark-mode al body según el estado
  toggle.checked = darkMode; // Actualiza el estado del switch
  if (label) { // Si existe la etiqueta, actualiza su texto
    label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro"; // Cambia el texto según el estado del modo oscuro
  }
  localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled"); // Guarda la preferencia en localStorage
}

// Al cargar la página, aplica el modo oscuro según la preferencia guardada
aplicarModoOscuro(true);  // Llama a la función para aplicar el modo oscuro al cargar la página

// Al cambiar el switch, aplica el modo oscuro dinámicamente
if (toggle) { // Verifica si el switch existe antes de añadir el evento
  toggle.addEventListener("change", () => aplicarModoOscuro()); // Escucha el cambio del switch y aplica el modo oscuro
}


function animarPuntajeJS(element, esCorrecto) { // Función para animar el puntaje con un efecto de escala y color
  let start = null; // Variable para almacenar el tiempo de inicio de la animación
  const duracion = 600; // duración en ms
  const escalaInicial = 1; // Escala inicial del elemento
  const escalaMaxima = 1.6;   // Escala máxima del elemento al animar

  function animar(timestamp) { // Función interna para manejar la animación
    if (!start) start = timestamp; // Si es el primer frame, guarda el tiempo de inicio
    const progreso = (timestamp - start) / duracion; // Calcula el progreso de la animación como un valor entre 0 y 1

    if (progreso < 1) { // Si el progreso es menor a 1, continúa animando
      const escala = escalaInicial + Math.sin(progreso * Math.PI) * (escalaMaxima - escalaInicial); // Calcula la escala del elemento usando una función seno para un efecto de rebote

      // Cambia color a verde o rojo dependiendo si es correcto o no
      const intensidad = Math.floor(255 * Math.sin(progreso * Math.PI)); // Calcula la intensidad del color entre 0 y 255 usando una función seno
      let color;  // Variable para almacenar el color final del texto
      if (esCorrecto) { // Si la respuesta es correcta, el color será verde
        // Verde: rgb(0, intensidad, 0)
        color = `rgb(0, ${intensidad}, 0)`;     // Color verde para respuestas correctas
      } else { // Si la respuesta es incorrecta, el color será rojo
        // Rojo: rgb(intensidad, 0, 0)
        color = `rgb(${intensidad}, 0, 0)`; // Color rojo para respuestas incorrectas
      }

      const rotacion = Math.sin(progreso * Math.PI * 4) * 15; // Calcula la rotación del elemento usando una función seno para un efecto de oscilación

      element.style.transform = `scale(${escala}) rotate(${rotacion}deg)`; // Aplica la transformación de escala y rotación al elemento
      element.style.color = color;  // Aplica el color calculado al texto del elemento

      requestAnimationFrame(animar); // Llama a la función de animación en el siguiente frame
    } else {
      element.style.transform = 'scale(1) rotate(0deg)'; // Resetea la transformación al estado original
      element.style.color = ''; // reset color a original
    }
  }

  requestAnimationFrame(animar); // Inicia la animación llamando a requestAnimationFrame
}
