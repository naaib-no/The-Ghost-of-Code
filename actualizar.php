<?php
// Conecta a la base de datos MySQL (servidor, usuario, contraseña, base de datos)
$conexion = new mysqli("localhost", "root", "", "denuncias");

// Obtiene el correo enviado por el formulario (clave única del registro)
$correo = $_POST['correo'];

// Consulta SQL preparada para actualizar la denuncia con los nuevos datos
$sql = "UPDATE reportes SET
  nombre = ?,       -- Nombre de quien denuncia
  edad = ?,         -- Edad de la persona
  sexo = ?,         -- Sexo (Masculino, Femenino, Otro)
  telefono = ?,     -- Número telefónico
  direccion = ?,    -- Dirección completa
  lugar = ?,        -- Lugar donde ocurrió el incidente
  relacion = ?,     -- Relación con el agresor
  fecha = ?,        -- Fecha de la denuncia
  denuncia = ?      -- Detalles del incidente
WHERE correo = ?";  // Condición: buscar el registro por el correo original

// Prepara la consulta para prevenir inyecciones SQL
$stmt = $conexion->prepare($sql);

// Asocia los parámetros del formulario a la consulta (en orden)
$stmt->bind_param("sissssssss",
  $_POST['nombre'],     // s = string
  $_POST['edad'],       // i = integer
  $_POST['sexo'],       // s
  $_POST['telefono'],   // s
  $_POST['direccion'],  // s
  $_POST['lugar'],      // s
  $_POST['relacion'],   // s
  $_POST['fecha'],      // s
  $_POST['denuncia'],   // s
  $correo               // s (correo que identifica el registro a actualizar)
);

// Ejecuta la sentencia preparada
if ($stmt->execute()) {
  // Si se actualiza con éxito, redirige al usuario a una página de confirmación
  header("Location: confirmacion.php?correo=" . urlencode($correo));
} else {
  // Si falla, muestra un mensaje de error
  echo "Error al actualizar la denuncia.";
}
?>
