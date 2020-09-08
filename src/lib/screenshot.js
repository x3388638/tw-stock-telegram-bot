import puppeteer from 'puppeteer'
import { targetUrl, targetChart } from '../../config'

const screenshot = async (stockId) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(targetUrl.replace('STOCK_ID', stockId))
  const $chart = await page.$(targetChart)
  const chartImg = await $chart.screenshot({ encoding: 'base64' })
  await browser.close()

  return Buffer.from(chartImg, 'base64')
}

export default screenshot
