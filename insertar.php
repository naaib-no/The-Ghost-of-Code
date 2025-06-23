<?php
// insertar.php

// 1) Verifica si el formulario se envió mediante el método POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // 2) Establece conexión con la base de datos (servidor, usuario, contraseña, base)
    $conn = new mysqli("localhost", "root", "", "cecyayuda");

    // 3) Verifica si hubo un error en la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // 4) Prepara una consulta SQL para insertar los datos en la tabla "denuncias"
    $stmt = $conn->prepare(
        "INSERT INTO denuncias
            (nombre, edad, sexo, telefono, correo, direccion,
             nombre_agresor, relacion_agresor, lugar_incidente, fecha, denuncia)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    // 5) Asocia los valores del formulario a la consulta preparada
    //    (fíjate en el orden: la "s" o "i" en bind_param debe coincidir con cada campo)
    $stmt->bind_param(
        "sisssssssss",
        $_POST['nombre'],        // s: string
        $_POST['edad'],          // i: integer
        $_POST['sexo'],          // s: string
        $_POST['telefono'],      // s: string
        $_POST['correo'],        // s: string
        $_POST['direccion'],     // s: string
        $_POST['nombre_agresor'],// s: string
        $_POST['relacion'],      // s: string
        $_POST['lugar'],         // s: string
        $_POST['fecha'],         // s: string (fecha en formato 'YYYY-MM-DD')
        $_POST['denuncia']       // s: string (texto de denuncia)
    );

    // 6) Ejecuta la sentencia preparada y verifica si se guardó correctamente
   if ($stmt->execute()) {
        // Si la inserción fue exitosa, lee el correo (que viene de $_POST) y redirige
        $correo = $_POST['correo'];
        header("Location: confirmacion.php?correo=" . urlencode($correo));
        exit();
    } else {
        // Si falla la ejecución, muestra el error
        echo "Error al registrar la denuncia: " . $stmt->error;
    }

    // 7) Cierra el statement y la conexión
    $stmt->close();
    $conn->close();

} // fin de if ($_SERVER["REQUEST_METHOD"] == "POST")
?>
