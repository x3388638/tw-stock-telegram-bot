import TelegramBot from 'node-telegram-bot-api'
import { botToken } from './config'

const bot = new TelegramBot(botToken, {
  polling: true
})

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, 'Welcome')
})
