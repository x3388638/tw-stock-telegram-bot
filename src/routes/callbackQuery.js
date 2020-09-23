import { afterHoursCallbackQueryHandlers } from './afterHours'

const handleCallbackQuery = (bot) => {
  bot.on('callback_query', (query) => {
    const handlers = { ...afterHoursCallbackQueryHandlers }
    handlers[query.data](bot, query)
    bot.answerCallbackQuery(query.id)
  })
}

export default handleCallbackQuery
