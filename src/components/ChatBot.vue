<!--
Path: src/components/ChatBot.vue
-->

<template>
    <div class="chat-container">
      <!-- Si se detecta Telegram, se muestra un botón para abrir la app -->
      <button v-if="telegramService.hasTelegram()" @click="openTelegram">
        Abrir Telegram
      </button>
  
      <!-- De lo contrario, se muestra el chat embebido -->
      <div v-else class="chat-box">
        <div class="messages">
          <div v-for="(msg, index) in messages" :key="index" class="message">
            {{ msg }}
          </div>
        </div>
        <input v-model="newMessage" placeholder="Escribe tu mensaje..." @keyup.enter="sendMessage">
        <button @click="sendMessage">Enviar</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import WebSocketService from '../services/WebSocketService'
  import TelegramService from '../services/TelegramService'
  
  export default {
    name: 'ChatBot',
    setup() {
      const messages = ref([])
      const newMessage = ref('')
      
      // Instanciamos los servicios que encapsulan la lógica
      const wsService = new WebSocketService("ws://localhost:8080")
      const telegramService = new TelegramService()
  
      // Suscribirse a los mensajes entrantes del WebSocket
      const onMessage = (data) => {
        messages.value.push(data)
      }
  
      onMounted(() => {
        wsService.connect()
        wsService.onMessage(onMessage)
      })
  
      const openTelegram = () => {
        window.location.href = "https://t.me/camaradaGPT_bot"
      }
  
      const sendMessage = () => {
        if (newMessage.value.trim() !== "") {
          messages.value.push(`Tú: ${newMessage.value}`)
          wsService.send(newMessage.value)
          newMessage.value = ""
        }
      }
  
      return {
        messages,
        newMessage,
        openTelegram,
        sendMessage,
        telegramService
      }
    }
  }
  </script>
  
  <style scoped>
  .chat-container {
    width: 300px;
    margin: auto;
    text-align: center;
  }
  
  .chat-box {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
  }
  
  .messages {
    height: 200px;
    overflow-y: auto;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
  
  .message {
    background: #f1f1f1;
    padding: 5px;
    margin: 5px 0;
    border-radius: 5px;
  }
  
  input {
    width: 80%;
    padding: 5px;
  }
  
  button {
    padding: 5px 10px;
    margin-top: 5px;
    cursor: pointer;
  }
  </style>
  