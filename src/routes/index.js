import start from './start'
import chart from './chart'
import text from './text'
import candlestick from './candlestick'
import stockNews from './news'
import afterHours from './afterHours'
import callbackQuery from './callbackQuery'

const setup = (bot) => {
  start(bot)
  chart(bot)
  text(bot)
  candlestick(bot)
  stockNews(bot)
  afterHours(bot)
  callbackQuery(bot)
}

export default {
  setup
}
