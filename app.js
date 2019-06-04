const express = require('express')
const app = express()
const serv = require('http').Server(app)
const io = require('socket.io')(serv, {})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html')
})

app.use('/', express.static(__dirname + '/public'))

serv.listen(3000)

const SOCKET_LIST = {}
let users = 0;

io.sockets.on('connection', socket => {
  users++

  socket.id = Math.random()
  SOCKET_LIST[socket.id] = socket

  socket.on('disconnect', () => users--)

  socket.on('mousePosChange', data => {
    let pack = []

    for(var i in SOCKET_LIST){
      let socket = SOCKET_LIST[i]
      pack.push({
        x: data.mousePosX,
        y: data.mousePosY
      })
    }

    for(var i in SOCKET_LIST){
      let socket = SOCKET_LIST[i]
      socket.emit('serverMousePos', pack)
    }
  })

})
