
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const cWidth = canvas.width
const cHeigh = canvas.height

let beecOn = false
let center = {
    x: 50,
    y: 50
}
let mousePosi = {
    x: 50,
    y: 50
}

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
    console.log('beeOn', beecOn)

    if (beecOn) {
        center.x = event.offsetX
        center.y = event.offsetY
    }
    console.log('x=', center.x, '  y=', center.y)

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
    this.xSpeed = rndab(-2, 2)
    this.ySpeed = rndab(-2, 2)
}
Ball.prototype.draw = function () {
    ctx.strokeStyle = "Black"
    ctx.fillStyle = "Black"
    circle(this.x, this.y, 10, true)
}
Ball.prototype.move = function () {

    

    if (rndab(0, 100) < 10  && beecOn) {
        if (center.x > this.x && this.x>40) { this.xSpeed -= rndab(0, 3) }
        if (center.x < this.x && this.x<cWidth-40) { this.xSpeed += rndab(0, 3) }
        if (center.y > this.y && this.y>40) { this.ySpeed -= rndab(0, 3) }
        if (center.y < this.y && this.y<cHeigh-40) { this.ySpeed += rndab(0, 3) }
    }
if(this.xSpeed>4) this.xSpeed=4
if(this.xSpeed<-4) this.xSpeed=-4
if(this.ySpeed>4) this.ySpeed=4
if(this.ySpeed<-4) this.ySpeed=-4

    this.x += this.xSpeed
    this.y += this.ySpeed

}
Ball.prototype.checkOut = function () {
    if (this.x < 40 || this.x > (cWidth - 40)) {
        this.xSpeed = - this.xSpeed
    }
    if (this.y < 40 || this.y > (cHeigh - 40)) {
        this.ySpeed = - this.ySpeed
    }
}

let ball = new Ball()

setInterval(function () {

    if (beecOn) {
        ctx.clearRect(0, 0, cWidth, cHeigh)
        drawBee(center.x, center.y)
        
        let dx1 = 0
        let dy1 = 0
        let speed = 0.6


        if (mousePosi.x > center.x) dx1 = speed
        else {
            if (mousePosi.x < center.x) dx1 = -speed
        }

        if (mousePosi.y > center.y) dy1 = speed
        else {
            if (mousePosi.y < center.y) dy1 = -speed
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
