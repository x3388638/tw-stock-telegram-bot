import { fetchStockData } from '../lib/stock'
import { tseId, otcId } from '../../config'
import { getIndexHTMLTemplate, getStockHTMLTemplate } from '../lib/template'

const handleLiveText = (bot) => {
  bot.onText(/\/text (.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]

    if (!/^[0-9_A-Z]+$/.test(stockId)) {
      return bot.sendMessage(chatId, '請輸入有效股號\ne.g. `/text 2330`', {
        parse_mode: 'Markdown'
      })
    }

    const stockData = await fetchStockData(stockId)

    if (!stockData.name) {
      return bot.sendMessage(chatId, `查無 ${stockId}，請確認此股票已上市/櫃`)
    }

    const HTML = getStockHTMLTemplate(stockData)

    bot.sendMessage(chatId, HTML, {
      parse_mode: 'HTML'
    })
  })

  bot.onText(/\/text$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '請帶入股號\ne.g. `/text 2330`', {
      parse_mode: 'Markdown'
    })
  })

  bot.onText(/\/text_(otc|tse)$/, async (msg, match) => {
    const chatId = msg.chat.id
    const type = match[1]
    const stockId = type === 'tse' ? tseId : otcId
    const stockData = await fetchStockData(stockId)
    const HTML = getIndexHTMLTemplate(stockData)

    bot.sendMessage(chatId, HTML, {
      parse_mode: 'HTML'
    })
  })
}

export default handleLiveText
