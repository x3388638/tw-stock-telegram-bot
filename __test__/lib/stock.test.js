import fs from 'fs'
import path from 'path'
import { parseRaw, stockDataNormalizer } from '../../src/lib/stock'
import mockStockLimitUpData from '../mock/stock_limit_up.json'

describe('lib/stock parseRaw()', () => {
  it('should return correct object w/ invalid json value', () => {
    const raw = fs.readFileSync(
      path.resolve(__dirname, '../mock/stock_invalid_json_raw.txt'),
      { encoding: 'utf-8' }
    )
    const result = parseRaw(raw)
    expect(result).not.toBe(null)
  })
})

describe('lib/stock stockDataNormalizer()', () => {
  it('should get correct field from raw data', () => {
    const {
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
    } = stockDataNormalizer(mockStockLimitUpData)

    expect(stockId).toBe('6443')
    expect(name).toBe('元晶')
    expect(currentPrice).toBe('24.85')
    expect(risePrice).toBe('+2.25')
    expect(risePricePerc).toBe('+9.96%')
    expect(amount).toBe('40534')
    expect(sellAmount).toBe('8372')
    expect(buyAmount).toBe('31223')
    expect(maxPrice).toBe('24.85')
    expect(minPrice).toBe('22.2')
    expect(openPrice).toBe(undefined)
    expect(lastPrice).toBe('22.6')
    expect(turnover).toBe('9.75')
    expect(ticks[0][0]).toBe('市價')
  })
})
