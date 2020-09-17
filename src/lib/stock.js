import fetch from 'isomorphic-fetch'
import cheerio from 'cheerio'
import { stockRawUrl } from '../../config'

export const isStockIdValid = (stockId) => {
  return /^[0-9A-Z]+$/.test(stockId)
}

// ====================
// stock quote raw data
// ====================
/**
 * Parse stock raw data from invalid JSON-like String to Object
 * @param {string} res response of fetch stock raw data
 * @returns {(object|null)}
 */
export const parseRaw = (res) => {
  try {
    return JSON.parse(
      res
        .match(/({.*})/)[1]
        .replace(/:\s?((?:-)?[0-9.]+)[,}]/g, (m, t) => m.replace(t, `"${t}"`))
    )
  } catch {
    return null
  }
}

/**
 * Stock data object normalized by stockDataNormalizer()
 * @typedef {object} NormalizedStockData
 * @property {string} stockId "2330"
 * @property {string} currentPrice "447"
 * @property {string} risePrice "+3"
 * @property {string} risePricePerc "+1.2%"
 * @property {string} amount "29865"
 * @property {string} sellAmount "18873"
 * @property {string} buyAmount "11010"
 * @property {string} maxPrice "455"
 * @property {string} minPrice "446.5"
 * @property {string} openPrice "453"
 * @property {string} lastPrice "447"
 * @property {string} turnover 成交量 (億)
 * @property {array} ticks [[price, amount]]
 */

/**
 * Normalize parsed data to object w/ necessary fields
 * @param {object} data  stock data parsed by parseRaw()
 * @returns {NormalizedStockData}
 */
export const stockDataNormalizer = (data) => {
  const { mem = {}, id: stockId } = data || {}
  const name = mem.name

  if (!name) {
    return {}
  }

  const currentPrice = mem[125]
  const risePrice = (mem[184] >= 0 ? '+' : '') + mem[184]
  const risePricePerc =
    (mem[185] >= 0 ? '+' : '') + (+mem[185]).toFixed(2).toString() + '%'
  const amount = mem[404]
  const sellAmount = mem[645]
  const buyAmount = mem[646]
  const maxPrice = mem[130]
  const minPrice = mem[131]
  const openPrice = mem[126]
  const lastPrice = mem[129]
  const turnover = (mem[423] / 100).toFixed(2).toString()
  let ticks = [
    [mem[101] > 100000 ? '市價' : mem[101], mem[113]],
    [mem[102], mem[114]],
    [mem[103], mem[115]],
    [mem[104], mem[116]],
    [mem[105], mem[117]],
    [mem[106], mem[118]],
    [mem[107], mem[119]],
    [mem[108], mem[120]],
    [mem[109], mem[121]],
    [mem[110], mem[122]]
  ] // [[price, amount]]

  ticks = ticks.map((tick) => {
    return [tick[0] || '', tick[1] || '']
  })

  return {
    stockId,
    name,
    currentPrice,
    risePrice,
    risePricePerc,
    amount,
    sellAmount,
    buyAmount,
    maxPrice,
    minPrice,
    openPrice,
    lastPrice,
    turnover,
    ticks
  }
}

/**
 * Fetch stock quotes
 * @param {string} stockId
 * @returns {NormalizedStockData}
 */
export const fetchStockData = async (stockId) => {
  const res = await fetch(
    stockRawUrl.replace('STOCK_ID', stockId)
  ).then((res) => res.text())
  const parsedRes = parseRaw(res)
  const result = stockDataNormalizer(parsedRes)

  if (!result.name) {
    return {}
  }

  return result
}

// ====================
// crawl stock news data
// ====================
/**
 * News data crawled
 * @typedef {object} NewsItem
 * @property {string} title Article title
 * @property {string} link Article link
 * @property {string} source Article publish date & provider
 */

/**
 * Crawl news list from yahoo stock
 * @param {string} stockId
 * @returns {(NewsItem[]|null)}
 */
export const fetchStockNews = async (stockId) => {
  const res = await fetch(`https://tw.stock.yahoo.com/q/h?s=${stockId}`)
  if (!res || !res.ok || !/tw\.stock\.yahoo\.com\/q\/h\?s=/.test(res.url)) {
    return null
  }

  const doc = await res.text()
  const $ = cheerio.load(doc)
  const list = $('table table table table tbody tr')
    .toArray()
    .reduce((list, tr, i) => {
      if (i % 2 === 0) {
        const $link = $(tr).find('td a')
        const newsItem = {
          title: $link.text(),
          link: 'https://tw.stock.yahoo.com' + $link.attr('href'),
          source: ''
        }

        return [...list, newsItem]
      } else {
        list[list.length - 1].source = $(tr).find('font').text()
        return list
      }
    }, [])

  return list
}
