import TelegramBot from 'node-telegram-bot-api'
import { botToken } from '../../config'

const bot = new TelegramBot(botToken, {
  polling: true
})

bot.sendLoadingMsg = async (chatId) => {
  const { message_id } = await bot.sendMessage(chatId, '處理中，請稍候...')

  return message_id
}

export default bot
