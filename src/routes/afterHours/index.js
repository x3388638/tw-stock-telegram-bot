import { INVESTMENT_TRUST_START_BUYING } from './actions'
import handleInvestmentTruseStartBuying from './investmentTruseStartBuying'

const queryHandlers = {
  INVESTMENT_TRUST_START_BUYING: handleInvestmentTruseStartBuying
}

const handleAfterHours = (bot) => {
  bot.onText(/\/after_hours$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, '查詢盤後資料：', {
      reply_markup: {
        inline_keyboard: [
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
