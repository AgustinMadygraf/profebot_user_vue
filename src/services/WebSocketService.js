/*
Path: src/services/WebSocketService.js
*/

export default class WebSocketService {
    constructor(url) {
      this.url = url;
      this.socket = null;
      this.messageListeners = [];
    }
  
    connect() {
      this.socket = new WebSocket(this.url);
      this.socket.onopen = () => {
        console.log("WebSocket conectado");
      }
      this.socket.onmessage = (event) => {
        // Notifica a todos los suscriptores cuando llega un mensaje
        this.messageListeners.forEach(listener => listener(event.data));
      }
      this.socket.onerror = (error) => {
        console.error("Error en WebSocket:", error);
      }
      this.socket.onclose = () => {
        console.log("WebSocket cerrado, reconectando...");
        // Aquí se podría implementar lógica de reconexión
      }
    }
  
    onMessage(callback) {
      this.messageListeners.push(callback);
    }
  
    send(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(message);
      } else {
        console.warn("WebSocket no está abierto. No se puede enviar el mensaje.");
      }
    }
  }
  