import {
  INVESTMENT_TRUST_START_BUYING,
  INVESTMENT_TRUST_DAILY_BUY_RANK,
  FOREIGN_INVESTOR_DAILY_BUY_RANK
} from './actions'
import handleInvestmentTruseStartBuying from './investmentTruseStartBuying'
import handleInstitutionalInvestorDailyBuyRank from './institutionalInvestorDailyBuyRank'

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
