# Integración con el Backend

Este documento describe los detalles y requisitos del endpoint que el backend debe implementar para trabajar con el proyecto.

## Endpoint: /sendMessage.php

- **Método:** POST
- **Headers:**
  - Content-Type: application/json
- **Request Body:**
  ```json
  {
    "message": "Texto del mensaje"
  }
  ```
- **Respuesta Exitosa:** Retorna un objeto JSON
  ```json
  {
    "success": true,
    "reply": "Respuesta generada por el chat o bot",
    "data": { ... }
  }
  ```
- **Respuesta de Error:** En caso de fallo, retorna:
  ```json
  {
    "success": false,
    "error": "Mensaje de error descriptivo"
  }
  ```

## Notas Adicionales

- Asegúrese de que el endpoint esté disponible en la URL `http://localhost/coopebot_PHP/public/sendMessage.php` o ajuste la configuración en `HttpService.ts` según corresponda.
- Los logs del cliente ayudarán a diagnosticar problemas. Revise los mensajes en consola para detalles de la respuesta y posibles errores.
- Este endpoint debe manejar correctamente la recepción y el procesamiento del JSON para evitar respuestas inesperadas.

Con estos lineamientos se facilitará el trabajo conjunto entre el frontend y el backend.
