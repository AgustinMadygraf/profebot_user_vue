<!--
Path: src/components/ChatBot.vue
-->

<template>
  <div class="chat-container">
    <!-- Botón que aparece solo si detecta Telegram -->
    <button v-if="telegramService.hasTelegram()" @click="openTelegram">
      Abrir Telegram
    </button>

    <!-- Chat embebido si NO detecta Telegram -->
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

<script lang="ts">
import { ref } from 'vue'
import HttpService from '../services/HttpService'
import TelegramService from '../services/TelegramService'

export default {
  name: 'ChatBot',
  setup() {
    const messages = ref<string[]>([])
    const newMessage = ref('')
    const telegramService = new TelegramService()
    const httpService = new HttpService()

    const openTelegram = () => {
      window.location.href = "https://t.me/madygraf_bot"
    }

    const sendMessage = async () => {
      if (newMessage.value.trim() !== '') {
        messages.value.push(`Tú: ${newMessage.value}`)
        try {
          const response = await httpService.sendMessage(newMessage.value)
          messages.value.push(`Bot: ${response.reply}`)
        } catch (error) {
          messages.value.push('Error al enviar mensaje.')
        }
        newMessage.value = ''
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
