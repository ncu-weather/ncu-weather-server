const express = require('express')
const app = express()
const http = require('http')
const ncu = require('ncu')


app.use(require('./config/cors'))
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
app.get('/ncuatm', (req, res) => {
  ncu.weatherAtm().then(data => {
    res.json(data)
  }).catch(err => {
    res.status(503).json({
      err: err.message
    })
  })
})
app.get('/ncu', (req, res) => {
  ncu.weather().then(data => {
    res.json(data)
  }).catch(err => {
    res.status(400).json(err.message)
  })
})
app.get('/time', (req, res) => {
  res.json({
    time: ncu.time()
  })
})
app.get('/bonus', (req, res) => {
  res.json({
    bonus: ncu.bonus()
  })
})


const PORT = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})