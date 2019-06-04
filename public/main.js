const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const canvasHeight = 300
const canvasWidth = 600
const socket = io()

// mouse speed vars
let timeLive = 0
let totalLength = 0

let isWallCollided = false

// Physics
let gacc = 0.1

const mousePos = {
  x: 0,
  y: 0
}

canvas.addEventListener('mousemove', function(e){
  mousePos.x = e.clientX - canvas.getBoundingClientRect().x
  mousePos.y = e.clientY - canvas.getBoundingClientRect().y

  socket.emit('mousePosChange', {
    mousePosX: mousePos.x,
    mousePosY: mousePos.y
  })
})

class Circle{
  constructor(x, y, player, vx, vy, color){
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.player = player
    this.color = color
  }

  draw = () => {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = '#333'
    ctx.arc(this.x, this.y, 20, Math.PI*2, false)
    ctx.fill()
    ctx.stroke()
  }

  update = () => {
    if(this.player == 'player1'){
      socket.on('serverMousePos', data => {
        for(var i = 0; i < data.length; i++){
          this.x = data[i].x
          this.y = data[i].y
        }
      })
    } else {

    }

    this.draw()
  }
}

let circle = new Circle(0, 0, 'player1', 0, 0, '#FF6556')
let circle2 = new Circle(300, 150, 'player2', 0, 0, '#0078E1')

function collide(el1, el2){
  let range = (Math.abs(el1.x - el2.x) + Math.abs(el1.y - el2.y));

  if(range < 50){

  }
}

function animate(){
    timeLive++
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    circle.update()
    circle2.update()

    collide(circle, circle2)

}

animate()
