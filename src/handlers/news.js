import { isStockIdValid, fetchStockNews } from '../lib/stock'
import { getNewsListHTMLTemplate } from '../lib/template'

export async function handleStockNews(msg, match) {
  const chatId = msg.chat.id
  const stockId = match[1]

  if (!stockId) {
    return this.sendMessage(chatId, '請帶入股號\ne.g. `/news 2330`', {
      parse_mode: 'Markdown'
    })
  }

  if (!isStockIdValid(stockId)) {
    return this.sendMessage(chatId, '請輸入有效股號\ne.g. `/news 2330`', {
      parse_mode: 'Markdown'
    })
  }

  const newsList = await fetchStockNews(stockId)
  if (!newsList) {
    return this.sendStockIdNotFoundError(chatId, stockId)
  }

  if (!newsList.length) {
    return this.sendMessage(chatId, `查無 ${stockId} 相關新聞`)
  }

  const HTML = getNewsListHTMLTemplate(newsList)
  this.sendMessage(chatId, HTML, {
    parse_mode: 'HTML',
    disable_web_page_preview: true
  })
}
