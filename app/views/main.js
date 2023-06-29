const canvas = document.querySelector("canvas");
document.body.style.height = "100vh";
canvas.height = document.body.clientHeight;
canvas.width = document.body.clientWidth;

const ctx = canvas.getContext("2d");
// filling the whole canvas with black color
ctx.fillRect(0, 0, canvas.width, canvas.height);
// changing the fill style and the stroke style for particles and connectors
ctx.fillStyle = "#FFFFFF";
ctx.strokeStyle = "rgba(255,255,255,0.1)";


const particles = [];

function init() {
  // change `100` with any number to increase the particles
  for (let i = 0; i < 100; i += 1) {
    const x = Math.floor(Math.random() * canvas.width);
    const y = Math.floor(Math.random() * canvas.height);
    const speedX = Math.random();
    const speedY = Math.random();
    const dirX = Math.random() > 0.5 ? 1 : -1;
    const dirY = Math.random() > 0.5 ? 1 : -1;

    particles.push({
      x,
      y,
      speedX: dirX * speedX,
      speedY: dirY * speedY,
      neighbors: [],
    });
  }
  draw(); // calling this function actually renders the particles
}
function getDist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  // render particles
  for (let i = 0; i < particles.length; i += 1) {
    let x = particles[i].x;
    let y = particles[i].y;
    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) {
      x = Math.floor(Math.random() * canvas.width);
      y = Math.floor(Math.random() * canvas.height);
    }

    ctx.moveTo(x, y);
    ctx.arc(x, y, 2, 0, Math.PI * 2);

    // identify the neighbors
    const copy = [...particles];
    for (let i = 0; i < particles.length; i += 1) {
      let x = particles[i].x + particles[i].speedX;
      let y = particles[i].y + particles[i].speedY;

      // sort wrt the distance
      copy.sort((a, b) => {
        const x1 = a.x;
        const x2 = b.x;
        const y1 = a.y;
        const y2 = b.y;
        const dist1 = getDist(x, y, x1, y1);
        const dist2 = getDist(x, y, x2, y2);
        return dist1 - dist2;
      });

      // assign nearest 10 neigbors
      particles[i].neighbors = copy.slice(0, 10)
    }
    
  }
  ctx.fill();
  
  // render neighbors
  for (let i = 0; i < particles.length; i += 1) {
    const x = particles[i].x;
    const y = particles[i].y;
    const neighbors = particles[i].neighbors;
    for (let j = 0; j < neighbors.length; j += 1) {
      const x1 = neighbors[j].x;
      const y1 = neighbors[j].y;
      const dist = getDist(x, y, x1, y1);
      // only render if the distance between the neighbors is < 100
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(draw)
}


init()