import start from './start'
import chart from './chart'
import text from './text'
import candlestick from './candlestick'
import stockNews from './news'
import afterHours from './afterHours'

const setup = (bot) => {
  start(bot)
  chart(bot)
  text(bot)
  candlestick(bot)
  stockNews(bot)
  afterHours(bot)
}

export default {
  setup
}
