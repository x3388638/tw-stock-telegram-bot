import puppeteer from 'puppeteer'

/**
 * Take screenshot for specific element
 * @param {string} url where to screenshot
 * @param {string} locator css selector for screenshot target
 * @returns {Buffer} screenshot base64 buffer
 */
const screenshot = async (url, locator) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })

  const page = await browser.newPage()
  await page.goto(url)
  const $chart = await page.$(locator)
  const chartImg = await $chart.screenshot({ encoding: 'base64' })
  await browser.close()

  return Buffer.from(chartImg, 'base64')
}

export default screenshot
