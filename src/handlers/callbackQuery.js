import { afterHoursCallbackQueryHandlers } from './afterHours'

export function handleCallbackQuery(query) {
  const handlers = { ...afterHoursCallbackQueryHandlers }
  handlers[query.data].call(this, query)
  this.answerCallbackQuery(query.id)
}
