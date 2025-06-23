<?php
// Establece la conexión con la base de datos (host, usuario, contraseña, base de datos)
// Cambia "denuncias" por el nombre correcto de tu base de datos, en este caso "cecyayuda"
$conexion = new mysqli("localhost", "root", "", "cecyayuda");

// Verifica si hay un error en la conexión y detiene el script si lo hay
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Recupera el valor del correo enviado por POST, o lo asigna como cadena vacía si no se envía
$correo = $_POST['correo'] ?? '';

// Verifica si se recibió un correo válido
if ($correo) {

  // Prepara una consulta SQL segura para eliminar el registro asociado al correo
  // Cambia "reportes" por el nombre correcto de la tabla, que en tu caso es "denuncias"
  $sql = "DELETE FROM denuncias WHERE correo = ?";
  $stmt = $conexion->prepare($sql);

  // Verifica si la preparación fue exitosa
  if (!$stmt) {
    die("Error en la preparación de la consulta: " . $conexion->error);
  }

  // Asocia el valor del correo al marcador de posición en la consulta
  $stmt->bind_param("s", $correo);

  // Ejecuta la sentencia
  $stmt->execute();

  // Verifica si se eliminó algún registro (es decir, si existía la denuncia)
  if ($stmt->affected_rows > 0) {
    // Si se eliminó correctamente, muestra un mensaje y redirige al usuario
    echo "<script>
      alert('Denuncia eliminada correctamente.');
      window.location.href = '../html/pagina principal denuncia pec.html';
    </script>";
  } else {
    // Si no se encontró ninguna denuncia con ese correo
    echo "<script>
      alert('No se encontró el registro para eliminar.');
      window.history.back(); // Vuelve a la página anterior
    </script>";
  }

  // Cierra la sentencia preparada
  $stmt->close();

} else {
  // Si no se recibió el correo, muestra un mensaje de error
  echo "<script>
    alert('Correo no recibido.');
    window.history.back(); // Vuelve a la página anterior
  </script>";
}

// Cierra la conexión a la base de datos
$conexion->close();
?>
