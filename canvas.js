

// Create a canvas with width and height 
let cWidth = document.getElementById("main").offsetWidth
let cHeigh = document.getElementById("main").offsetHeight
const $main = document.querySelector('#main')
$main.insertAdjacentHTML('beforeend',
    `<canvas id="canvas" class="canvas" width="${cWidth}" height="${cHeigh}"></canvas>`)

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

//console.log(cWidth, cHeigh)

let dist = 300
let beecOn = false
let speedBee = 0

let center = {
    x: 50,
    y: 50
}
let mousePosi = {
    x: 50,
    y: 50
}

let input = document.getElementById('volume')

input.addEventListener('change', function(){
    speedBee=this.value/75
}, false)
  


// input.addEventListener('change', function(){
//   //  console.log(this.value)
   
// }, false)








const circle = function (x, y, radius, fillCircle) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    if (fillCircle) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}

const drawBee = function (x, y) {
    ctx.lineWidth = 2
    ctx.strokeStyle = "Black"
    ctx.fillStyle = "Gold"
    circle(x, y, 8, true)
    circle(x, y, 8, false)
    circle(x - 5, y - 11, 5, false)
    circle(x + 5, y - 11, 5, false)
    circle(x - 2, y - 1, 2, false)
    circle(x + 2, y - 1, 2, false)
}

$('#canvas').click(cl = (event) => {

    beecOn = beecOn ? false : true


    if (beecOn) {
        center.x = event.offsetX
        center.y = event.offsetY
    }


})

$('#canvas').mousemove(mmove = (event) => {
    mousePosi.x = event.offsetX
    mousePosi.y = event.offsetY
})

function rndab(a, b) {

    return (Math.random() * (b - a)) + a

}

const Ball = function () {
    this.x = Math.round(rndab(40, 500))
    this.y = Math.round(rndab(40, 500))
    this.xspeedBee = rndab(-4, 4)
    this.yspeedBee = rndab(-4, 4)
}
Ball.prototype.draw = function () {
    ctx.strokeStyle = "Black"
    ctx.fillStyle = "Black"
    circle(this.x, this.y, 10, true)
}
Ball.prototype.move = function () {

    if (beecOn) {
        dist = Math.sqrt((this.x - center.x) ** 2 + (this.y - center.y) ** 2)
    }
    if (dist < 350) {
        if (rndab(0, 100) < 7 && beecOn) {
            if (center.x > this.x && this.x > 40) { this.xspeedBee -= rndab(0, 4) }
            if (center.x < this.x && this.x < cWidth - 40) { this.xspeedBee += rndab(0, 4) }
            if (center.y > this.y && this.y > 40) { this.yspeedBee -= rndab(0, 4) }
            if (center.y < this.y && this.y < cHeigh - 40) { this.yspeedBee += rndab(0, 4) }
        }
    }



    if (dist < 100) {
        if (rndab(0, 100) < 5 && beecOn) {
            this.xspeedBee = - this.xspeedBee
            this.yspeedBee = - this.yspeedBee
        }

    }


    if (this.xspeedBee > 4) this.xspeedBee = 4
    if (this.xspeedBee < -4) this.xspeedBee = -4
    if (this.yspeedBee > 4) this.yspeedBee = 4
    if (this.yspeedBee < -4) this.yspeedBee = -4

    this.x += this.xspeedBee
    this.y += this.yspeedBee

}
Ball.prototype.checkOut = function () {
    if (this.x < 40 || this.x > (cWidth - 40)) {
        this.xspeedBee = - this.xspeedBee
    }
    if (this.y < 40 || this.y > (cHeigh - 40)) {
        this.yspeedBee = - this.yspeedBee
    }
}

let ball = new Ball()

setInterval(function () {

    if (beecOn) {
        ctx.clearRect(0, 0, cWidth, cHeigh)
        drawBee(center.x, center.y)

        let dx1 = 0
        let dy1 = 0
        


        if (mousePosi.x > center.x) dx1 = speedBee
        else {
            if (mousePosi.x < center.x) dx1 = -speedBee
        }

        if (mousePosi.y > center.y) dy1 = speedBee
        else {
            if (mousePosi.y < center.y) dy1 = -speedBee
        }

        let dx = (Math.floor(Math.random() * (3 + dx1)) - 1) * 6
        let dy = (Math.floor(Math.random() * (3 + dy1)) - 1) * 6
        if (dx >= 0 || center.x > 10) { center.x += dx }
        if (dy >= 0 || center.y > 10) { center.y += dy }

    }
    else {
        ctx.clearRect(0, 0, cWidth, cHeigh)
    }

    ball.draw()
    ball.move()
    ball.checkOut()
    mousePosi.x = ball.x
    mousePosi.y = ball.y

}, 30)
