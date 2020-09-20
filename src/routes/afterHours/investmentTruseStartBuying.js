import screenshot from '../../lib/screenshot'
import {
  investmentTrustStartBuyingTableLocator as locator,
  investmentTrustStartBuyingUrl as url
} from '../../../config'

const handleInvestmentTruseStartBuying = async (bot, { message }) => {
  const chatId = message.chat.id
  const processId = await bot.sendLoadingMsg(chatId)
  const screenshotBuffer = await screenshot(url, locator)
  bot.sendPhoto(chatId, screenshotBuffer)
  bot.deleteMessage(chatId, processId)
}

export default handleInvestmentTruseStartBuying
