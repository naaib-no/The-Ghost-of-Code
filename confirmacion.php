<?php
// Conexión a la base de datos MySQL
$conn = new mysqli("localhost", "root", "", "cecyayuda");

// Verifica si hay un error en la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtiene el valor del correo desde la URL mediante GET
$correo = $_GET['correo'] ?? '';

// Prepara la consulta SQL para seleccionar la denuncia más reciente de ese correo (insensible a mayúsculas/espacios)
$sql = "SELECT * FROM denuncias WHERE LOWER(TRIM(correo)) = ? ORDER BY fecha DESC LIMIT 1";
$correo_param = strtolower(trim($correo));
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $correo_param);

// Ejecuta la consulta
$stmt->execute();

// Obtiene el resultado
$result = $stmt->get_result();

// Extrae los datos de la fila como un array asociativo
$datos = $result->fetch_assoc();

// Si se encontraron datos, muestra la confirmación
if ($datos):
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Confirmación de Denuncia</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
   /* Importa la fuente Montserrat desde Google Fonts con pesos 400 y 600 */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

/* Estilos para el cuerpo (body) de la página */
body {
  font-family: 'Montserrat', sans-serif; /* Usa la fuente Montserrat */
  background: linear-gradient(135deg, rgb(78, 40, 141) 0%, rgb(57, 23, 130) 100%); /* Fondo degradado diagonal morado */
  display: flex; /* Usa flexbox para centrar contenido */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh; /* Altura completa de la ventana (viewport) */
  margin: 0; /* Elimina márgenes por defecto */
  animation: fadeIn 1s ease forwards; /* Aplica animación de entrada */
  color: #222; /* Color de texto base oscuro */
}

/* Define la animación de entrada llamada fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0; /* Comienza totalmente transparente */
    transform: translateY(15px); /* Inicia desplazado 15px hacia abajo */
  }
  to {
    opacity: 1; /* Termina completamente visible */
    transform: translateY(0); /* Termina en su posición original */
  }
}

/* Estilos para el contenedor principal (tipo tarjeta) */
.card {
  background: #fff; /* Fondo blanco */
  padding: 30px 40px; /* Espaciado interno (vertical 30px, horizontal 40px) */
  border-radius: 20px; /* Bordes redondeados */
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); /* Sombra profunda y difusa */
  width: 420px; /* Ancho fijo de 420px */
  max-width: 90vw; /* No exceder el 90% del ancho de la ventana */
  text-align: center; /* Centrar texto */
  user-select: none; /* Impide seleccionar texto */
}

/* Estilos para títulos <h2> */
h2 {
  color: #6a0dad; /* Color morado */
  font-weight: 700; /* Peso de fuente grueso */
  font-size: 28px; /* Tamaño grande */
  margin-bottom: 25px; /* Separación inferior */
  letter-spacing: 1.1px; /* Espaciado entre letras */
}

/* Estilos para los párrafos <p> */
p {
  font-size: 15px; /* Tamaño de texto */
  margin: 8px 0; /* Margen vertical */
  color: #444; /* Color gris oscuro */
  text-align: left; /* Alineación a la izquierda */
  line-height: 1.4; /* Altura de línea para legibilidad */
  border-bottom: 1px solid #eee; /* Línea sutil inferior */
  padding-bottom: 6px; /* Espacio debajo del texto antes de la línea */
}

/* Estilo específico para elementos <strong> dentro de <p> */
p strong {
  color: #6a0dad; /* Morado para destacar */
  text-transform: capitalize; /* Primera letra en mayúscula */
}

/* Contenedor para agrupar botones */
.btn-group {
  display: flex; /* Flexbox para alinear botones */
  justify-content: space-between; /* Espacio uniforme entre botones */
  margin-top: 30px; /* Separación superior */
  gap: 12px; /* Espacio entre botones */
  flex-wrap: wrap; /* Permite que los botones se acomoden en varias líneas si no caben */
}

/* Estilos generales para botones */
.btn {
  flex: 1 1 30%; /* Crece y se encoge, base de 30% del contenedor */
  padding: 12px 0; /* Espaciado interno vertical */
  font-weight: 600; /* Texto seminegrita */
  border-radius: 12px; /* Bordes redondeados */
  cursor: pointer; /* Cursor tipo mano al pasar el mouse */
  border: none; /* Sin borde */
  box-shadow: 0 4px 8px rgba(106, 13, 173, 0.3); /* Sombra suave en morado */
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* Animaciones suaves en hover */
  color: white; /* Texto en blanco */
  font-size: 15px; /* Tamaño de fuente */
  user-select: none; /* Evita seleccionar el texto del botón */
}

    /* Colores por tipo */
    .modificar {
      background-color: #4a148c;
    }
    .modificar:hover {
      background-color: #6a0dad;
      box-shadow: 0 6px 15px rgba(106, 13, 173, 0.6);
    }

    .borrar {
      background-color: #d32f2f;
    }
    .borrar:hover {
      background-color: #ef5350;
      box-shadow: 0 6px 15px rgba(211, 47, 47, 0.6);
    }

    .nueva {
      background-color: #2e7d32;
    }
    .nueva:hover {
      background-color: #4caf50;
      box-shadow: 0 6px 15px rgba(46, 125, 50, 0.6);
    }

    /* Modal estilos */
    .modal {
      display: none; /* Oculto por defecto */
      position: fixed;
      z-index: 9999;
      left: 0; top: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(3px);
      animation: fadeIn 0.4s ease forwards;
    }

    .modal-contenido {
      background: #fff;
      padding: 25px 30px;
      width: 95%;
      max-width: 400px;
      margin: 15% auto;
      border-radius: 15px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      animation: slideDown 0.5s ease forwards;
      user-select: text;
    }

    @keyframes slideDown {
      from { transform: translateY(-40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .modal h3 {
      color: #d32f2f;
      margin-bottom: 10px;
      font-weight: 700;
      font-size: 22px;
    }

    .modal p, .modal small {
      color: #555;
      margin-bottom: 18px;
      font-size: 14px;
      line-height: 1.4;
    }

    .modal-botones {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }

    .modal-botones button, .modal-botones form button {
      padding: 12px 20px;
      border-radius: 10px;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      border: none;
      transition: background-color 0.3s ease;
      user-select: none;
      min-width: 110px;
    }

    .cancelar {
      background-color: #6c757d;
      color: white;
    }
    .cancelar:hover {
      background-color: #5a6268;
    }

    .confirmar {
      background-color: #d32f2f;
      color: white;
    }
    .confirmar:hover {
      background-color: #ef5350;
    }

    /* Botón eliminar principal */
    .btn.eliminar {
      background-color: #d32f2f;
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.4);
    }
    .btn.eliminar:hover {
      background-color: #ef5350;
      box-shadow: 0 6px 18px rgba(239, 83, 80, 0.6);
    }
     .btn.volver {
      background-color: #6c757d;
      box-shadow: 0 4px 12px rgba(108, 117, 125, 0.4);
    }
    .btn.volver:hover {
      background-color: #5a6268;
      box-shadow: 0 6px 18px rgba(90, 98, 104, 0.6);
    }

  </style>
</head>
<body>
  <div class="card">
    <h2>Denuncia registrada</h2>
    
    <!-- Muestra cada campo y valor de la denuncia -->
    <?php foreach ($datos as $campo => $valor): ?>
      <p><strong><?= htmlspecialchars(ucfirst($campo)) ?>:</strong> <?= htmlspecialchars($valor) ?></p>
    <?php endforeach; ?>
    
    <!-- Grupo de botones -->
    <div class="btn-group">
      <!-- Botón para modificar la denuncia -->
      <button class="btn modificar" onclick="location.href='modificar.php?correo=<?= urlencode($correo) ?>'">✏️ Modificar</button>
      
      <!-- Botón para ir al formulario de una nueva denuncia -->
      <button class="btn nueva" onclick="location.href='consultar.php'">📝 Otra denuncia</button>
      
      <!-- Botón para mostrar el modal de eliminación -->
      <button class="btn eliminar" onclick="mostrarModal()">🗑️ Borrar denuncia</button>

       <!-- Botón para volver a la interfaz anterior -->
      <?php
        $referer = $_SERVER['HTTP_REFERER'] ?? '';
        $volverUrl = 'consultar.php'; // Valor por defecto
        if (strpos($referer, 'formulario_denuncia.html') !== false) {
          $volverUrl = '../html/formulario_denuncia.html';
        } elseif (strpos($referer, 'consultar.php') !== false) {
          $volverUrl = 'consultar.php';
        }
      ?>
     <button class="btn volver" onclick="location.href='<?= $volverUrl ?>'">🔙 Volver</button>


      <!-- Modal de confirmación para eliminar -->
      <div id="modalEliminar" class="modal" aria-hidden="true" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
        <div class="modal-contenido">
          <h3 id="modalTitle">¿Deseas eliminar el registro?</h3>
          <p>Una vez hecho esto no podrás recuperar los datos.</p>
          <small><strong>NOTA:</strong> Tendrás que hacer el formulario de nuevo.</small>
          
          <!-- Botones dentro del modal -->
          <div class="modal-botones">
            <!-- Botón para cancelar la acción -->
            <button onclick="cerrarModal()" class="cancelar" type="button">❌ Cancelar</button>
            <!-- Formulario para confirmar la eliminación -->
            <form action="eliminar.php" method="POST" onsubmit="return confirm('¿Estás seguro que quieres eliminar esta denuncia?');">
              <input type="hidden" name="correo" value="<?= htmlspecialchars($datos['correo']) ?>">
              <button type="submit" class="confirmar">✅ Confirmar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Script para mostrar y ocultar el modal -->
  <script>
    // Función para mostrar el modal
    function mostrarModal() {
      const modal = document.getElementById('modalEliminar');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }

    // Función para cerrar el modal
    function cerrarModal() {
      const modal = document.getElementById('modalEliminar');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }

    // Cerrar modal al hacer click fuera del contenido
    window.onclick = function(event) {
      const modal = document.getElementById('modalEliminar');
      if (event.target === modal) {
        cerrarModal();
      }
    };

    // Cerrar modal con Escape
    document.addEventListener('keydown', function(event) {
      if(event.key === "Escape") {
        cerrarModal();
      }
    });
  </script>
</body>
</html>


  <?php else: ?>
    <h2>No se encontró una denuncia con ese correo.</h2>
    <p><a href="consultar.php">Volver a consultar</a></p>
  <?php endif; ?>
</div>

<script src="https://cdn.jsdelivr.net/npm/tsparticles@3.0.3/tsparticles.bundle.min.js"></script>
 <script src="../javascript/confirmar.js"></script>

</body>
</html>

<?php
$stmt->close();
$conn->close();
?>
