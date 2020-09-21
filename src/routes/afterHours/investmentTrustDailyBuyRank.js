import screenshot from '../../lib/screenshot'
import {
  investmentTrustDailyBuyUrl,
  investmentTrustDailyBuyDateLocator,
  investmentTrustDailyBuyTableLocator
} from '../../../config'

const handleInvestmentTrustDailyBuyRank = async (bot, { message }) => {
  const chatId = message.chat.id
  const processId = await bot.sendLoadingMsg(chatId)
  const [dateBuffer, tableBuffer] = await Promise.all([
    screenshot(investmentTrustDailyBuyUrl, investmentTrustDailyBuyDateLocator, {
      waitFor: investmentTrustDailyBuyDateLocator
    }),
    screenshot(
      investmentTrustDailyBuyUrl,
      investmentTrustDailyBuyTableLocator,
      {
        waitFor: investmentTrustDailyBuyTableLocator
      }
    )
  ])

  const { message_id: dataMsgId } = await bot.sendPhoto(chatId, dateBuffer)
  bot.sendPhoto(chatId, tableBuffer, {
    reply_to_message_id: dataMsgId
  })
  bot.deleteMessage(chatId, processId)
}

export default handleInvestmentTrustDailyBuyRank
