<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "instituciones_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Crear la base de datos si no existe
$conn->query("CREATE DATABASE IF NOT EXISTS $dbname");
$conn->select_db($dbname);

// Crear tabla si no existe
$conn->query("CREATE TABLE IF NOT EXISTS instituciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    direccion TEXT NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    categoria VARCHAR(50) NOT NULL
)");

// Insertar datos solo si la tabla está vacía
$check = $conn->query("SELECT COUNT(*) as total FROM instituciones");
$count = $check->fetch_assoc()["total"];
if ($count == 0) {
    $conn->query("INSERT INTO instituciones (nombre, direccion, telefono, categoria) VALUES
        ('Centro de Atención a Víctimas', 'Calle 123, Ciudad', '555-1234', 'Gobierno'),
        ('Refugio Esperanza', 'Avenida 456, Ciudad', '555-5678', 'Refugio'),
        ('Fundación Contra la Violencia', 'Boulevard 789, Ciudad', '555-9101', 'ONG')");
}
// Procesar formulario y redirigir para evitar reenvío al refrescar
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $categoria = $_POST["categoria"];
    header("Location: instituciones.php?cat=" . urlencode($categoria));
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Instituciones Contra la Violencia</title>
      <link rel="stylesheet" href="../css/instituciones.css">
</head>
<body>
    <header>
  <div class="logo">
    <img src="../imagenes/logo_cecyayuda.png" alt="Logo">
    <h1>CecyAyuda</h1>
  </div>

  <!-- Botón hamburguesa -->
  <div class="menu-toggle" id="menuToggle">
    <span></span><span></span><span></span>
  </div>

  <!-- Menú lateral -->
  <nav class="sidebar" id="sidebar">
     <a href="../html/pagina principal denuncia pec.html">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
</svg>  Página Principal</a>
<a href="../html/Podcast.html">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
    <path d="M8 12a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3z"/>
    <path d="M5 10.5a.5.5 0 0 1 .5.5v1a2.5 2.5 0 0 0 5 0v-1a.5.5 0 0 1 1 0v1a3.5 3.5 0 0 1-7 0v-1a.5.5 0 0 1 .5-.5z"/>
    <path d="M8 15a.5.5 0 0 1-.5-.5V14h1v.5a.5.5 0 0 1-.5.5z"/>
  </svg>
  informacion adicional
</a>
<a href="../php/consulta_tipos_de_violencia.php">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
      <path d="M7.938 2.016a.13.13 0 0 1 .125 0l6.857 11.856c.028.049.043.105.043.163a.25.25 0 0 1-.25.25H1.287a.25.25 0 0 1-.25-.25.267.267 0 0 1 .043-.163L7.938 2.016zm.89 3.534a.535.535 0 0 0-1.056 0l-.35 3.5a.5.5 0 0 0 .5.55h.756a.5.5 0 0 0 .5-.55l-.35-3.5zM8 12.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
    </svg>
    Tipos de Violencia
  </a>
  <a href="../php/instituciones.php">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
      <path d="M6.5 15V1h-2v14h2zm5 0V1h-2v14h2zm-8 0V1h-2v14h2zm11 0V1h-2v14h2z"/>
      <path fill-rule="evenodd" d="M1 15.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-1h-14v1zm1-2h12v-1h-12v1zm0-2h12v-1h-12v1zm0-2h12v-1h-12v1zm0-2h12v-1h-12v1zm0-2h12v-1h-12v1z"/>
    </svg> Instituciones
      <a href="../html/formulario_denuncia.html">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16">  <!-- Icono de archivo -->
  <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>   <!-- Icono de archivo -->
</svg>  Hacer Denuncia</a>  <!-- Enlace al formulario de denuncia -->
      <a href="../php/consultar.php">  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-collection" viewBox="0 0 16 16">
  <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5z"/>
</svg>  Consultar Estado</a>
<a href="../html/juego_preguntas.html">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-controller" viewBox="0 0 16 16">
    <path d="M11.5 6a.5.5 0 0 1 .5.5V8h1.5a.5.5 0 0 1 0 1H12v1.5a.5.5 0 0 1-1 0V9H9.5a.5.5 0 0 1 0-1H11V6.5a.5.5 0 0 1 .5-.5z"/>
    <path d="M6.5 2a5.5 5.5 0 0 0-5.478 6.09A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.478-2.91A5.5 5.5 0 0 0 6.5 2zm0 1a4.5 4.5 0 0 1 4.473 5.01.5.5 0 0 0 .527.49h.5a1.5 1.5 0 0 1 1.493 1.356A1.5 1.5 0 0 1 12.5 14h-9a1.5 1.5 0 0 1-1.493-1.644A1.5 1.5 0 0 1 2.5 9.5h.5a.5.5 0 0 0 .527-.49A4.5 4.5 0 0 1 6.5 3z"/>
  </svg>
  Juego de Preguntas
</a>
  <a href="../html/formulario_satisfaccion.html">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
    <path d="M4 1.5A1.5 1.5 0 0 1 5.5 0h5A1.5 1.5 0 0 1 12 1.5V2h1.5A1.5 1.5 0 0 1 15 3.5v11A1.5 1.5 0 0 1 13.5 16h-11A1.5 1.5 0 0 1 1 14.5v-11A1.5 1.5 0 0 1 2.5 2H4v-.5zm1 0V2h6v-.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5zM2.5 3A.5.5 0 0 0 2 3.5v11a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-11a.5.5 0 0 0-.5-.5H13v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1H2.5z"/>
  </svg>
  Satisfacción
</a>


    <!-- Interruptor para cambiar entre modo claro y oscuro -->
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
      <h2 id="tituloInstitucion">Buscar Institución</h2>
        <form method="POST">
            <label for="categoria">Categoría:</label>
            <select name="categoria" id="categoria" required>
                <option value="ONG">ONG</option>
                <option value="Gobierno">Gobierno</option>
                <option value="Refugio">Refugio</option>
            </select>
            <button type="submit">Buscar</button>
            <script src="../javascript/instituciones.js"></script>
        </form>

        <?php
    // Mostrar resultados solo si hay parámetro GET
if (isset($_GET["cat"])) {
    $categoria = $_GET["cat"];
    $sql = "SELECT nombre, direccion, telefono FROM instituciones WHERE categoria = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $categoria);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<h3>Resultados:</h3><ul>";
        while ($row = $result->fetch_assoc()) {
            echo "<li><strong>" . $row["nombre"] . "</strong> - " . $row["direccion"] . " - Tel: " . $row["telefono"] . "</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>No se encontraron instituciones en esta categoría.</p>";
    }
    $stmt->close();
}
$conn->close();
?>
<?php if (isset($_GET["cat"])): ?>
<script>
  // Limpia el parámetro cat de la URL después de mostrar los resultados
  if (window.history.replaceState) {
    const url = new URL(window.location);
    url.searchParams.delete('cat');
    window.history.replaceState({}, document.title, url.pathname);
  }
</script>
<?php endif; ?>
    </div>
</body>
</html>
