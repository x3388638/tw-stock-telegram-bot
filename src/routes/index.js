import start from './start'
import chart from './chart'
import text from './text'

const setup = (bot) => {
  start(bot)
  chart(bot)
  text(bot)
}

export default {
  setup
}
