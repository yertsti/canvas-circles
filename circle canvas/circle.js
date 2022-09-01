
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

function randomIntFromRange(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

// Objects
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians=Math.random()*Math.PI*2;
    this.velocity=.05;
    this.distanceFromCenter=randomIntFromRange(100,190)
    this.lastMouse={
        x:x,
        y:y};

Object.prototype.draw = function(lastPoint) {
    c.beginPath();
    c.strokeStyle=this.color;
    c.lineWidth=this.radius;
    c.moveTo(lastPoint.x,lastPoint.y);
    c.lineTo(this.x,this.y);
    c.stroke()
    c.closePath();
}

Object.prototype.update = function() {
    const lastPoint={
        x:this.x,
        y:this.y
    }

    this.lastMouse.x+=(mouse.x-this.lastMouse.x)*.05
    this.lastMouse.y+=(mouse.y-this.lastMouse.y)*.05

    this.radians+=this.velocity;
    this.x= this.lastMouse.x+Math.cos(this.radians)*this.distanceFromCenter;
    this.y= this.lastMouse.y+Math.sin(this.radians)*this.distanceFromCenter;
    this.draw(lastPoint)

}
}
// Implementation
let particles
function init(){
    particles=[];
    for (let i=0;i<19;i++){
        const radius=(Math.random()*5)+1;
        particles.push(new Particle(canvas.width/2, canvas.height/2, radius, 
            colors[randomIntFromRange(0,3)]));
            console.log(particles[i].x)
    }
}
// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle='rgba(255,255,255,.1)';
    c.fillRect(0,0,canvas.width,canvas.height);


     particles.forEach(Particle => {
      Particle.update();
     });
}

init()
animate()