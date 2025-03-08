/*
Path: src/services/HttpService.ts
*/

export default class HttpService {
    private apiUrl: string;
  
    constructor() {
        this.apiUrl = "http://localhost/profebot_user_vue/profebot_user_php";
    }
  
    async sendMessage(message: string): Promise<any> {
        try {
            const response = await fetch(`${this.apiUrl}/sendMessage.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error(`Error al enviar mensaje: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error en HttpService:', error);
            throw error;
        }
    }
}
