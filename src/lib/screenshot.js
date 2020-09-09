import puppeteer from 'puppeteer'
import {
  targetUrl,
  targetChart,
  tseUrl,
  tseCahrt,
  otcUrl,
  otcChart
} from '../../config'

const screenshot = async (stockId) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })
  const page = await browser.newPage()
  let url = targetUrl.replace('STOCK_ID', stockId)
  let chart = targetChart

  switch (stockId) {
    case 'TSE': {
      url = tseUrl
      chart = tseCahrt
      break
    }

    case 'OTC': {
      url = otcUrl
      chart = otcChart
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
