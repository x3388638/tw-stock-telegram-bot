import start from './start'
import chart from './chart'

const setup = (bot) => {
  start(bot)
  chart(bot)
}

export default {
  setup
}
