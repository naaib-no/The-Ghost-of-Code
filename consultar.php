<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" /> <!-- Define la codificación de caracteres como UTF-8 -->
  <meta name="viewport" content="width=device-width, initial-scale=1" /><!-- Hace que la página sea responsive -->
  <title>Consultar Denuncia</title> <!-- Título de la pestaña del navegador -->
<link rel="stylesheet" href="../css/consultar.css" /><!-- Enlaza la hoja de estilos CSS específica para esta página -->
</head>
<body>
<canvas id="backgroundParticles"></canvas><!-- Lienzo para animaciones de fondo (partículas) -->
  <header>
    <div class="logo">
      <img src="../imagenes/logo_cecyayuda.png" alt="Logo" /> <!-- Logo de la institución o proyecto -->
      <h1>Denuncia PEC</h1> <!-- Título principal del sitio -->
    </div>
    <div class="hamburger" id="hamburgerBtn" onclick="toggleMenu(this)">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <!-- Botón tipo "hamburguesa" para mostrar/ocultar el menú lateral en dispositivos móviles -->
  </header>
  <nav class="side-menu" id="sideMenu">
    <div class="side-menu-header">
      <!-- Botón X eliminado -->
    </div>
    
    <ul>
      <li><a href="../html/pagina principal denuncia pec.html">Página Principal</a></li>
      <li><a href="../html/podcast.html">Podcast</a></li>
      <li><a href="consulta_tipos_de_violencia.php">tipos de violencia</a></li>
      <li><a href="instituciones.php">consultar instituciones</a></li>
      <li><a href="../html/formulario_denuncia.html">Hacer Denuncia</a></li>
      <li><a href="consultar.php">Consultar Estado</a></li>
      <li><a href="../html/juego_preguntas.html">Juego de Preguntas</a></li>
      <li><a href="../html/formulario_satisfaccion.html">formulario de satisfaccion</a></li>
      
      

        <!-- Switch para modo oscuro/claro -->
       <label class="switch" style="margin-top: 30px;">
  <input type="checkbox" id="darkModeToggle">
  <span class="slider"></span>
</label>
<span id="darkModeLabel" style="display: block; margin-top: 10px; font-weight: bold; text-align: center;">
  Modo Claro
</span>
    </nav>
  <div class="overlay" id="menuOverlay"></div><!-- Capa de superposición para el menú lateral -->
  <div class="consulta-container">
    <h2>🔍 Consultar Denuncia</h2><!-- Título de la sección de consulta -->
     <!-- Formulario para consultar el estado de una denuncia -->
    <form action="confirmacion.php" method="GET">
      <input type="email" name="correo" placeholder="Ingresa tu correo" required />
      <div>
        <button type="submit" class="btn consultar">📄 Consultar</button><!-- Botón para enviar el formulario -->
        <button
          type="button"
          class="btn volver"
          onclick="window.location.href='../html/pagina principal denuncia pec.html'"
        >
          🔙 Volver
        </button><!-- Botón para volver a la página de denuncia -->
      </div>
    </form>
  </div>
  <script src="../javascript/consultar.js"></script><!-- Enlace al archivo JavaScript para funcionalidades de la página -->
</body>
</html>

