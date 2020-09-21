import {
  INVESTMENT_TRUST_START_BUYING,
  INVESTMENT_TRUST_DAILY_BUY_RANK
} from './actions'
import handleInvestmentTruseStartBuying from './investmentTruseStartBuying'
import handleInvestmentTrustDailyBuyRank from './investmentTrustDailyBuyRank'

const queryHandlers = {
  INVESTMENT_TRUST_START_BUYING: handleInvestmentTruseStartBuying,
  INVESTMENT_TRUST_DAILY_BUY_RANK: handleInvestmentTrustDailyBuyRank
}

const handleAfterHours = (bot) => {
  bot.onText(/\/after_hours$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '查詢盤後資料：', {
      reply_markup: {
        inline_keyboard: [
          [
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

    bot.on('callback_query', (query) => {
      queryHandlers[query.data](bot, query)
    })
  })
}

export default handleAfterHours
