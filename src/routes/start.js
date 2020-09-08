const startHandler = (bot) => {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, 'Welcome')
  })
}

export default startHandler
