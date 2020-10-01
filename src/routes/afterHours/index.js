import {
  INVESTMENT_TRUST_START_BUYING,
  INVESTMENT_TRUST_DAILY_BUY_RANK,
  FOREIGN_INVESTOR_DAILY_BUY_RANK
} from './actions'
import handleInvestmentTruseStartBuying from './investmentTruseStartBuying'
import handleInstitutionalInvestorDailyBuyRank from './institutionalInvestorDailyBuyRank'
import { fetchStockData, isStockIdValid } from '../../lib/stock'
import { stockAfterHoursLocator, stockAfterHoursUrl } from '../../../config'
import { screenshot } from '../../lib/page'
import { getStockCaptionTextTemplate } from '../../lib/template'

export const afterHoursCallbackQueryHandlers = {
  INVESTMENT_TRUST_START_BUYING: handleInvestmentTruseStartBuying,
  INVESTMENT_TRUST_DAILY_BUY_RANK: handleInstitutionalInvestorDailyBuyRank(
    INVESTMENT_TRUST_DAILY_BUY_RANK
  ),
  FOREIGN_INVESTOR_DAILY_BUY_RANK: handleInstitutionalInvestorDailyBuyRank(
    FOREIGN_INVESTOR_DAILY_BUY_RANK
  )
}

const handleAfterHours = (bot) => {
  bot.onText(/\/after_hours (.*)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]

    if (!isStockIdValid(stockId)) {
      return bot.sendMessage(
        chatId,
        '請輸入有效股號\ne.g. `/after_hours 2330`',
        {
          parse_mode: 'Markdown'
        }
      )
    }

    const stockData = await fetchStockData(stockId)
    if (!stockData.name) {
      return bot.sendStockIdNotFoundError(chatId, stockId)
    }

    const processId = await bot.sendLoadingMsg(chatId)
    const locator = stockAfterHoursLocator
    const url = stockAfterHoursUrl.replace('STOCK_ID', stockId)
    const chartBuffer = await screenshot(url, locator)

    bot.sendPhoto(chatId, chartBuffer, {
      caption: getStockCaptionTextTemplate(stockData)
    })
    bot.deleteMessage(chatId, processId)
  })

  bot.onText(/\/after_hours$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '查詢盤後資料：', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: '外資買超排行',
              callback_data: FOREIGN_INVESTOR_DAILY_BUY_RANK
            },
            {
              text: '投信買超排行',
              callback_data: INVESTMENT_TRUST_DAILY_BUY_RANK
            }
          ],
          [
            {
              text: '投信連續無買賣超轉買進 – 日',
              callback_data: INVESTMENT_TRUST_START_BUYING
            }
          ]
        ]
      }
    })
  })
}

export default handleAfterHours
