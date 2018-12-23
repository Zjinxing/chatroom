
let socket = io('http://101.132.37.149:8181')
let chatRec = document.getElementById('chatting-records')
let chatValue = document.getElementById('ipt')
let send = document.getElementById('send')
let ip = returnCitySN['cip']

function sendMsg() {
  if(chatValue.value) {
    socket.emit('sendMsg', chatValue.value)
    chatValue.value = ''
  } else {
    alert('消息不能为空')
  }
}
function recieveMsg (msg) {
  console.log('收到服务端发来的消息：' + msg)
  let p = document.createElement('p')
  let txt = document.createTextNode(ip + ':' + msg)
  p.appendChild(txt)
  chatRec.appendChild(p)
  chatRec.scrollTop = chatRec.scrollHeight;
}
socket.on('connected', function (msg) {
  let p = document.createElement('p')
  let txt = document.createTextNode(msg)
  p.appendChild(txt)
  chatRec.appendChild(p)
})
socket.on('sendMsg', recieveMsg)
send.onclick = sendMsg
chatValue.addEventListener('keyup', function (e) {
  // console.log(e.keyCode)
  if (e.keyCode === 13) {
    e.preventDefault()
    sendMsg()
  }
})