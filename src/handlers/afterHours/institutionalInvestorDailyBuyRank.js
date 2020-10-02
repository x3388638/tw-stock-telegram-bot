import { screenshot, getElementInnerText } from '../../lib/page'
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
) =>
  async function ({ message }) {
    const chatId = message.chat.id
    const processId = await this.sendLoadingMsg(chatId)
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

    const [date, tableBuffer] = await Promise.all([
      getElementInnerText(url, dateLocator),
      screenshot(url, tableLocator, {
        waitFor: tableLocator
      })
    ])

    this.sendPhoto(chatId, tableBuffer, {
      caption: date
    })
    this.deleteMessage(chatId, processId)
  }

export default handleInstitutionalInvestorDailyBuyRank
