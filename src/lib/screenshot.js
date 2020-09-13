import puppeteer from 'puppeteer'
import {
  chartUrl,
  chartLocator,
  tseChartUrl,
  tseCahrtLocator,
  otcChartUrl,
  otcChartLocator,
  stockCandlestickUrl,
  tseCandlestickUrl,
  otcCandlestickUrl,
  candlestickLocator
} from '../../config'

/**
 * get chart screenshot
 * @param {string} stockId - Stock ID, e.g. '2330', 'TSE', 'OTC'
 * @param {object} option
 * @param {string} option.type - 'chart' | 'candlestick'
 * @returns {Buffer} screenshot base64 buffer
 */
const screenshot = async (stockId, { type = 'chart' } = {}) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  let url
  let locator

  if (type === 'chart') {
    switch (stockId) {
      case 'TSE': {
        url = tseChartUrl
        locator = tseCahrtLocator
        break
      }

      case 'OTC': {
        url = otcChartUrl
        locator = otcChartLocator
        break
      }

      default: {
        url = chartUrl.replace('STOCK_ID', stockId)
        locator = chartLocator
      }
    }
  }

  if (type === 'candlestick') {
    locator = candlestickLocator
    switch (stockId) {
      case 'TSE': {
        url = tseCandlestickUrl
        break
      }

      case 'OTC': {
        url = otcCandlestickUrl
        break
      }

      default: {
        url = stockCandlestickUrl.replace('STOCK_ID', stockId)
      }
    }
  }

  await page.goto(url)
  const $chart = await page.$(locator)
  const chartImg = await $chart.screenshot({ encoding: 'base64' })
  await browser.close()

  return Buffer.from(chartImg, 'base64')
}

export default screenshot
