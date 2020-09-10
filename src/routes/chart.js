import screenshot from '../lib/screenshot'
import { fetchStockData } from '../lib/stock'
import { tseId, otcId } from '../../config'

const getIcon = (val) => {
  return val > 0 ? '🔼 ' : val < 0 ? '🔽 ' : ''
}

const handleLiveChart = (bot) => {
  bot.onText(/\/chart (.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]

    if (!/^[0-9_A-Z]+$/.test(stockId)) {
      return bot.sendMessage(chatId, '請輸入有效股號\ne.g. `/chart 2330`', {
        parse_mode: 'Markdown'
      })
    }

    const {
      name,
      currentPrice,
      risePrice,
      risePricePerc
    } = await fetchStockData(stockId)
    if (!name) {
      return bot.sendMessage(chatId, `查無 ${stockId}，請確認此股票已上市/櫃`)
    }

    const processId = await bot.sendLoadingMsg(chatId)
    const chartBuffer = await screenshot(stockId)
    const icon = getIcon(risePrice)
    bot.sendPhoto(chatId, chartBuffer, {
      caption: `${icon}${stockId} ${name} ${currentPrice} | ${risePrice} (${risePricePerc})`
    })
    bot.deleteMessage(chatId, processId)
  })

  bot.onText(/\/chart$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '請帶入股號\ne.g. `/chart 2330`', {
      parse_mode: 'Markdown'
    })
  })

  bot.onText(/\/chart_(otc|tse)$/, async (msg, match) => {
    const chatId = msg.chat.id
    const type = match[1].toUpperCase()
    const stockId = type === 'TSE' ? tseId : otcId
    const processId = await bot.sendLoadingMsg(chatId)
    const [stockData, chartBuffer] = await Promise.all([
      fetchStockData(stockId),
      screenshot(type)
    ])
    const { name, currentPrice, risePrice, risePricePerc } = stockData
    const icon = getIcon(risePrice)
    bot.sendPhoto(chatId, chartBuffer, {
      caption: `${icon}${name} ${currentPrice} | ${risePrice} (${risePricePerc})`
    })
    bot.deleteMessage(chatId, processId)
  })
}

export default handleLiveChart
