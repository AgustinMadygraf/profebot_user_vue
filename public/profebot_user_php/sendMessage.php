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

// Datos del bot de Telegram
$TELEGRAM_BOT_TOKEN = "TU_TELEGRAM_BOT_TOKEN";
$TELEGRAM_CHAT_ID = "TU_CHAT_ID"; // ID del usuario o grupo donde se enviará el mensaje
$FASTAPI_ENDPOINT = "http://127.0.0.1:8000/webhook"; // Endpoint de tu bot en FastAPI

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['message'])) {
    echo json_encode(["error" => "No message provided"]);
    exit;
}

$mensaje_usuario = $data['message'];

// 1️⃣ Enviar mensaje a Telegram
$telegram_url = "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/sendMessage";
$telegram_data = [
    "chat_id" => $TELEGRAM_CHAT_ID,
    "text" => $mensaje_usuario
];

$options = [
    "http" => [
        "header" => "Content-Type: application/json",
        "method" => "POST",
        "content" => json_encode($telegram_data)
    ]
];

$context = stream_context_create($options);
$telegram_response = file_get_contents($telegram_url, false, $context);
$telegram_response_data = json_decode($telegram_response, true);

if (!$telegram_response_data["ok"]) {
    echo json_encode(["error" => "Error al enviar mensaje a Telegram"]);
    exit;
}

// 2️⃣ Esperar respuesta desde FastAPI (Webhook de tu bot)
$api_data = ["message" => $mensaje_usuario];
$api_options = [
    "http" => [
        "header" => "Content-Type: application/json",
        "method" => "POST",
        "content" => json_encode($api_data)
    ]
];

$api_context = stream_context_create($api_options);
$bot_response = file_get_contents($FASTAPI_ENDPOINT, false, $api_context);
$bot_response_data = json_decode($bot_response, true);

// 3️⃣ Enviar la respuesta del bot a Vue.js
$response = [
    "reply" => $bot_response_data["reply"] ?? "No se recibió respuesta del bot."
];

echo json_encode($response);
