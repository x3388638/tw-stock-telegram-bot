import start from './start'
import chart from './chart'
import text from './text'
import candlestick from './candlestick'

const setup = (bot) => {
  start(bot)
  chart(bot)
  text(bot)
  candlestick(bot)
}

export default {
  setup
}
