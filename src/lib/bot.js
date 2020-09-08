import TelegramBot from 'node-telegram-bot-api'
import { botToken } from '../../config'

const bot = new TelegramBot(botToken, {
  polling: true
})

export default bot
