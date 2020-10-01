export const getIndexHTMLTemplate = ({
  name,
  currentPrice = '-',
  risePrice = '+0',
  risePricePerc = '+0%',
  turnover = '0'
}) => {
  return `<b>${name}</b> ${currentPrice} | ${risePrice} (${risePricePerc})
成交金額 ${turnover} 億`
}

export const getStockHTMLTemplate = ({
  stockId,
  name,
  currentPrice = '-',
  risePrice = '+0',
  risePricePerc = '+0%',
  amount = '-',
  sellAmount = '-',
  buyAmount = '-',
  maxPrice = '-',
  minPrice = '-',
  openPrice = '-',
  lastPrice = '-',
  ticks
}) => {
  return `<pre>${stockId} ${name} | <b>${currentPrice}</b> | ${risePrice} (${risePricePerc})

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
}

export const getNewsListHTMLTemplate = (list) => {
  return list
    .map(
      ({ title, link, source }) => `<a href="${link}">${title}</a>\n${source}\n`
    )
    .join('\n')
}

export const getUpDownIcon = (val) => {
  return val > 0 ? '🔼 ' : val < 0 ? '🔽 ' : ''
}

export const getStockCaptionTextTemplate = (stockData) => {
  const { stockId, name, currentPrice, risePrice, risePricePerc } = stockData

  const icon = getUpDownIcon(risePrice)

  return `${icon}${stockId} ${name} ${currentPrice} | ${risePrice} (${risePricePerc})`
}

export const getIndexCaptionTextTemplate = (stockData) => {
  const { name, currentPrice, risePrice, risePricePerc } = stockData

  const icon = getUpDownIcon(risePrice)

  return `${icon}${name} ${currentPrice} | ${risePrice} (${risePricePerc})`
}
