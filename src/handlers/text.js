import { fetchStockData, isStockIdValid } from '../lib/stock'
import { tseId, otcId } from '../../config'
import { getIndexHTMLTemplate, getStockHTMLTemplate } from '../lib/template'

async function handleStockText(msg, match) {
  const chatId = msg.chat.id
  const stockId = match[1]

  if (!stockId) {
    return this.sendMessage(chatId, '請帶入股號\ne.g. `/text 2330`', {
      parse_mode: 'Markdown'
    })
  }

  if (!isStockIdValid(stockId)) {
    return this.sendMessage(chatId, '請輸入有效股號\ne.g. `/text 2330`', {
      parse_mode: 'Markdown'
    })
  }

  const stockData = await fetchStockData(stockId)

  if (!stockData.name) {
    return this.sendStockIdNotFoundError(chatId, stockId)
  }

  const HTML = getStockHTMLTemplate(stockData)

  this.sendMessage(chatId, HTML, {
    parse_mode: 'HTML'
  })
}

async function handleIndexText(msg, match) {
  const chatId = msg.chat.id
  const type = match[1]
  const stockId = type === 'tse' ? tseId : otcId
  const stockData = await fetchStockData(stockId)
  const HTML = getIndexHTMLTemplate(stockData)

  this.sendMessage(chatId, HTML, {
    parse_mode: 'HTML'
  })
}

export function handleText(msg, match) {
  const { input } = match
  let m
  if ((m = input.match(/\/text(?: (.*))?$/))) {
    handleStockText.call(this, msg, m)
  }

  if ((m = input.match(/\/text_(otc|tse)$/))) {
    handleIndexText.call(this, msg, m)
  }
}
