import bot from './src/lib/bot'
import { handleStart } from './src/handlers/start'
import { handleChart } from './src/handlers/chart'
import { handleText } from './src/handlers/text'
import { handleCandlestick } from './src/handlers/candlestick'
import { handleStockNews } from './src/handlers/news'
import { handleAfterHours } from './src/handlers/afterHours'
import './herokuServer'

const routeConfig = {
  '^/start$': handleStart,
  '^/chart': handleChart,
  '^/text': handleText,
  '^/[K|k]': handleCandlestick,
  '^/news(?: (.*))?$': handleStockNews,
  '^/after_hours(?: (.*))?$': handleAfterHours
}

bot.route(routeConfig)
