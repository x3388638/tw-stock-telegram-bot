import screenshot from '../../lib/screenshot'
import {
  investmentTrustDailyBuyUrl,
  foreignInvestorDailyBuyUrl,
  investmentTrustDailyBuyDateLocator,
  foreignInvestorDailyBuyDateLocator,
  investmentTrustDailyBuyTableLocator,
  foreignInvestorDailyBuyTableLocator
} from '../../../config'
import {
  INVESTMENT_TRUST_DAILY_BUY_RANK,
  FOREIGN_INVESTOR_DAILY_BUY_RANK
} from './actions'

const handleInstitutionalInvestorDailyBuyRank = (
  type = INVESTMENT_TRUST_DAILY_BUY_RANK
) => async (bot, { message }) => {
  const chatId = message.chat.id
  const processId = await bot.sendLoadingMsg(chatId)
  let url, dateLocator, tableLocator

  switch (type) {
    case FOREIGN_INVESTOR_DAILY_BUY_RANK: {
      url = foreignInvestorDailyBuyUrl
      dateLocator = foreignInvestorDailyBuyDateLocator
      tableLocator = foreignInvestorDailyBuyTableLocator
      break
    }

    case INVESTMENT_TRUST_DAILY_BUY_RANK: {
      url = investmentTrustDailyBuyUrl
      dateLocator = investmentTrustDailyBuyDateLocator
      tableLocator = investmentTrustDailyBuyTableLocator
      break
    }
  }

  const [dateBuffer, tableBuffer] = await Promise.all([
    screenshot(url, dateLocator, {
      waitFor: dateLocator
    }),
    screenshot(url, tableLocator, {
      waitFor: tableLocator
    })
  ])

  // TODO: error handling
  const { message_id: dataMsgId } = await bot.sendPhoto(chatId, dateBuffer)
  bot.sendPhoto(chatId, tableBuffer, {
    reply_to_message_id: dataMsgId
  })
  bot.deleteMessage(chatId, processId)
}

export default handleInstitutionalInvestorDailyBuyRank
