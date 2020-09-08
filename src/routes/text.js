import { fetchStockData } from '../lib/stock'

const handleLiveText = (bot) => {
  bot.onText(/\/text (.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]

    if (!/^[0-9_A-Z]+$/.test(stockId)) {
      return bot.sendMessage(chatId, '請輸入有效股號\ne.g. `/text 2330`', {
        parse_mode: 'Markdown'
      })
    }

    const {
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
      ticks
    } = await fetchStockData(stockId)

    if (!name) {
      return bot.sendMessage(chatId, `查無 ${stockId}，請確認此股票已上市/櫃`)
    }

    const resMD = `<pre>${stockId} ${name} | <b>${currentPrice}</b> | ${risePrice} (${risePricePerc})

總量 ${amount} | 內盤 ${sellAmount} | 外盤 ${buyAmount}

最高 ${maxPrice} | 最低 ${minPrice} | 開盤 ${openPrice} | 昨收 ${lastPrice}

        委買        |        委賣        
----------------------------------------
${ticks
  .map((tick, i) => {
    let s = ''
    if (i % 2 === 0) {
      s += (tick[1] + ' ' + tick[0].padStart(7, ' ')).padStart(19, ' ') + '  '
    } else {
      s += (tick[0].padEnd(7, ' ') + ' ' + tick[1]).padEnd(19, ' ') + '\n'
    }

    return s
  })
  .join('')}
</pre>
`

    bot.sendMessage(chatId, resMD, {
      parse_mode: 'HTML'
    })
  })

  bot.onText(/\/text$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '請帶入股號\ne.g. `/text 2330`', {
      parse_mode: 'Markdown'
    })
  })
}

export default handleLiveText
