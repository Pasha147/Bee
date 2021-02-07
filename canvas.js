

// ===================Create a canvas with width and height================= 
let cWidth = document.getElementById("main").offsetWidth
let cHeigh = document.getElementById("main").offsetHeight
const $main = document.querySelector('#main')
$main.insertAdjacentHTML('beforeend',
    `<canvas id="canvas" class="canvas" width="${cWidth}" height="${cHeigh}"></canvas>`)

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
///===================================


let dist = 300
let beecOn = false
//let beeAngr = 0
let numberBee = 0

let center = {
    x: rndab(50, cWidth-50),
    y: rndab(50, cHeigh-50)
}
let mousePosi = {
    x: 50,
    y: 50
}



// ====================Get the Bee angry (input1 asideRight)====================
 let input = document.getElementById('volume')
 let beeAngr=input.value/75
input.addEventListener('change', function () {
    beeAngr = this.value / 75
}, false)
///========================================

// ===============Get the nmber of bees (input2 asideRight)=====================
let input2 = document.getElementById('volume2')
input2.addEventListener('change', function () {
    numberBee = Number(this.value)
    if (numberBee===0){ beecOn=false
    }else{beecOn=true } 
   }, false)
///========================================


// ==============Create the Bee class============================================
class Bee {
    constructor() {
        this.center = {  
            x: rndab(50, cWidth-50),
            y: rndab(50, cHeigh-50)
        }
        this.target = mousePosi
    }

    calcMove(beeAngr) {

        let dx1 = 0
        let dy1 = 0


        if (this.target.x > this.center.x) dx1 = beeAngr
        else {
            if (this.target.x < this.center.x) dx1 = -beeAngr
        }

        if (this.target.y > this.center.y) dy1 = beeAngr
        else {
            if (this.target.y < this.center.y) dy1 = -beeAngr
        }

        let dx = (Math.floor(Math.random() * (3 + dx1)) - 1) * 6
        let dy = (Math.floor(Math.random() * (3 + dy1)) - 1) * 6
        if (dx >= 0 || this.center.x > 10) { this.center.x += dx }
        if (dy >= 0 || this.center.y > 10) { this.center.y += dy }
        return this.center
    }

    drow() {
        let x = this.center.x
        let y = this.center.y
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

}
///========================================================


let bee = new Bee()
let bee2 = new Bee()
let bee3 = new Bee()
let bee4 = new Bee()
let bee5 = new Bee()
let bee6 = new Bee()
let bee7 = new Bee()
let bee8 = new Bee()
let bee9 = new Bee()
let bee10 = new Bee()


setInterval(function () {

    ctx.clearRect(0, 0, cWidth, cHeigh)
    ball.draw()

    if (beecOn) {

        if (numberBee >= 1) {
            bee.drow()
            center = bee.calcMove(beeAngr)
        }
        if (numberBee >= 2) {
            bee2.drow()
            bee2.calcMove(beeAngr)
        }

        if (numberBee >= 3) {
            bee3.drow()
            bee3.calcMove(beeAngr)
        }
        if (numberBee >= 4) {
            bee4.drow()
            bee4.calcMove(beeAngr)
        }
        if (numberBee >= 5) {
            bee5.drow()
            bee5.calcMove(beeAngr)
        }
        if (numberBee >= 6) {
            bee6.drow()
            bee6.calcMove(beeAngr)
        }

        if (numberBee >= 7) {
            bee7.drow()
            bee7.calcMove(beeAngr)
        }
        if (numberBee >= 8) {
            bee8.drow()
            bee8.calcMove(beeAngr)
        }
        if (numberBee >= 9) {
            bee9.drow()
            bee9.calcMove(beeAngr)
        }
        if (numberBee >= 10) {
            bee10.drow()
            bee10.calcMove(beeAngr)
        }


    }


    ball.move()
    ball.checkOut()
    mousePosi.x = ball.x
    mousePosi.y = ball.y

}, 30)




function circle(x, y, radius, fillCircle) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2, false)
    if (fillCircle) {
        ctx.fill()
    } else {
        ctx.stroke()
    }
}


$('#canvas').click(cl = (event) => {

    beecOn = beecOn ? false : true

    if (beecOn) {
        bee.center.x = event.offsetX
        bee.center.y = event.offsetY
        numberBee = 1
        input2.value=1

    } else {
        numberBee = 0
        input2.value=0
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
    ctx.fillStyle = "maroon"
    circle(this.x, this.y, 20, true)
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

