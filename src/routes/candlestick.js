import { fetchStockData, isStockIdValid } from '../lib/stock'
import screenshot from '../lib/screenshot'

const handleCandlestick = (bot) => {
  bot.onText(/\/[K|k] (.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]

    if (!isStockIdValid(stockId)) {
      return bot.sendMessage(chatId, '請輸入有效股號\ne.g. `/k 2330`', {
        parse_mode: 'Markdown'
      })
    }

    const { name } = await fetchStockData(stockId)
    if (!name) {
      return bot.sendMessage(chatId, `查無 ${stockId}，請確認此股票已上市/櫃`)
    }

    const processId = await bot.sendLoadingMsg(chatId)
    const chartBuffer = await screenshot(stockId, { type: 'candlestick' })

    bot.sendPhoto(chatId, chartBuffer)
    bot.deleteMessage(chatId, processId)
  })
}

export default handleCandlestick
