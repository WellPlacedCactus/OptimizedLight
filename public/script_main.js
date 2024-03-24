
// **GLOBAL VARIABLES**

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const mouse = {};
mouse.x = 0;
mouse.y = 0;
mouse.down = false;

// **FUNCTIONS**

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const demo = () => {
  
  const h = new ParticleHandler([]);
  
  const loop = () => {
  
    if (mouse.down) {
      for (let i = 0; i < 1; i++) {
        h.add(new Particle(
          mouse.x,
          mouse.y,
          0.5 + Math.random(),
          randint(0, 359),
          Math.PI * 2 * Math.random(),
          randint(1, 5),
          Math.random() * 0.01,
          -Math.random() * 0.01,
        ));
      }
    }

    h.tick();
  
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
  
    c.save();
    c.globalCompositeOperation = 'lighter';
    h.draw();
    c.restore();
  
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
};

// **EVENT HANDLERS**

addEventListener('load', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  demo();
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

addEventListener('mousemove', ({x, y}) => {
  mouse.x = x;
  mouse.y = y;
});

addEventListener('mousedown', () => {
  mouse.down = true;
});

addEventListener('mouseup', () => {
  mouse.down = false;
});

// **ADD MOBILE COMPATIBILITY**

addEventListener('touchstart', ({touches}) => {
  const t = touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
  mouse.down = true;
});

addEventListener('touchend', () => {
  mouse.down = false;
});

addEventListener('touchmove', ({touches}) => {
  const t = touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
});