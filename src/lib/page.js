import puppeteer from 'puppeteer'

const newBrowserAndPage = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--proxy-server='direct://'",
      '--proxy-bypass-list=*',
      '--no-sandbox'
    ]
  })

  const page = await browser.newPage()
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  )
  return [browser, page]
}

/**
 * Take screenshot for specific element
 * @param {String} url where to screenshot
 * @param {String} locator css selector for screenshot target
 * @param {Object} options
 * @param {(String|Number|Function)} options.waitFor a selector, predicate or timeout to wait for
 * @param {(String|String[])} options.waitUntil <"load"|"domcontentloaded"|"networkidle0"|"networkidle2"|Array> When to consider navigation succeeded
 * @returns {Buffer|null} screenshot base64 buffer
 */
export const screenshot = async (
  url,
  locator,
  { waitFor, waitUntil = 'load' } = {}
) => {
  const [browser, page] = await newBrowserAndPage()
  let elemImg
  try {
    await page.goto(url, { waitUntil })
    await page.waitFor(waitFor || locator)
    const $elem = await page.$(locator)
    elemImg = await $elem.screenshot({ encoding: 'base64' })
  } catch (e) {
    console.error(e)
  }

  browser.close()

  return elemImg ? Buffer.from(elemImg, 'base64') : null
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
  let text
  try {
    await page.goto(url, { waitUntil })
    await page.waitFor(locator)
    text = await page.$eval(locator, ($elem) => $elem.textContent)
  } catch (e) {
    console.error(e)
  }

  browser.close()

  return text || null
}
