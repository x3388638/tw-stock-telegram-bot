import start from './start'
import chart from './chart'
import text from './text'
import candlestick from './candlestick'
import stockNews from './news'

const setup = (bot) => {
  start(bot)
  chart(bot)
  text(bot)
  candlestick(bot)
  stockNews(bot)
}

export default {
  setup
}
