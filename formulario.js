// Menú lateral igual que en la página principal
const menuToggle = document.getElementById('menuToggle'); // Botón del menú
const sidebar = document.getElementById('sidebar'); // Barra lateral

menuToggle.addEventListener('click', () => {  // Al hacer clic en el botón del menú
  menuToggle.classList.toggle('active'); // Cambia el estado del botón
  sidebar.classList.toggle('active'); // Cambia el estado de la barra lateral
});
    // Mostrar campo "otro" en género
    function mostrarCampoOtro() { // Función para mostrar/ocultar el campo "otro" en género
      const otroChecked = document.getElementById("otro").checked; // Verifica si el radio "otro" está seleccionado
      document.getElementById("genero-otro-container").style.display = otroChecked ? "block" : "none"; // Muestra el campo "otro" si está seleccionado, de lo contrario lo oculta
    }

    // Validación de formulario con alertas
    function validarFormulario(event) { // Función para validar el formulario al enviarlo
      const nombre = document.getElementById("nombre"); // Obtiene el campo de nombre
      const telefono = document.getElementById("telefono"); // Obtiene el campo de teléfono
      const correo = document.getElementById("correo"); // Obtiene el campo de correo
      const generoOtroRadio = document.getElementById("otro"); // Obtiene el radio "otro" para género
      const generoOtroInput = document.getElementById("genero_otro"); // Obtiene el campo de entrada para género "otro"
      const edad = document.getElementById("edad"); // Obtiene el campo de edad
      const direccion = document.getElementById("direccion"); // Obtiene el campo de dirección
      const nombre_agresor = document.getElementById("nombre_agresor"); // Obtiene el campo de nombre del agresor
      const lugar = document.getElementById("lugar"); // Obtiene el campo de lugar del incidente
      const relacion = document.getElementById("relacion");  // Obtiene el campo de relación con el agresor
      const fecha = document.getElementById("fecha"); // Obtiene el campo de fecha de la denuncia
      const denuncia = document.getElementById("denuncia"); // Obtiene el campo de denuncia

      // Nombre completo
      if (nombre.value.trim().split(" ").length < 2) { // Verifica si el nombre tiene al menos un nombre y un apellido
        alert("Por favor, escribe tu nombre completo (nombre y apellido)."); // Muestra una alerta si no es así
        nombre.focus(); // Enfoca el campo de nombre
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Edad válida
      if (edad.value.trim() === "" || isNaN(edad.value) || Number(edad.value) < 1) { // Verifica si la edad es un número válido y mayor que 0
        alert("Por favor, ingresa una edad válida."); // Muestra una alerta si no es así
        edad.focus(); // Enfoca el campo de edad
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }
      // Edad válida y menor o igual a 25
if (
  edad.value.trim() === "" || // Verifica si la edad está vacía
  isNaN(edad.value) || // Verifica si la edad no es un número
  Number(edad.value) < 1 || // Verifica si la edad es menor que 1
  Number(edad.value) > 25 // Verifica si la edad es mayor que 25
) {
  alert("Por favor, ingresa una edad válida (1 a 25 años)."); // Muestra una alerta si la edad no es válida
  edad.focus(); // Enfoca el campo de edad
  event.preventDefault(); // Previene el envío del formulario
  return false; // Detiene la ejecución de la función
}

      // Teléfono 10 dígitos
      if (!/^[0-9]{10}$/.test(telefono.value.trim())) { // Verifica si el teléfono tiene exactamente 10 dígitos
        alert("El número de teléfono debe tener exactamente 10 dígitos."); // Muestra una alerta si no es así
        telefono.focus(); // Enfoca el campo de teléfono
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Correo válido
      const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo electrónico
      if (!correoRegex.test(correo.value.trim())) { // Verifica si el correo cumple con el formato válido
        alert("Por favor, introduce un correo electrónico válido."); // Muestra una alerta si no es así
        correo.focus(); // Enfoca el campo de correo
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Dirección
      if (direccion.value.trim().length < 5) { // Verifica si la dirección tiene al menos 5 caracteres
        alert("Por favor, ingresa una dirección válida."); // Muestra una alerta si no es así
        direccion.focus(); // Enfoca el campo de dirección
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

        // Denuncia
      if (denuncia.value.trim().length < 10) { // Verifica si la denuncia tiene al menos 10 caracteres
        alert("Por favor, describe la denuncia (mínimo 10 caracteres)."); // Muestra una alerta si no es así
        denuncia.focus(); // Enfoca el campo de denuncia
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Validar que se seleccione un género/sexo
      const generoSeleccionado = document.querySelector('input[name="sexo"]:checked'); // Obtiene el género seleccionado
      if (!generoSeleccionado) { // Verifica si no se ha seleccionado ningún género
        alert("Por favor, selecciona tu género o sexo."); // Muestra una alerta si no se ha seleccionado
        event.preventDefault();   // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Género otro
      if (generoOtroRadio.checked) { // Verifica si el radio "otro" está seleccionado
        const genero = generoOtroInput.value.trim();  // Obtiene el valor del campo de entrada para género "otro"
        const generoRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,20}$/; // Expresión regular para validar el género (solo letras y entre 3 y 20 caracteres)
        if (!generoRegex.test(genero)) { // Verifica si el género cumple con el formato válido
          alert("Por favor, indica un género válido (solo letras y entre 3 y 20 caracteres)."); // Muestra una alerta si no es así
          generoOtroInput.focus(); // Enfoca el campo de entrada para género "otro"
          event.preventDefault(); // Previene el envío del formulario
          return false; // Detiene la ejecución de la función
        }
      }


      // Nombre del agresor
      if (nombre_agresor.value.trim().length < 3) { // Verifica si el nombre del agresor tiene al menos 3 caracteres
        alert("Por favor, ingresa el nombre del agresor.");   // Muestra una alerta si no es así
        nombre_agresor.focus(); // Enfoca el campo de nombre del agresor
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Lugar del incidente
      if (lugar.value.trim().length < 3) { // Verifica si el lugar del incidente tiene al menos 3 caracteres
        alert("Por favor, ingresa el lugar del incidente."); // Muestra una alerta si no es así
        lugar.focus(); // Enfoca el campo de lugar del incidente
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Relación
if (relacion.value === "") { // Verifica si no se ha seleccionado una relación con el agresor
  alert("Por favor, selecciona la relación con el agresor."); // Muestra una alerta si no se ha seleccionado
  relacion.focus(); // Enfoca el campo de relación con el agresor
  event.preventDefault(); // Previene el envío del formulario
  return false; // Detiene la ejecución de la función
}

// Aquí va el switch-case
switch (relacion.value) {  // Verifica el valor seleccionado en el campo de relación con el agresor
  case "Familiar": // Si la relación es "Familiar"
    alert("Has indicado que el agresor es un familiar. Recuerda que puedes solicitar apoyo psicológico.");  // Muestra una alerta con información relevante
    break; // Si la relación es "Pareja"
  case "Amigo": // Si la relación es "Amigo"
    alert("Has indicado que el agresor es un amigo. Esta información puede ser importante para tu seguridad."); // Muestra una alerta con información relevante
    break; // Si la relación es "Pareja"
  case "Desconocido": // Si la relación es "Desconocido"
    alert("Has indicado que el agresor es un desconocido. Considera incluir detalles que puedan ayudar a identificarlo."); // Muestra una alerta con información relevante
    break; // Si la relación es "Pareja"
  case "Otro": // Si la relación es "Otro"
    alert("Por favor asegúrate de describir claramente la relación con el agresor en la denuncia."); // Muestra una alerta con información relevante
    break; // Si la relación es "Pareja"
}

      // Fecha
      if (fecha.value === "") { // Verifica si no se ha seleccionado una fecha
        alert("Por favor, selecciona la fecha de la denuncia."); // Muestra una alerta si no se ha seleccionado
        fecha.focus(); // Enfoca el campo de fecha
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }
      // Validar fecha (no puede ser futura)
      const fechaSeleccionada = new Date(fecha.value); // Obtiene la fecha seleccionada del campo de fecha
      const fechaActual = new Date(); // Obtiene la fecha actual
      if (fechaSeleccionada > fechaActual) { // Verifica si la fecha seleccionada es futura
        alert("La fecha seleccionada no puede ser futura. Por favor, elige una fecha válida."); // Muestra una alerta si la fecha es futura
        fecha.focus(); // Enfoca el campo de fecha
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }


      // Denuncia
      if (denuncia.value.trim().length < 10) { // Verifica si la denuncia tiene al menos 10 caracteres
        alert("Por favor, describe la denuncia (mínimo 10 caracteres)."); // Muestra una alerta si no es así
        denuncia.focus(); // Enfoca el campo de denuncia
        event.preventDefault(); // Previene el envío del formulario
        return false; // Detiene la ejecución de la función
      }

      // Género otro
      if (generoOtroRadio.checked) { // Verifica si el radio "otro" está seleccionado
        const genero = generoOtroInput.value.trim(); // Obtiene el valor del campo de entrada para género "otro"
        const generoRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{3,20}$/;   // Expresión regular para validar el género (solo letras y entre 3 y 20 caracteres)
        if (!generoRegex.test(genero)) { // Verifica si el género cumple con el formato válido
          alert("Por favor, indica un género válido (solo letras y entre 3 y 20 caracteres)."); // Muestra una alerta si no es así
          generoOtroInput.focus(); // Enfoca el campo de entrada para género "otro"
          event.preventDefault();   // Previene el envío del formulario
          return false; // Detiene la ejecución de la función
        }
      }

      return true; // Si todas las validaciones pasan, permite el envío del formulario
    }

    // Mostrar/ocultar campo "otro" al cargar y al cambiar
    document.addEventListener('DOMContentLoaded', function () { // Al cargar el documento
      mostrarCampoOtro(); // Muestra el campo "otro" si es necesario
      document.querySelectorAll('input[name="sexo"]').forEach(radio => { // Selecciona todos los radios de género
        radio.addEventListener('change', mostrarCampoOtro); // Al cambiar cualquier radio, muestra/oculta el campo "otro"
      });
    });
  
    // Al cambiar el switch, guarda la preferencia
document.getElementById('darkModeToggle').addEventListener('change', function() { // Al cambiar el estado del switch de modo oscuro
  if (this.checked) { // Si el switch está activado
    document.body.classList.add('dark-mode'); // Añade la clase de modo oscuro al body
    localStorage.setItem('darkMode', 'enabled'); // Guarda la preferencia en localStorage
  } else { // Si el switch está desactivado
    document.body.classList.remove('dark-mode'); // Elimina la clase de modo oscuro del body
    localStorage.setItem('darkMode', 'disabled'); // Guarda la preferencia en localStorage
  }
});
// Al cargar la página, revisa la preferencia
window.addEventListener('DOMContentLoaded', function() { // Al cargar el documento
  const darkMode = localStorage.getItem('darkMode'); // Obtiene la preferencia de modo oscuro del localStorage
  const toggle = document.getElementById('darkModeToggle'); // Obtiene el elemento del switch de modo oscuro
  if (darkMode === 'enabled') { // Si el modo oscuro está habilitado en localStorage
    document.body.classList.add('dark-mode'); // Añade la clase de modo oscuro al body
    if (toggle) toggle.checked = true; // Marca el switch como activado
  } else { // Si el modo oscuro está deshabilitado en localStorage
    document.body.classList.remove('dark-mode'); // Elimina la clase de modo oscuro del body
    if (toggle) toggle.checked = false; // Desmarca el switch
  }
});

// Modo oscuro con texto dinámico
  const toggle = document.getElementById("darkModeToggle"); // Switch para modo oscuro
  const label = document.getElementById("darkModeLabel"); // Etiqueta para el modo oscuro

  function aplicarModoOscuro(desdeStorage = false) { // Función para aplicar el modo oscuro
    const darkMode = // Verifica si se debe aplicar el modo oscuro desde localStorage o desde el estado del switch
      desdeStorage === true  // Si se llama desde localStorage
        ? localStorage.getItem("darkMode") === "enabled" // Verifica si el modo oscuro está habilitado en localStorage
        : toggle.checked; // Si se llama desde el evento del switch, usa su estado

    document.body.classList.toggle("dark-mode", darkMode); // Añade o quita la clase de modo oscuro al body según el estado
    toggle.checked = darkMode; // Actualiza el estado del switch
    if (label) { // Si existe la etiqueta, actualiza su texto
      label.textContent = darkMode ? "Modo Oscuro" : "Modo Claro";  // Cambia el texto de la etiqueta según el estado del modo oscuro
    } 
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled"); // Guarda la preferencia del modo oscuro en localStorage
  }

  // Al cargar la página
  aplicarModoOscuro(true); // Llama a la función para aplicar el modo oscuro desde localStorage

  // Al cambiar el switch
  if (toggle) {   // Verifica si el switch existe
    toggle.addEventListener("change", () => aplicarModoOscuro()); // Añade un evento para aplicar el modo oscuro al cambiar el estado del switch
  }