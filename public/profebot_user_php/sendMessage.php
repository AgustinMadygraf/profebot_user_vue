<?php
/*
Path: public/profebot_user_php/sendMessage.php
*/

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Manejar solicitudes OPTIONS (preflight request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['message'])) {
    echo json_encode(["error" => "No message provided"]);
    exit;
}

// Simulación de respuesta del bot
$response = [
    "reply" => "Recibí tu mensaje: " . $data['message']
];

echo json_encode($response);
