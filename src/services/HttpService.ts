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
      console.log('HttpService: Response headers:', [...response.headers.entries()])

      const responseText = await response.text()
      console.log('HttpService: Raw response text:', responseText)

      if (!response.ok) {
        const errorMsg = `Error al enviar mensaje: ${response.status} ${response.statusText}. Response: ${responseText}`
        throw new Error(errorMsg)
      }

      let jsonResponse
      try {
        jsonResponse = JSON.parse(responseText)
      } catch (jsonError) {
        const err = jsonError as Error
        console.error('HttpService: Error parsing JSON:', err.message, 'Stack:', err.stack)
        console.error('HttpService: Response text causing error:', responseText)
        throw err
      }

      console.log('HttpService: sendMessage response json:', jsonResponse)
      return jsonResponse
    } catch (error) {
      const err = error as Error
      console.error(
        'HttpService: Caught error during sendMessage:',
        err.message,
        'Stack:',
        err.stack,
      )
      throw err
    }
  }
}
