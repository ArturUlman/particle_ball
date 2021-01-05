const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRgbValue() {
  const red = randomIntFromRange(231, 246);
  const green = randomIntFromRange(71, 76);
  const blue = randomIntFromRange(60, 71);

  return `rgba(${red},${green},${blue},1)`;
}

function Particle(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radians = Math.random() * Math.PI * 3;
  this.velocity = 0.02;
  this.distanceFromCenter =
    //this for 2d randomIntFromRange(50, 220);
    // this makes 3D
    { x: randomIntFromRange(10, 220), y: randomIntFromRange(10, 220) };

  this.update = () => {
    //move points over time
    const lastPoint = { x: this.x, y: this.y };
    this.radians += this.velocity;
    this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x;
    this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y;
    this.draw(lastPoint);
  };

  this.draw = (lastPoint) => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y); //prev frame
    c.lineTo(this.x, this.y); // next frame
    c.stroke();
    // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.fillStyle = this.color;
    // c.fill();
    c.closePath();
  };
}

let particles;
function init() {
  particles = [];

  for (let i = 0; i < 220; i++) {
    const radius = Math.random * 2 + 1;
    const color = randomRgbValue();
    console.log(color);
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, radius, color)
    );
  }
}

//animate loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255, 255, 255, 0.05)";
  //below clears screen ever rerender, try commenting when clearRect, fill rect gives tails
  //c.fillStyle = imgStroke;
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();
