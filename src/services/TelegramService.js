/*
Path: src/services/TelegramService.js
*/

export default class TelegramService {
    constructor() {
      this.userAgent = navigator.userAgent.toLowerCase();
      console.log("TelegramService inicializado. UserAgent:", this.userAgent);
    }
  
    hasTelegram() {
      const result = this.userAgent.includes("telegram");
      console.log("Verificando presencia de Telegram en UserAgent:", result);
      return result;
    }
  }