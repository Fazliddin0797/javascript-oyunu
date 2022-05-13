var cvs=document.getElementById('game')
var ctx=cvs.getContext('2d')


var drawRect= (x,y,w,h,color) =>{
    ctx.fillStyle=color
    ctx.fillRect(x,y,w,h)

}

var drawCircleF = (x,y,r,color) =>{
    ctx.fillStyle=color
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*Math.PI,false)
    ctx.closePath()
    ctx.fill()
}
var drawCircleS = (x,y,r,w,color) =>{
    ctx.strokeStyle=color
    ctx.lineWidth=w
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*Math.PI)
    ctx.closePath()
    ctx.stroke()
}
var drawText = (text,x,y,color) => {
    ctx.fillStyle=color
    ctx.font='50px sans-serif'
    ctx.fillText(text,x,y)
}
drawRect(0,0,600,400,'#000')
drawCircleF(50,50,10,'#fff')
drawCircleS(250,250,50,10,'#fff')
drawText('deneme',200,100,'#fff')

var user = {
    x:20,
    y:cvs.height/2-50,
    w:10,
    h: 100,
    color:'#fff',
    score:0

}

var comp = {
    x: cvs.width-30,
    y:cvs.height/2-50,
    w:10,
    h: 100,
    color:'#fff',
    score:0

}
var ball = {
    x:cvs.width/2,
    y:cvs.height/2,
    r:10,
    color: '#000000',
    speed:6,
    velocityX: 3,
    velocityY: 4,
    stop:true



}
var movePaddle = (e) =>{
    let rect = cvs.getBoundingClientRect()
    user.y = e.clientY - rect.top-user.h/2
    ball.stop = false

}
cvs.addEventListener('mousemove', movePaddle)

var collision = (b,p) => {
    b.top = b.y - b.r
    b.bottom = b.y + b.r
    b.left = b.x - b.r
    b.right = b.x + b.r

    p.top = p.y
    p.bottom = p.y + p.h
    p.left = p.x
    p.right = p.x + p.w

    return (b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left)

}
var resetBall = () => {
    ball.x = cvs.width/2
    ball.y = cvs.height/2

    ball.speed =5
    ball.velocityX = 3
    ball.velocityY = 4
    ball.stop = true
}


var update = () =>{
    if(!ball.stop){
        ball.x += ball.velocityX
        ball.y += ball.velocityY
    }

    if(ball.y + ball.r > cvs.height || ball.y - ball.r<0)
    ball.velocityY = -ball.velocityY

    let compLvl = 0.1
    comp.y += (ball.y - (comp.y+comp.h/2))* compLvl

    let player = (ball.x < cvs.width/2) ? user : comp

    if(collision(ball,player)){
        let intersectY = ball.y - (player.y + player.h/2)
        intersectY /= player.h/2

        let maxBounceRate = Math.PI/3
        let bounceAngle = intersectY * maxBounceRate

        let direction = (ball.x < cvs.width/2) ? 1 : -1

        ball.velocityX = direction * ball.speed * Math.cos(bounceAngle)
        ball.velocityY = ball.speed * Math.sin(bounceAngle)

        ball.speed += 2

    }
    if(ball.x > cvs.width){
        user.score++
        resetBall()
    }
    else if(ball.x < 0){
        comp.score++
        resetBall()
    }
    
}


var render =()=> {
    drawRect(0,0,cvs.width, cvs.clientHeight,'#0099e5')
    drawRect(cvs.width/2-2,0,4, cvs.height, '#fff')
    drawCircleF(cvs.width/2, cvs.height/2, 8, '#fff')
    drawCircleS(cvs.width/2, cvs.height/2, 50,4, '#fff')
    drawText(user.score, cvs.width/4, 50, '#fff')
    drawText(comp.score, 3*cvs.width/4, 50, '#fff')

    drawRect(user.x,user.y,user.w,user.h,user.color)
    drawRect(comp.x,comp.y,comp.w,comp.h,comp.color)
    drawCircleF(ball.x,ball.y,ball.r,ball.color)
}
var game = () => {
    update()
    render()

}
var fps = 25
setInterval(game,1000/fps)






































//