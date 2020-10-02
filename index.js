import bot from './src/lib/bot'
import { handleChart } from './src/routes/chart'
import { handleStart } from './src/routes/start'

const routeConfig = {
  '^/start$': handleStart,
  '^/chart': handleChart
}

bot.route(routeConfig)
