import { screenshot } from '../lib/page'
import { fetchStockData, isStockIdValid } from '../lib/stock'
import {
  tseId,
  otcId,
  chartUrl,
  chartLocator,
  tseCahrtLocator,
  otcChartLocator,
  tseChartUrl,
  otcChartUrl
} from '../../config'
import {
  getStockCaptionTextTemplate,
  getIndexCaptionTextTemplate
} from '../lib/template'

async function handleStockChart(msg, match) {
  const chatId = msg.chat.id
  const stockId = match[1]

  if (!stockId) {
    return this.sendMessage(chatId, '請帶入股號\ne.g. `/chart 2330`', {
      parse_mode: 'Markdown'
    })
  }

  if (!isStockIdValid(stockId)) {
    return this.sendMessage(chatId, '請輸入有效股號\ne.g. `/chart 2330`', {
      parse_mode: 'Markdown'
    })
  }

  const stockData = await fetchStockData(stockId)
  if (!stockData.name) {
    return this.sendStockIdNotFoundError(chatId, stockId)
  }

  const processId = await this.sendLoadingMsg(chatId)
  const url = chartUrl.replace('STOCK_ID', stockId)
  const locator = chartLocator
  const chartBuffer = await screenshot(url, locator)
  this.sendPhoto(chatId, chartBuffer, {
    caption: getStockCaptionTextTemplate(stockData)
  })
  this.deleteMessage(chatId, processId)
}

async function handleIndexChart(msg, match) {
  const chatId = msg.chat.id
  const type = match[1].toUpperCase()
  let stockId, url, locator

  if (type === 'TSE') {
    stockId = tseId
    url = tseChartUrl
    locator = tseCahrtLocator
  } else {
    stockId = otcId
    url = otcChartUrl
    locator = otcChartLocator
  }

  const processId = await this.sendLoadingMsg(chatId)
  const [stockData, chartBuffer] = await Promise.all([
    fetchStockData(stockId),
    screenshot(url, locator)
  ])
  this.sendPhoto(chatId, chartBuffer, {
    caption: getIndexCaptionTextTemplate(stockData)
  })
  this.deleteMessage(chatId, processId)
}

export function handleChart(msg, match) {
  const { input } = match
  let m
  if ((m = input.match(/\/chart(?: (.*))?$/))) {
    handleStockChart.call(this, msg, m)
  }

  if ((m = input.match(/\/chart_(otc|tse)$/))) {
    handleIndexChart.call(this, msg, m)
  }
}
