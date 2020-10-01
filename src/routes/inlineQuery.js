import { fetchStockData, fetchStockNews, isStockIdValid } from '../lib/stock'
import { getIndexHTMLTemplate, getNewsListHTMLTemplate } from '../lib/template'
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
            type: 'article',
            title: '加權指數現價',
            input_message_content: {
              message_text: getIndexHTMLTemplate(tseData),
              parse_mode: 'HTML'
            },
            id: 'text_tse'
          },
          {
            type: 'article',
            title: '櫃買指數現價',
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
    } else {
      if (isStockIdValid(query)) {
        const newsList = await fetchStockNews(query)
        if (newsList && newsList.length) {
          bot.answerInlineQuery(id, [
            {
              type: 'article',
              title: `${query} 相關新聞`,
              input_message_content: {
                message_text: getNewsListHTMLTemplate(newsList),
                parse_mode: 'HTML',
                disable_web_page_preview: true
              },
              id: `news_${query}`
            }
          ])
        }
      }
    }
  })
}

export default handleInlineQuery
