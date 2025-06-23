<?php
// Guardar los resultados antes de enviar HTML
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "violencia";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST["palabra"])) {
    $palabra = $conn->real_escape_string($_POST["palabra"]);
    $sql = "SELECT tipo, info FROM violencia WHERE tipo LIKE '%$palabra%'";
    $result = $conn->query($sql);
    
    $_SESSION["resultado"] = [];
    if ($result && $result->num_rows > 0) {
        while ($fila = $result->fetch_assoc()) {
            $_SESSION["resultado"][] = $fila;
        }
    } else {
        $_SESSION["mensaje"] = "No se encontraron resultados para '$palabra'.";
    }

    // Redirigir para evitar reenviar el formulario
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
  <!-- Configuración de codificación y vista responsiva -->
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Búsqueda de Tipo de Violencia</title>
     <!-- Enlace a la hoja de estilos CSS -->
     <link rel="stylesheet" href="../css/consultar_tipos_violencia.css" />
</head>
<body>
  <header>
     <!-- Logo y nombre del sitio -->
    <div class="logo">
      <img src="../imagenes/logo_cecyayuda.png" alt="Logo">
      <h1>CecyAyuda</h1>
    </div>
     <!-- Botón para mostrar/ocultar menú en dispositivos móviles -->
    <div class="menu-toggle" id="menuToggle">
      <span></span><span></span><span></span>
    </div>
     <!-- Barra lateral de navegación -->
    <nav class="sidebar" id="sidebar">
       <a href="../html/pagina principal denuncia pec.html">Página Principal</a>
       <a href="../html/podcast.html">informacion adicional</a>
       <a href="consulta_tipos_de_violencia.php">tipos de violencia</a>
      <a href="instituciones.php">Instituciones</a>
      <a href="../html/formulario_denuncia.html">Hacer Denuncia</a>
      <a href="consultar.php">Consultar Estado</a>
       <a href="../html/juego_preguntas.html">Juego de Preguntas</a>
      <a href="../html/formulario_satisfaccion.html">formulario de satisfaccion</a>
     
   
     <!-- Interruptor para modo oscuro/claro -->
    <label class="switch" style="margin-top: 30px;">
  <input type="checkbox" id="darkModeToggle">
  <span class="slider"></span>
</label>
<span id="darkModeLabel" style="display: block; margin-top: 10px; font-weight: bold; text-align: center;">
  Modo Claro
</span>
    </nav>
  </header>

  <div class="container">
    <h2>Buscar tipo de violencia</h2>
 <!-- Formulario de búsqueda -->
    <form method="POST" action="">
      <input type="text" name="palabra" placeholder="Ej: psicológica, física..." style="padding: 10px; width: 100%; max-width: 400px; margin-bottom: 20px; border-radius: 8px; border: 1px solid #ccc;">
      <br><br>
      <input type="submit" value="Buscar" style="padding: 10px 20px; background: linear-gradient(135deg, #8e44ad, #c39bd3); color: white; border: none; border-radius: 8px; cursor: pointer;">
    </form>

<?php
// Mostrar resultados si existen en sesión
if (isset($_SESSION["resultado"])) {
    echo "<table>";
    echo "<tr><th>Tipo de Violencia</th><th>Descripción</th></tr>";
    foreach ($_SESSION["resultado"] as $fila) {
        echo "<tr><td>" . htmlspecialchars($fila["tipo"]) . "</td><td>" . htmlspecialchars($fila["info"]) . "</td></tr>";
    }
    echo "</table>";
    unset($_SESSION["resultado"]); // Limpia los resultados de la sesión
} elseif (isset($_SESSION["mensaje"])) {
   // Muestra el mensaje si no hubo resultados
    echo "<p>" . htmlspecialchars($_SESSION["mensaje"]) . "</p>";
    unset($_SESSION["mensaje"]);
}
// Cierra la conexión a la base de datos
$conn->close();
?>
<!-- Enlace al archivo JavaScript para funcionalidades adicionales -->
<script src="../javascript/consultar_tipos_violencia.js"></script>
</body>
</html>
