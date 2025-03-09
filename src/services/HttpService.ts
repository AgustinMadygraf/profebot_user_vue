/*
Path: src/services/HttpService.ts
*/

export default class HttpService {
  private apiUrl: string

  constructor() {
    this.apiUrl = 'http://localhost/coopebot_PHP/public'
  }

  async sendMessage(
    message: string,
  ): Promise<{ success: boolean; reply?: string; data?: unknown; error?: string }> {
    console.log('HttpService: Sending message:', message)
    try {
      const response = await fetch(`${this.apiUrl}/sendMessage.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })
      console.log('HttpService: Received raw response:', response)
      if (!response.ok) {
        throw new Error(`Error al enviar mensaje: ${response.statusText}`)
      }
      const jsonResponse = await response.json()
      console.log('HttpService: sendMessage response json:', jsonResponse)
      return jsonResponse
    } catch (error) {
      console.error('HttpService: Caught error during sendMessage:', error)
      throw error
    }
  }
}
