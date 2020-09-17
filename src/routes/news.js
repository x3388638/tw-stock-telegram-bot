import { isStockIdValid, fetchStockNews } from '../lib/stock'

const handleStockNews = (bot) => {
  bot.onText(/\/news (.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]

    if (!isStockIdValid) {
      return bot.sendMessage(chatId, '請輸入有效股號\ne.g. `/news 2330`', {
        parse_mode: 'Markdown'
      })
    }

    const newsList = await fetchStockNews(stockId)
    console.log(newsList)
    bot.sendMessage(chatId, 'TODO') // FIXME
  })
}

export default handleStockNews
