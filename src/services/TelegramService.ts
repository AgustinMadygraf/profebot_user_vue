/*
Path: src/services/TelegramService.ts
*/

export default class TelegramService {
  userAgent: string

  constructor() {
    this.userAgent = navigator.userAgent.toLowerCase()
    const hasTelegram = this.userAgent.includes('telegram')
    console.log('TelegramService: inicializado. hasTelegram:', hasTelegram)
  }

  hasTelegram(): boolean {
    return this.userAgent.includes('telegram')
  }
}
