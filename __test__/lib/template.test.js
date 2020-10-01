const {
  getIndexHTMLTemplate,
  getStockHTMLTemplate,
  getNewsListHTMLTemplate,
  getUpDownIcon,
  getStockCaptionTextTemplate,
  getIndexCaptionTextTemplate
} = require('../../src/lib/template')
import { stockDataNormalizer } from '../../src/lib/stock'
import mockStockLimitUpData from '../mock/stock_limit_up.json'
import mockStockNews from '../mock/stock_news.json'
const mockStockData = stockDataNormalizer(mockStockLimitUpData)

describe('lib/template getIndexHTMLTemplate()', () => {
  it('should return correct template', () => {
    expect(getIndexHTMLTemplate(mockStockData)).toMatchSnapshot()
  })
})

describe('lib/template getStockHTMLTemplate()', () => {
  it('it should return correct template', () => {
    expect(getStockHTMLTemplate(mockStockData)).toMatchSnapshot()
  })
})

describe('lib/template getNewsListHTMLTemplate()', () => {
  it('it should return correct template', () => {
    expect(getNewsListHTMLTemplate(mockStockNews)).toMatchSnapshot()
  })
})

describe('lib/template getUpDownIcon()', () => {
  it('it should return correct icon', () => {
    expect(getUpDownIcon('1')).toEqual('🔼 ')
    expect(getUpDownIcon('-1')).toEqual('🔽 ')
    expect(getUpDownIcon('0')).toEqual('')
  })
})

describe('lib/template getStockCaptionTextTemplate()', () => {
  it('it should return correct template', () => {
    expect(getStockCaptionTextTemplate(mockStockData)).toMatchSnapshot()
  })
})

describe('lib/template getIndexCaptionTextTemplate()', () => {
  it('it should return correct template', () => {
    expect(getIndexCaptionTextTemplate(mockStockData)).toMatchSnapshot()
  })
})
