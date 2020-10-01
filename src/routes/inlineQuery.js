import { fetchStockData } from '../lib/stock'
import { getIndexHTMLTemplate } from '../lib/template'
import { tseId, otcId } from '../../config'

const handleInlineQuery = (bot) => {
  bot.on('inline_query', async ({ id, query }) => {
    if (query === '') {
      const [tseData, otcData] = await Promise.all([
        fetchStockData(tseId),
        fetchStockData(otcId)
      ])

      await bot.answerInlineQuery(
        id,
        [
          {
            title: '加權指數現價',
            type: 'article',
            input_message_content: {
              message_text: getIndexHTMLTemplate(tseData),
              parse_mode: 'HTML'
            },
            id: 'text_tse'
          },
          {
            title: '櫃買指數現價',
            type: 'article',
            input_message_content: {
              message_text: getIndexHTMLTemplate(otcData),
              parse_mode: 'HTML'
            },
            id: 'text_otc'
          }
        ],
        {
          cache_time: 0
        }
      )
    }
  })
}

export default handleInlineQuery
