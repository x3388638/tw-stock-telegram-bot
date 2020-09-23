import { afterHoursCallbackQueryHandlers } from './afterHours'

const handleCallbackQuery = (bot) => {
  bot.on('callback_query', async (query) => {
    const handlers = { ...afterHoursCallbackQueryHandlers }
    await handlers[query.data](bot, query)
    bot.answerCallbackQuery(query.id)
  })
}

export default handleCallbackQuery
