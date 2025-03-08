/*
Path: src/services/TelegramService.js
*/

export default class TelegramService {
    constructor() {
      this.userAgent = navigator.userAgent.toLowerCase();
    }
  
    hasTelegram() {
      // Método simple para detectar si Telegram está presente en el userAgent
      return this.userAgent.includes("telegram");
    }
  }
  