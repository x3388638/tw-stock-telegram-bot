export function handleStart(msg) {
  const chatId = msg.chat.id

  this.sendMessage(
    chatId,
    `歡迎使用盤中飧守護神，守護你盤中的便當錢

<b>盤中走勢圖</b>
<code>/chart 2330</code> - 查詢盤中即時走勢圖
/chart_tse - 查詢盤中加權指數走勢圖
/chart_otc - 查詢盤中櫃買指數走勢圖

<b>盤中價量及五檔資訊</b>
<code>/text 2330</code> - 查詢盤中即時價量及五檔
/text_tse - 查詢盤中加權指數狀態
/text_otc - 查詢盤中櫃買指數狀態

<b>近期 K 線圖</b>
<code>/k 2330</code> - 查詢指定股票近期 K 線
/k_tse - 查詢加權指數近期 K 線
/k_otc - 查詢櫃買指數近期 K 線

<b>盤後資料</b>
/after_hours - 查詢各式盤後資料
<code>/after_hours 2330</code> - 查詢個股盤後資料

<b>其他</b>
<code>/news 2330</code> - 查詢指定股票相關新聞

資料來源: <a href="https://tw.stock.yahoo.com/">Yahoo!奇摩股市</a>、<a href="https://goodinfo.tw/StockInfo/index.asp">Goodinfo!台灣股市資訊網</a>、<a href="https://www.twse.com.tw/zh/">臺灣證券交易所</a>`,
    {
      parse_mode: 'HTML',
      disable_web_page_preview: true
    }
  )
}
