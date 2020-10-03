import puppeteer from 'puppeteer'

const newBrowserAndPage = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  })

  const page = await browser.newPage()
  return [browser, page]
}

/**
 * Take screenshot for specific element
 * @param {String} url where to screenshot
 * @param {String} locator css selector for screenshot target
 * @param {Object} options
 * @param {(String|Number|Function)} options.waitFor a selector, predicate or timeout to wait for
 * @param {(String|String[])} options.waitUntil <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array> When to consider navigation succeeded
 * @returns {Buffer} screenshot base64 buffer
 */
export const screenshot = async (
  url,
  locator,
  { waitFor, waitUntil = 'load' } = {}
) => {
  const [browser, page] = await newBrowserAndPage()
  await page.goto(url, { waitUntil })
  await page.waitFor(waitFor || locator)
  const $elem = await page.$(locator)
  const elemImg = await $elem.screenshot({ encoding: 'base64' })
  browser.close()

  return Buffer.from(elemImg, 'base64')
}

/**
 * Get inner text of target element
 * @param {String} url
 * @param {String} locator target selector to get inner text
 * @param {(String|String[])} options.waitUntil <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array> When to consider navigation succeeded
 * @returns {String}
 */
export const getElementInnerText = async (
  url,
  locator,
  { waitUntil = 'load' } = {}
) => {
  const [browser, page] = await newBrowserAndPage()
  await page.goto(url, { waitUntil })
  await page.waitFor(locator)
  const text = await page.$eval(locator, ($elem) => $elem.textContent)
  browser.close()

  return text
}
