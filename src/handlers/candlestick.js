import { fetchStockData, isStockIdValid } from '../lib/stock'
import { screenshot } from '../lib/page'
import {
  candlestickLocator,
  stockCandlestickUrl,
  tseCandlestickUrl,
  otcCandlestickUrl
} from '../../config'

async function handleStockCandlestick(msg, match) {
  const chatId = msg.chat.id
  const stockId = match[1]

  if (!stockId) {
    return this.sendMessage(chatId, '請帶入股號\ne.g. `/k 2330`', {
      parse_mode: 'Markdown'
    })
  }

  if (!isStockIdValid(stockId)) {
    return this.sendMessage(chatId, '請輸入有效股號\ne.g. `/k 2330`', {
      parse_mode: 'Markdown'
    })
  }

  const { name } = await fetchStockData(stockId)
  if (!name) {
    return this.sendStockIdNotFoundError(chatId, stockId)
  }

  const onLoad = await this.sendLoadingMsg(chatId)
  const locator = candlestickLocator
  const url = stockCandlestickUrl.replace('STOCK_ID', stockId)
  const chartBuffer = await screenshot(url, locator)

  if (!chartBuffer) {
    this.sendTimeoutError(chatId)
  } else {
    this.sendPhoto(chatId, chartBuffer)
  }

  onLoad()
}

async function handleIndexCandlestick(msg, match) {
  const chatId = msg.chat.id
  const type = match[1].toUpperCase()
  const onLoad = await this.sendLoadingMsg(chatId)
  const url = type === 'TSE' ? tseCandlestickUrl : otcCandlestickUrl
  const locator = candlestickLocator
  const chartBuffer = await screenshot(url, locator)

  if (!chartBuffer) {
    this.sendTimeoutError(chatId)
  } else {
    this.sendPhoto(chatId, chartBuffer)
  }

  onLoad()
}

export function handleCandlestick(msg, match) {
  const { input } = match
  let m
  if ((m = input.match(/\/[K|k](?: (.*))?$/))) {
    handleStockCandlestick.call(this, msg, m)
  }

  if ((m = input.match(/\/k_(otc|tse)$/))) {
    handleIndexCandlestick.call(this, msg, m)
  }
}
