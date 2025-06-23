// Función para mostrar el modal de información
let modalCurrentPage = 1; // Página actual del modal
const modalTotalPages = 3; // Total de páginas del modal

/**
 * Muestra la página indicada del modal y actualiza los indicadores y botones de navegación.
 * @param {number} page - Número de página a mostrar.
 */
function showModalPageImproved(page) {
  modalCurrentPage = page; // Actualiza la página actual
  // Oculta todas las páginas y muestra solo la actual
  for (let i = 1; i <= modalTotalPages; i++) {
    document.getElementById('modalPage' + i).style.display = (i === page) ? 'block' : 'none';
  }
  // Actualiza los indicadores y botones de navegación
  for (let i = 1; i <= modalTotalPages; i++) {
    const indicator = document.getElementById('modalPageIndicator' + i);
    if (indicator) indicator.textContent = `<${i}/${modalTotalPages}>`; // Muestra el número de página
    const prevBtn = document.getElementById('prevPageBtn' + i);
    const nextBtn = document.getElementById('nextPageBtn' + i);
    if (prevBtn) prevBtn.disabled = (i === 1); // Deshabilita el botón anterior en la primera página
    if (nextBtn) nextBtn.disabled = (i === modalTotalPages); // Deshabilita el botón siguiente en la última página
  }
}

// Asigna eventos a los botones de navegación del modal
for (let i = 1; i <= modalTotalPages; i++) {
  const nextBtn = document.getElementById('nextPageBtn' + i);
  const prevBtn = document.getElementById('prevPageBtn' + i);
  if (nextBtn) nextBtn.onclick = () => showModalPageImproved(i + 1); // Botón siguiente
  if (prevBtn) prevBtn.onclick = () => showModalPageImproved(i - 1); // Botón anterior
}

// Al abrir el modal, siempre muestra la página 1
document.querySelector('button[onclick*="infoModal"]').onclick = function() {
  document.getElementById('infoModal').style.display = 'block'; // Muestra el modal
  showModalPageImproved(1); // Muestra la primera página
};



// Inicializa el fondo animado de partículas usando particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 60 }, // Número de partículas
    size: { value: 2.5 }, // Tamaño de las partículas
    color: { value: ["#ffffff", "#f4e9ff", "#d5b8ff"] }, // Colores de las partículas
    opacity: { value: 0.15 }, // Opacidad de las partículas
    move: { enable: true, speed: 0.7 }, // Movimiento de las partículas
    line_linked: {
      enable: true, // Habilita líneas entre partículas
      distance: 120, // Distancia máxima para enlazar partículas
      color: "#ffffff", // Color de las líneas
      opacity: 0.1, // Opacidad de las líneas
      width: 1 // Ancho de las líneas
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }, // Repulsión al pasar el mouse
      onclick: { enable: true, mode: "push" } // Añade partículas al hacer clic
    }
  }
});

/**
 * Cierra el modal de información.
 */
function closeModal() {
  document.getElementById('infoModal').style.display = 'none'; // Oculta el modal
}
// Permite cerrar el modal haciendo clic fuera de él
    // Permite cerrar el modal haciendo clic fuera de él
    window.onclick = function(event) {
      const modal = document.getElementById('infoModal'); // Obtiene el modal
      if (event.target === modal) { // Si el clic fue fuera del contenido (en el fondo del modal)
      closeModal(); // Cierra el modal
      }
    }

    // Control del menú lateral (sidebar)
    const menuToggle = document.getElementById('menuToggle'); // Botón para abrir/cerrar el menú
    const sidebar = document.getElementById('sidebar'); // Elemento del menú lateral

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active'); // Cambia el estado visual del botón
      sidebar.classList.toggle('active'); // Muestra u oculta el menú lateral
    });

    /* Chatbot: funciones para mostrar, enviar mensajes y responder */

    /**
     * Muestra u oculta el chatbot.
     */
    function toggleChatbot() {
      const chat = document.getElementById('chatbot'); // Obtiene el contenedor del chatbot
      // Alterna entre mostrar y ocultar el chatbot
      chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
    }

    /**
     * Maneja el envío de mensajes al presionar Enter.
     */
    // Maneja el envío de mensajes al presionar Enter
function handleChat(event) {
  if (event.key === 'Enter') {
    enviarMensajeChat();
  }
}

// Maneja el envío de mensajes al hacer clic en el botón "Enviar"
function enviarMensajeChat() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  respondToMessage(message.toLowerCase());
  input.value = '';   
}


    

    /**
     * Agrega un mensaje al chat.
     * @param {string} type - 'user' o 'bot'
     * @param {string} text - Texto del mensaje
     */
    function appendMessage(type, text) {
      const msg = document.createElement('div'); // Crea un nuevo div para el mensaje
      msg.className = type === 'user' ? 'user-msg' : 'bot-msg'; // Asigna clase según el tipo
      msg.innerText = text; // Asigna el texto del mensaje
      document.getElementById('chat-messages').appendChild(msg); // Agrega el mensaje al chat
      document.getElementById('chat-messages').scrollTop = 9999; // Desplaza el chat hacia abajo
    }
/**
 * Responde automáticamente a los mensajes del usuario según palabras clave.- Mensaje del usuario.
 */
// Función que responde automáticamente a los mensajes del usuario según palabras clave
function respondToMessage(msg) {
  // Respuesta por defecto si no se reconoce la palabra clave
  let response = "Lo siento, no entendí eso. ¿Puedes reformularlo?";
  // Respuestas automáticas según palabras clave detectadas en el mensaje
  if (msg.includes("denuncia")) 
    response = "Para presentar una denuncia, dirígete a la sección principal y haz clic en el botón 'Denunciar' para acceder al formulario en denuncia_pec.html.";
  else if (msg.includes("psicológica")) 
    response = "La violencia psicológica puede incluir manipulación, amenazas, humillaciones o aislamiento. Si necesitas ayuda, puedes denunciarlo desde la página principal.";
  else if (msg.includes("sexual")) 
    response = "La violencia sexual es cualquier acto realizado sin consentimiento. Puedes encontrar recursos y denunciar en la sección principal.";
  else if (msg.includes("violencia de genero")) 
    response = "La violencia de género es un tipo de agresión física o psicológica ejercida contra cualquier persona o grupo de personas basada en su orientación o identidad sexual, sexo o género.";
  else if (msg.includes("económica")) 
    response = "La violencia económica implica controlar o limitar tus recursos financieros. Si sufres este tipo de violencia, puedes buscar orientación y denunciar en la página principal.";
  else if (msg.includes("física")) 
    response = "La violencia física incluye golpes, empujones o cualquier daño corporal. Recuerda que puedes denunciar de forma segura desde la sección principal.";
  else if (msg.includes("laboral")) 
    response = "La violencia laboral es la discriminación o acoso en el trabajo por razones de género. Puedes informarte y denunciar en la página principal.";
  else if (msg.includes("ayuda") || msg.includes("hola")) 
    response = "¡Hola! 👋 Estoy aquí para orientarte sobre los tipos de violencia y cómo puedes denunciar. Escribe palabras clave como 'denuncia', 'información', o el tipo de violencia para obtener ayuda.";
  else if (msg.includes("gracias")) 
    response = "¡De nada! Si tienes más preguntas sobre denuncias o tipos de violencia, aquí estoy para ayudarte.";
  else if (msg.includes("adiós") || msg.includes("chao")) 
    response = "¡Hasta luego! Recuerda que puedes volver cuando lo necesites.";
  else if (msg.includes("información")) 
    response = "Puedes encontrar más información sobre los tipos de violencia y cómo denunciar en la página principal o en denuncia_pec.html.";
  else if (msg.includes("contacto")) 
    response = "Para contactar con profesionales o recibir atención, revisa la sección de contacto en la página principal.";
  else if (msg.includes("proceso")) 
    response = "El proceso de denuncia es sencillo: accede a denuncia_pec.html desde la página principal, completa el formulario y sigue las instrucciones.";
  else if (msg.includes("privacidad")) 
    response = "Tu denuncia es confidencial y tus datos serán protegidos según nuestra política de privacidad.";
  else if (msg.includes("recursos")) 
    response = "En la página principal encontrarás recursos útiles, guías y contactos de ayuda.";
  else if (msg.includes("tipos de violencia")) 
    response = "Los tipos de violencia incluyen: psicológica, sexual, económica, física y laboral. Si necesitas más información sobre alguno, da click en ver mas de la pagina, para mas informacion";
  else if (msg.includes("ver más")) 
    response = "Puedes ver más información sobre los tipos de violencia y cómo denunciarlos en la sección principal de la página.";
  else if (msg.includes("niko")) 
    response = "is that niko from OneShot?";
  else if (msg.includes("gojo")) 
    response = "gomei amanai";
  else if (msg.includes("toji")) 
    response = "hey tu, brazo de 35cm";
  else if (msg.includes("geto")) 
    response = "eres satoru gojo por ser el mas fuerte o eres el mas fuerte por ser satoru gojo?";
  // Espera medio segundo antes de mostrar la respuesta del bot para simular "pensar"
  setTimeout(() => appendMessage('bot', response), 500); // Muestra la respuesta del bot después de medio segundo
}

async function mostrarMapaLeaflet() { // Esta función muestra un mapa Leaflet centrado en la ubicación del usuario y busca centros de ayuda cercanos
  const mapaDiv = document.getElementById("mapa-ayuda"); // Obtiene el div del mapa Leaflet

  mapaDiv.style.display = "block"; // Muestra el div del mapa Leaflet

  // ✅ Este bloque debe estar dentro de esta función
  if (mapaDiv.dataset.mapaCargado === "true") { // Si el mapa ya está inicializado, no volver a cargarlo
    return; // Sale si ya se cargó el mapa antes
  }

  // Si el mapa ya está inicializado, no volver a cargarlo
  if (mapaDiv.dataset.mapaCargado === "true") {   // Si el mapa ya está inicializado, no volver a cargarlo
    return; // Sale si ya se cargó el mapa antes
  }

  // Verifica si el navegador soporta geolocalización
  if (!navigator.geolocation) { // Verifica si el navegador soporta geolocalización
    mapaDiv.innerHTML = "Tu navegador no soporta geolocalización."; // Muestra mensaje si no hay soporte
    return; // Sale si no hay soporte
  }

  // Muestra mensaje de carga mientras se obtiene la ubicación
  mapaDiv.innerHTML = "Cargando mapa...";   // Muestra mensaje de carga mientras se obtiene la ubicación

  // Obtiene la ubicación actual del usuario
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude; // Latitud del usuario
    const lng = pos.coords.longitude; // Longitud del usuario

    // Agrega botón para cerrar el mapa y el contenedor del mapa Leaflet
    mapaDiv.innerHTML = `
      <button id="cerrar-mapa-btn" style="position:absolute;top:10px;right:10px;z-index:1001;">Cerrar mapa</button>
      <div id="contenedor-mapa-leaflet" style="width:100%;height:300px;"></div>  
    `;

    // Inicializa el mapa centrado en la ubicación del usuario
    const mapa = L.map('contenedor-mapa-leaflet').setView([lat, lng], 14); // Crea un mapa centrado en la ubicación del usuario con zoom 14

    // Añade la capa de OpenStreetMap al mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // URL de la capa de OpenStreetMap
      attribution: '© OpenStreetMap contributors' // Atribución a OpenStreetMap
    }).addTo(mapa);   // Añade la capa de OpenStreetMap al mapa

    // Añade un marcador en la ubicación del usuario con un popup
    L.marker([lat, lng]).addTo(mapa) // Crea un marcador en la ubicación del usuario
      .bindPopup("¡Estás aquí!").openPopup(); // Muestra un popup con la ubicación del usuario

    // Buscar centros de ayuda cercanos usando Nominatim (OpenStreetMap)
    let centros = []; // Inicializa un array para almacenar los centros encontrados
    try { // Intenta obtener los centros de ayuda cercanos
     const resp = await fetch('../php/buscar_centros.php?lat=' + lat + '&lng=' + lng); // Realiza una solicitud a buscar_centros.php con la latitud y longitud del usuario
  
  if (!resp.ok) { // Verifica si la respuesta fue exitosa
    throw new Error('No se pudo conectar con buscar_centros.php (status ' + resp.status + ')');   // Maneja errores de conexión o respuesta
  }

  const centros = await resp.json(); // Convierte la respuesta JSON a un objeto JavaScript
  console.log("Centros encontrados:", centros); // Muestra los centros encontrados en la consola
} catch (e) { // Maneja errores de conexión o respuesta
  console.error("Error al obtener centros:", e);  // Maneja errores de conexión o respuesta
}

    // Función para calcular la distancia entre dos coordenadas (en km)
    function distancia(lat1, lng1, lat2, lng2) {
      const R = 6371; // Radio de la Tierra en km
      const dLat = (lat2-lat1)*Math.PI/180; // Diferencia de latitud en radianes
      const dLng = (lng2-lng1)*Math.PI/180; // Diferencia de longitud en radianes
      const a = Math.sin(dLat/2)*Math.sin(dLat/2) + // Fórmula de Haversine (parte 1)
      Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180) * // Conversión a radianes y cálculo
      Math.sin(dLng/2)*Math.sin(dLng/2); // Fórmula de Haversine (parte 2)
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); // Distancia final en km
    }

    // Filtra los centros que están a menos de 5km del usuario
    const cercanos = centros.filter(c => 
      distancia(lat, lng, parseFloat(c.lat), parseFloat(c.lon)) <= 5
    );

    if (cercanos.length > 0) {
      // Si hay centros cercanos, los muestra en el mapa con marcadores
      cercanos.forEach(c => {
      L.marker([c.lat, c.lon]) // Crea un marcador en la ubicación del centro
        .addTo(mapa) // Lo añade al mapa
        .bindPopup(`<strong>${c.display_name}</strong>`); // Muestra el nombre del centro
      });
    } else if (centros.length > 0) {
      // Si no hay en 5km, muestra los 3 más cercanos encontrados
      centros.slice(0, 3).forEach(c => {
      L.marker([c.lat, c.lon]) // Crea un marcador para cada centro
        .addTo(mapa) // Lo añade al mapa
        .bindPopup(`<strong>${c.display_name}</strong>`); // Muestra el nombre del centro
      });
      L.popup()
      .setLatLng([lat, lng]) // Ubica el popup en la posición del usuario
      .setContent("No hay centros de ayuda muy cercanos, pero aquí tienes los más próximos encontrados.") // Mensaje informativo
      .openOn(mapa); // Abre el popup en el mapa
    } else {
      // Si no se encontraron centros, muestra un mensaje
      L.popup()
      .setLatLng([lat, lng]) // Ubica el popup en la posición del usuario
      .setContent("Lo sentimos, no tienes un centro de ayuda cercano.") // Mensaje de error
      .openOn(mapa); // Abre el popup en el mapa
    }

    mapaDiv.dataset.mapaCargado = "true"; // Marca que el mapa ya fue cargado

    // Evento para cerrar el mapa al hacer clic en el botón "Cerrar mapa"
    document.getElementById('cerrar-mapa-btn').onclick = function() {
      mapaDiv.style.display = "none"; // Oculta el div del mapa
    };
    }, () => {
    // Si falla la obtención de la ubicación, muestra un mensaje de error
    mapaDiv.innerHTML = "No se pudo obtener tu ubicación.";   // Si falla la obtención de la ubicación, muestra un mensaje de error
    });
   };
// Al cambiar el switch, guarda la preferencia
document.getElementById('darkModeToggle').addEventListener('change', function () { // Al cambiar el switch, guarda la preferencia
  if (this.checked) { // Si el switch se activa, activa el modo oscuro
    document.body.classList.add('dark-mode');   // Si el switch se activa, activa el modo oscuro
    localStorage.setItem('darkMode', 'enabled'); // Guarda la preferencia en localStorage
  } else { // Si el switch se desactiva, desactiva el modo oscuro
    document.body.classList.remove('dark-mode'); // Remueve la clase 'dark-mode' del body
    localStorage.setItem('darkMode', 'disabled'); // Guarda la preferencia en localStorage
  }
});
// Al cargar la página, revisa la preferencia
window.addEventListener('DOMContentLoaded', function () { // Al cargar la página, revisa la preferencia
  const darkMode = localStorage.getItem('darkMode'); // Obtiene la preferencia del modo oscuro desde localStorage
  const toggle = document.getElementById('darkModeToggle'); // Selecciona el toggle del modo oscuro
  if (darkMode === 'enabled') { // Si hay preferencia y es 'enabled', activa el modo oscuro
    document.body.classList.add('dark-mode');   // Si hay preferencia y es 'enabled', activa el modo oscuro
    if (toggle) toggle.checked = true; // Si hay preferencia y es 'enabled', activa el modo oscuro
  } else { // Si no hay preferencia o es 'disabled', desactiva el modo oscuro
    document.body.classList.remove('dark-mode'); // Remueve la clase 'dark-mode' del body
    if (toggle) toggle.checked = false;   // Asegura que el toggle esté en el estado correcto
  }
});


// Modo oscuro con texto dinámico
const toggle = document.getElementById("darkModeToggle"); // Selecciona el toggle del modo oscuro
const label = document.getElementById("darkModeLabel"); // Selecciona el label del modo oscuro
/**
 * Aplica el modo oscuro o claro y actualiza el texto del label.
 * @param {boolean} desdeStorage - Si es true, lee el estado desde localStorage.
 */
function aplicarModoOscuro(desdeStorage = false) { // Esta función aplica el modo oscuro según el estado del toggle o del localStorage
  const darkMode = desdeStorage ? localStorage.getItem("darkMode") === "enabled" : toggle.checked; // Verifica si se debe aplicar desde el localStorage o el estado del toggle

  document.body.classList.toggle("dark-mode", darkMode); // Aplica la clase 'dark-mode' al body según el estado del toggle
  toggle.checked = darkMode; // Actualiza el estado del toggle según el modo oscuro
  if (label) {  // Verifica si el label existe
    label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro"; // Actualiza el texto del label según el modo
  }
  localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled"); // Guarda la preferencia en localStorage
}

aplicarModoOscuro(true); // Al cargar la página, aplica el modo oscuro si es necesario

if (toggle) {   // Verifica si el toggle existe
  toggle.addEventListener("change", () => aplicarModoOscuro()); // Al cambiar el switch, aplica el modo oscuro
}

// Función que hace una animación de zoom cuando se hace clic
function animarZoom(elemento) {
  elemento.style.transform = "scale(1.05)"; // Aumenta tamaño
  elemento.style.transition = "transform 0.3s ease"; // Transición suave

  // Después de 300ms, vuelve al tamaño normal
  setTimeout(() => {
    elemento.style.transform = "scale(1)";
  }, 300);
}

