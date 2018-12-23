const server = require('http').createServer()
const io = require('socket.io')(server)
server.listen(8181)

io.on('connection', socket => {
  let id = socket.id
  let remote = socket.request.connection.remoteAddress 
  let ip = remote.split(':')
  ip = ip[ip.length - 1]
  console.log(ip + '进入了房间')

  io.emit('connected', ip + '进入了房间')
  socket.on('disconnect', function() {
  	console.log('连接已断开')
  })
  
  socket.on('sendMsg', function(msg) {
    console.log('收到消息：' + msg)
    io.emit('sendMsg', msg)
  })
})

