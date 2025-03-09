/*
Path: src/services/HttpService.ts
*/

export default class HttpService {
  private apiUrl: string

  constructor() {
    this.apiUrl = 'http://localhost/coopebot_PHP/public'
  }

  async sendMessage(message: string): Promise<{
    success: boolean
    reply?: string
    data?: unknown
    error?: string
    detail?: string
    telegram_response?: unknown
  }> {
    console.log('HttpService: Sending message:', message)
    try {
      const response = await fetch(`${this.apiUrl}/sendMessage.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const responseText = await response.text()

      if (!response.ok) {
        throw new Error(`Error ${response.status} ${response.statusText}: ${responseText}`)
      }

      let jsonResponse
      try {
        jsonResponse = JSON.parse(responseText)
      } catch (jsonError) {
        const err = jsonError as Error
        console.error('HttpService: JSON parse error:', err.message)
        throw err
      }

      console.log('HttpService: Response:', jsonResponse)
      return jsonResponse
    } catch (error) {
      const err = error as Error
      console.error('HttpService: Caught error:', err.message)
      throw err
    }
  }
}
