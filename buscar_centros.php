<?php
// Mostrar errores para depuración
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Validar parámetros
if (!isset($_GET['lat'], $_GET['lng'])) {
    http_response_code(400);
    echo json_encode(["error" => "Faltan parámetros lat o lng."]);
    exit;
}

$lat = $_GET['lat'];
$lng = $_GET['lng'];

// Generar la viewbox primero (¡esto es lo que fallaba!)
$bbox = ($lng - 0.05) . "," . ($lat + 0.05) . "," . ($lng + 0.05) . "," . ($lat - 0.05);

// Armar término de búsqueda (más amplio)
$q = urlencode("centro de ayuda OR hospital OR centro comunitario");

// Armar la URL final a Nominatim
$url = "https://nominatim.openstreetmap.org/search?format=json&q=$q&limit=10&viewbox=$bbox";

// Encabezados necesarios
$opts = [
  "http" => [
    "header" => "Accept-Language: es\r\nUser-Agent: MiAppSegura/1.0"
  ]
];

// Ejecutar consulta
$context = stream_context_create($opts);
$response = file_get_contents($url, false, $context);

// Devolver JSON
header('Content-Type: application/json');
echo $response;
