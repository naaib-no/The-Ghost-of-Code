document.getElementById('form-container').addEventListener('submit', function(e) {  // Escucha el evento submit del formulario
  const campos = [ // Define los campos a validar
    { name: 'respeto', mensaje: 'Por favor, indique si fue atendida con respeto.' },  // Mensaje para el campo respeto
    { name: 'ayuda', mensaje: 'Por favor, indique si recibió la ayuda necesaria.' }, // Mensaje para el campo ayuda
    { name: 'escuchada', mensaje: 'Por favor, indique si se sintió escuchada y comprendida.' }, //Mensaje para el campo escuchado
    { name: 'recomendaria', mensaje: 'Por favor, indique si recomendaría nuestra página.' }, // Mensaje para el campo recomendaría
    { name: 'calificacion', mensaje: 'Por favor, califique su experiencia.' } // Mensaje para el campo calificación
  ];

  for (let campo of campos) { // Itera sobre cada campo a validar
    const valor = this.elements[campo.name].value; // Obtiene el valor del campo actual
    if (!valor) { // Si el valor del campo está vacío
      alert(campo.mensaje); // Muestra un mensaje de alerta con el mensaje correspondiente
      this.elements[campo.name].focus(); // Enfoca el campo para que el usuario lo complete
      e.preventDefault(); // Previene el envío del formulario
      return false; // Sale de la función para evitar el envío del formulario
    }
  }
});

// Control del menú lateral (sidebar)
const menuToggle = document.getElementById('menuToggle'); // Botón para abrir/cerrar el menú lateral
const sidebar = document.getElementById('sidebar'); // Menú lateral

menuToggle.addEventListener('click', () => {  // Escucha el evento click en el botón del menú
  menuToggle.classList.toggle('active'); // Cambia la clase del botón para animar el icono
  sidebar.classList.toggle('active'); // Cambia la clase del menú lateral para mostrarlo u ocultarlo
}); 

// Al cambiar el switch, guarda la preferencia
document.getElementById('darkModeToggle').addEventListener('change', function() { // Escucha el cambio del switch
  if (this.checked) { // Si el switch está activado
    document.body.classList.add('dark-mode'); // Añade clase para modo oscuro
    localStorage.setItem('darkMode', 'enabled'); // Guarda la preferencia en localStorage
  } else { // Si el switch está desactivado
    document.body.classList.remove('dark-mode'); // Elimina clase para modo oscuro
    localStorage.setItem('darkMode', 'disabled'); // Guarda la preferencia en localStorage
  }
});
// Al cargar la página, revisa la preferencia
window.addEventListener('DOMContentLoaded', function() { // Escucha el evento DOMContentLoaded
  const darkMode = localStorage.getItem('darkMode'); // Obtiene la preferencia guardada
  const toggle = document.getElementById('darkModeToggle'); // Obtiene el switch del modo oscuro
  if (darkMode === 'enabled') { // Si estaba activado, aplica modo oscuro y marca el switch
    document.body.classList.add('dark-mode'); // Añade clase para modo oscuro
    if (toggle) toggle.checked = true;  // Marca el switch si existe
  } else { // Si no estaba activado, revisa si el switch existe
    document.body.classList.remove('dark-mode'); // Elimina clase para modo oscuro
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
    toggle.checked = darkMode; // Actualiza el estado del switch
    if (label) { // Si existe la etiqueta, actualiza su texto
      label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro"; // Cambia el texto según el estado del modo oscuro
    }
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled"); // Guarda la preferencia en localStorage
  }

  // Al cargar la página
  aplicarModoOscuro(true); 

  // Al cambiar el switch
  if (toggle) {
    toggle.addEventListener("change", () => aplicarModoOscuro());
  }
