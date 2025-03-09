/*
Path: src/services/TelegramService.ts
*/

export default class TelegramService {
  userAgent: string

  constructor() {
    this.userAgent = navigator.userAgent.toLowerCase()
    console.log('TelegramService inicializado. UserAgent:', this.userAgent)
  }

  hasTelegram(): boolean {
    const result = this.userAgent.includes('telegram')
    console.log('Verificando presencia de Telegram en UserAgent:', result)
    return result
  }
}
