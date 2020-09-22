import { fetchStockData, isStockIdValid } from '../lib/stock'
import { screenshot } from '../lib/page'
import {
  candlestickLocator,
  stockCandlestickUrl,
  tseCandlestickUrl,
  otcCandlestickUrl
} from '../../config'

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
    const locator = candlestickLocator
    const url = stockCandlestickUrl.replace('STOCK_ID', stockId)
    const chartBuffer = await screenshot(url, locator)

    bot.sendPhoto(chatId, chartBuffer)
    bot.deleteMessage(chatId, processId)
  })

  bot.onText(/\/[K|k]$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '請帶入股號\ne.g. `/k 2330`', {
      parse_mode: 'Markdown'
    })
  })

  bot.onText(/\/k_(otc|tse)$/, async (msg, match) => {
    const chatId = msg.chat.id
    const type = match[1].toUpperCase()
    const processId = await bot.sendLoadingMsg(chatId)
    const url = type === 'TSE' ? tseCandlestickUrl : otcCandlestickUrl
    const locator = candlestickLocator
    const chartBuffer = await screenshot(url, locator)

    bot.sendPhoto(chatId, chartBuffer)
    bot.deleteMessage(chatId, processId)
  })
}

export default handleCandlestick
