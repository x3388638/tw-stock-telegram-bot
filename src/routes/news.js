import { isStockIdValid, fetchStockNews } from '../lib/stock'
import { getNewsListHTMLTemplate } from '../lib/template'

const handleStockNews = (bot) => {
  bot.onText(/\/news (.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]

    if (!isStockIdValid(stockId)) {
      return bot.sendMessage(chatId, '請輸入有效股號\ne.g. `/news 2330`', {
        parse_mode: 'Markdown'
      })
    }

    const newsList = await fetchStockNews(stockId)
    if (!newsList) {
      return bot.sendStockIdNotFoundError(chatId, stockId)
    }

    if (!newsList.length) {
      return bot.sendMessage(chatId, `查無 ${stockId} 相關新聞`)
    }

    const HTML = getNewsListHTMLTemplate(newsList)
    bot.sendMessage(chatId, HTML, {
      parse_mode: 'HTML',
      disable_web_page_preview: true
    })
  })

  bot.onText(/\/news$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '請帶入股號\ne.g. `/news 2330`', {
      parse_mode: 'Markdown'
    })
  })
}

export default handleStockNews
