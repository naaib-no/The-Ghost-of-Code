<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "cecyayuda");
if ($conexion->connect_error) {
  die("Conexión fallida: " . $conexion->connect_error);
}

// Procesar el formulario cuando se envía (POST)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $correo = $_POST['correo'];
  $nombre = $_POST['nombre'];
  $edad = $_POST['edad'];
  $sexo = $_POST['sexo'];
  $telefono = $_POST['telefono'];
  $direccion = $_POST['direccion'];
  $lugar = $_POST['lugar'];
  $relacion = $_POST['relacion'];
  $fecha = $_POST['fecha'];
  $denuncia = $_POST['denuncia'];

  // Preparar y ejecutar la actualización
  $stmt = $conexion->prepare("UPDATE denuncias SET nombre=?, edad=?, sexo=?, telefono=?, direccion=?, lugar_incidente=?, relacion_agresor=?, fecha=?, denuncia=? WHERE correo=?");
  $stmt->bind_param("sissssssss", $nombre, $edad, $sexo, $telefono, $direccion, $lugar, $relacion, $fecha, $denuncia, $correo);

  if ($stmt->execute()) {
    // Redirigir a confirmacion.php con el correo después de actualizar
    echo "<script>
            alert('Denuncia actualizada correctamente');
            window.location.href='confirmacion.php?correo=" . urlencode($correo) . "';
          </script>";
    exit;
  } else {
    echo "Error al actualizar: " . $stmt->error;
  }
  $stmt->close();
}

// Obtener correo para cargar datos (GET)
$correo = $_GET['correo'] ?? null;
if (!$correo) {
  echo "Correo no proporcionado.";
  exit;
}

// Obtener datos para mostrar en el formulario
$stmt = $conexion->prepare("SELECT * FROM denuncias WHERE correo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
  echo "No se encontró ninguna denuncia con ese correo.";
  exit;
}

$datos = $resultado->fetch_assoc();
$stmt->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Modificar Denuncia</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="../css/modificar.css" />
</head>
<body>
  <div class="form-container">
    <h2>Modificar Denuncia</h2>
        <!-- 
      Formulario para modificar una denuncia existente.
      Los campos se llenan automáticamente con los datos actuales de la denuncia.
      Al enviar, los datos se actualizan en la base de datos.
    -->
    <form action="modificar.php" method="POST" novalidate>
      <input type="hidden" name="correo" value="<?php echo htmlspecialchars($datos['correo']); ?>">
  <!-- Campo oculto: correo (identificador único de la denuncia) -->
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" value="<?php echo htmlspecialchars($datos['nombre']); ?>" required>
  <!-- Campo de texto: Nombre del denunciante -->
      <label for="edad">Edad:</label>
      <input type="number" id="edad" name="edad" value="<?php echo htmlspecialchars($datos['edad']); ?>" min="1" required>
   <!-- Campo numérico: Edad del denunciante -->
      <label>Sexo:</label>
      <div class="radio-group">
        <label><input type="radio" name="sexo" value="Masculino" <?php if ($datos['sexo'] === 'Masculino') echo 'checked'; ?>> Masculino</label>
        <label><input type="radio" name="sexo" value="Femenino" <?php if ($datos['sexo'] === 'Femenino') echo 'checked'; ?>> Femenino</label>
        <label><input type="radio" name="sexo" value="Otro" <?php if ($datos['sexo'] === 'Otro') echo 'checked'; ?>> Otro</label>
      </div>
 <!-- Grupo de radios: Sexo del denunciante -->
      <label for="telefono">Teléfono:</label>
      <input type="tel" id="telefono" name="telefono" value="<?php echo htmlspecialchars($datos['telefono']); ?>" pattern="[0-9]{10}" required placeholder="Ejemplo: 1234567890">
<!-- Campo de teléfono: Teléfono de contacto -->
      <label for="direccion">Dirección:</label>
      <input type="text" id="direccion" name="direccion" value="<?php echo htmlspecialchars($datos['direccion']); ?>" required>
 <!-- Campo de texto: Dirección del denunciante -->
      <label for="lugar">Lugar del incidente:</label>
      <input type="text" id="lugar" name="lugar" value="<?php echo htmlspecialchars($datos['lugar_incidente']); ?>" required>
 <!-- Campo de texto: Lugar donde ocurrió el incidente -->
      <label for="relacion">Relación con el agresor:</label>
      <select id="relacion" name="relacion" required>
        <option value="" disabled <?php if (empty($datos['relacion_agresor'])) echo 'selected'; ?>>Seleccione una opción</option>
        <option value="Familiar" <?php if ($datos['relacion_agresor'] === 'Familiar') echo 'selected'; ?>>Familiar</option>
        <option value="Amigo" <?php if ($datos['relacion_agresor'] === 'Amigo') echo 'selected'; ?>>Amigo</option>
        <option value="Desconocido" <?php if ($datos['relacion_agresor'] === 'Desconocido') echo 'selected'; ?>>Desconocido</option>
        <option value="Otro" <?php if ($datos['relacion_agresor'] === 'Otro') echo 'selected'; ?>>Otro</option>
      </select>
       <!-- Menú desplegable: Relación con el agresor -->

      <label for="fecha">Fecha:</label>
      <input type="date" id="fecha" name="fecha" value="<?php echo htmlspecialchars($datos['fecha']); ?>" required>
<!-- Campo de fecha: Fecha del incidente -->
      <label for="denuncia">Denuncia:</label>
      <textarea id="denuncia" name="denuncia" required><?php echo htmlspecialchars($datos['denuncia']); ?></textarea>
<!-- Área de texto: Descripción de la denuncia -->
      <div class="buttons">
            <!-- Botones de acción: Modificar y Volver -->
        <button type="submit" class="btn modificar">✅ Modificar</button>
        <button type="button" class="btn volver" onclick="window.location.href='confirmacion.php?correo=<?php echo urlencode($datos['correo']); ?>'">🔙 Volver</button>
      </div>
    </form>
  </div>
</body>
</html>
