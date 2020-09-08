import { fetchStockData } from '../lib/stock'

const handleLiveText = (bot) => {
  bot.onText(/\/text ([0-9_A-Z]+)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]
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
}

export default handleLiveText
