<?php
// Datos de conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "";
$db = "cecyayuda";

// Crear conexión
$conn = new mysqli($host, $user, $password, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener datos del formulario usando el método POST
$respeto = $_POST['respeto'] ?? '';
$ayuda = $_POST['ayuda'] ?? '';
$escuchada = $_POST['escuchada'] ?? '';
$recomendaria = $_POST['recomendaria'] ?? '';
$calificacion = $_POST['calificacion'] ?? '';
$comentarios = $_POST['comentarios'] ?? '';

// Preparar la consulta SQL para insertar los datos en la tabla 'satisfaccion'
$sql = "INSERT INTO satisfaccion (respeto, ayuda, escuchada, recomendaria, calificacion, comentarios)
                VALUES (?, ?, ?, ?, ?, ?)";

// Preparar la sentencia
$stmt = $conn->prepare($sql);

// Vincular los parámetros a la sentencia preparada
$stmt->bind_param("ssssss", $respeto, $ayuda, $escuchada, $recomendaria, $calificacion, $comentarios);

if ($stmt->execute()) {
  // Interfaz de agradecimiento con palomita animada y botones
  echo '
  <!DOCTYPE html>
  <html lang="es">
<head>
    <meta charset="UTF-8">
    <title>¡Gracias por tu opinión!</title>
    <!-- Enlace a la hoja de estilos externa -->
    <link rel="stylesheet" href="../css/formulario_satisfaccion.css">
    <style>
        /* Estilos generales para el fondo y el body */
        body {
            background: linear-gradient(135deg, #a4508b 0%, #5f0a87 40%, #7a56a2 70%, #774d9c 100%);
            min-height: 100vh;
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        /* Contenedor principal del mensaje de agradecimiento */
        .gracias-container {
            max-width: 400px;
            margin: 40px auto;
            background: #fff;
            border-radius: 16px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            padding: 2.5em 2em 2em 2em;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: fadeIn 1s;
        }
        /* Animación de aparición */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px);}
            to { opacity: 1; transform: translateY(0);}
        }
        /* Estilos para el ícono de palomita */
        .checkmark {
            width: 80px;
            height: 80px;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .checkmark__circle {
            stroke: #7a5cf5;
            stroke-width: 6;
            fill: none;
            animation: circle 0.6s ease-in-out;
        }
        .checkmark__check {
            stroke: #7a5cf5;
            stroke-width: 6;
            fill: none;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: check 0.4s 0.6s forwards;
        }
        /* Animación para el círculo de la palomita */
        @keyframes circle {
            0% { stroke-dasharray: 0 251.2; }
            100% { stroke-dasharray: 251.2 0; }
        }
        /* Animación para la palomita */
        @keyframes check {
            to { stroke-dashoffset: 0; }
        }
        /* Estilos para el título */
        .gracias-container h2 {
            color: #7a5cf5;
            margin-bottom: 10px;
        }
        /* Estilos para el texto pequeño */
        .gracias-container small {
            color: #888;
            display: block;
            margin-top: 18px;
            font-size: 0.95em;
        }
        /* Contenedor de los botones */
        .gracias-botones {
            margin-top: 28px;
            display: flex;
            gap: 12px;
            justify-content: center;
            width: 100%;
        }
        /* Quitar subrayado a los enlaces */
        .gracias-botones a {
            text-decoration: none;
        }
        /* Estilos para los botones */
        .gracias-botones button {
            background-color: #7a5cf5;
            color: #fff;
            border: none;
            border-radius: 10px;
            padding: 10px 18px;
            font-size: 1em;
            cursor: pointer;
            transition: background 0.3s;
        }
        /* Efecto hover en los botones */
        .gracias-botones button:hover {
            background-color: #5b3ec5;
        }

        /* --- Responsive Design para móviles: formulario_satisfaccion.php (agradecimiento) --- */
@media (max-width: 600px) {
  /* El body ocupa todo el alto y elimina márgenes */
  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-size: 1.05rem; /* Texto más legible en móvil */
  }

  /* Contenedor principal ocupa casi todo el ancho y menos padding */
  .gracias-container {
    max-width: 96vw;         /* Casi todo el ancho de la pantalla */
    margin: 24px auto;       /* Menos margen arriba/abajo */
    padding: 1.5em 0.5em 1em 0.5em; /* Menos padding */
    border-radius: 10px;     /* Bordes ligeramente más pequeños */
  }

  /* Ícono de palomita más pequeño y centrado */
  .checkmark {
    width: 60px;
    height: 60px;
    margin-bottom: 12px;
  }
  .checkmark svg {
    width: 60px;
    height: 60px;
  }

  /* Título más pequeño y menos margen */
  .gracias-container h2 {
    font-size: 1.15rem;
    margin-bottom: 8px;
  }

  /* Texto pequeño más compacto */
  .gracias-container small {
    font-size: 0.95em;
    margin-top: 12px;
  }

  /* Botones apilados en columna y ocupan todo el ancho */
  .gracias-botones {
    flex-direction: column;
    gap: 10px;
    margin-top: 18px;
    width: 100%;
  }
  .gracias-botones button {
    width: 100%;
    font-size: 1rem;
    padding: 14px 0;
    border-radius: 10px;
  }
}
    </style>
</head>
 <meta charset="UTF-8" /><!-- Establece la codificación de caracteres a UTF-8 -->
  <meta name="viewport" content="width=device-width, initial-scale=1" /><!-- Hace que la página sea responsive -->
  <body>
    <div class="gracias-container">
      <div class="checkmark">
        <svg width="80" height="80">
          <circle class="checkmark__circle" cx="40" cy="40" r="36"/>
          <polyline class="checkmark__check" points="25,43 38,56 56,30"/>
        </svg>
      </div>
      <h2>¡Muchas gracias por tu opinión!</h2>
      <small>Nos ayudas a mejorar nuestra página, mejorar el ambiente y darle buen servicio al cliente.</small>
      <div class="gracias-botones">
        <a href="../html/formulario_satisfaccion.html"><button>Volver a dar reseña</button></a>
        <a href="../html/pagina principal denuncia pec.html"><button>Ir a página principal</button></a>
      </div>
    </div>
  </body>
  </html>
  ';
} else {
  echo "Error al guardar los datos.";
}

$stmt->close();
$conn->close();
?>