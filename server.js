const express = require('express')
const app = express()
const http = require('http')
const ncu = require('ncu')


app.get('/', (req, res) => {
  ncu.weatherAtm().then(data => {
    res.json(data)
  }).catch(err => {
    res.json(err.message)
  })
})
app.get('/ncu', (req, res) => {
  ncu.weather().then(data => {
    res.json(data)
  }).catch(err => {
    res.json(err.message)
  })
})
app.get('/time', (req, res) => {
  res.json(ncu.time())
})
app.get('/bonus', (req, res) => {
  res.json(ncu.bonus())
})


process.env.PORT = 3000
const server = http.createServer(app)
server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})