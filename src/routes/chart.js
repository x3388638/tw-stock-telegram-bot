import screenshot from '../lib/screenshot'

const handleLiveChart = (bot) => {
  bot.onText(/\/chart (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id
    const stockId = match[1]
    const chartBuffer = await screenshot(stockId)

    bot.sendPhoto(chatId, chartBuffer)
  })
}

export default handleLiveChart
