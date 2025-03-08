<?php
/*
Path: public/profebot_user_php/sendMessage.php
*/

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

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
