const startHandler = (bot) => {
  bot.onText(/\/start$/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(
      chatId,
      `歡迎使用盤中飧守護神，守護你盤中的便當錢

服務項目:
\`/chart 2330\` - 查詢盤中即時走勢圖
/chart_tse - 查詢盤中加權指數走勢圖
/chart_otc - 查詢盤中櫃買指數走勢圖
\`/text 2330\` - 查詢盤中即時價量及五檔

資料來源: [Yahoo!奇摩股市](https://tw.stock.yahoo.com/)`,
      {
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      }
    )
  })
}

export default startHandler
