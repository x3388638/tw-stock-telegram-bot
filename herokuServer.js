import http from 'http'

const port = process.env.PORT

if (port) {
  const webServer = http.createServer((req, res) => {
    res.write('ok')
    res.end()
  })

  webServer.listen(port)

  setInterval(() => {
    http.get('https://tw-stock-telegram-bot.herokuapp.com/')
  }, 1000 * 60 * 14)
}
