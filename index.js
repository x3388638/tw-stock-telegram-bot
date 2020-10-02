import bot from './src/lib/bot'
import { handleStart } from './src/routes/start'
import { handleChart } from './src/routes/chart'
import { handleText } from './src/routes/text'
import { handleCandlestick } from './src/routes/candlestick'
import { handleStockNews } from './src/routes/news'

const routeConfig = {
  '^/start$': handleStart,
  '^/chart': handleChart,
  '^/text': handleText,
  '^/[K|k]': handleCandlestick,
  '^/news(?: (.*))?$': handleStockNews
}

bot.route(routeConfig)
