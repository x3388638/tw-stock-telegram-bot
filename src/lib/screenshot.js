import puppeteer from 'puppeteer'
import {
  chartUrl,
  chartLocator,
  tseChartUrl,
  tseCahrtLocator,
  otcChartUrl,
  otcChartLocator
} from '../../config'

const screenshot = async (stockId) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  let url = chartUrl.replace('STOCK_ID', stockId)
  let chart = chartLocator

  switch (stockId) {
    case 'TSE': {
      url = tseChartUrl
      chart = tseCahrtLocator
      break
    }

    case 'OTC': {
      url = otcChartUrl
      chart = otcChartLocator
      break
    }
  }

  await page.goto(url)
  const $chart = await page.$(chart)
  const chartImg = await $chart.screenshot({ encoding: 'base64' })
  await browser.close()

  return Buffer.from(chartImg, 'base64')
}

export default screenshot
