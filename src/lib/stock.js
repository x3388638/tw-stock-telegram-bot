import 'isomorphic-fetch'
import { rawUrl } from '../../config'

export const fetchStockData = async (stockId) => {
  const res = await fetch(rawUrl.replace('STOCK_ID', stockId)).then((res) =>
    res.text()
  )
  let parsedRes
  try {
    parsedRes = JSON.parse(res.match(/({.*})/)[1])
  } catch {
    return {}
  }

  const { mem = {}, tick = [] } = parsedRes || {}
  const name = mem.name

  if (!name) {
    return {}
  }

  const currentPrice = tick.pop().p
  const risePrice = (mem[184] >= 0 ? '+' : '') + mem[184].toString()
  const risePricePerc =
    (mem[185] >= 0 ? '+' : '') + mem[185].toFixed(2).toString() + '%'
  const amount = mem[404]
  const sellAmount = mem[645]
  const buyAmount = mem[646]
  const maxPrice = mem[130]
  const minPrice = mem[131]
  const openPrice = mem[126]
  const lastPrice = mem[129]
  let ticks = [
    [mem[101], mem[113]],
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
    return [(tick[0] || '').toString(), (tick[1] || '').toString()]
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
    ticks
  }
}
