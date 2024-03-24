
const CACHED_IMAGES = [];

for (let i = 0; i < 360; i++) {
  image = document.createElement('canvas');
  imageContext = image.getContext('2d');

  image.width = 1000;
  image.height = 1000;
  
  imageContext.beginPath();
  imageContext.arc(
    image.width / 2,
    image.height / 2,
    50,
    0, Math.PI * 2
  );
  imageContext.closePath();

  imageContext.shadowColor = `hsla(${i}, 100%, 50%)`;
  imageContext.shadowBlur = 50 * 2;

  imageContext.fillStyle = `hsla(${i}, 100%, 50%)`;
  imageContext.fill();

  CACHED_IMAGES[i] = image;
}

class Particle {

  constructor(x, y, s, h, d, m, dd, dm) {
    this.x = x;
    this.y = y;
    this.s = s;
    this.h = h;
    this.d = d;
    this.m = m;
    this.dd = dd;
    this.dm = dm;
    this.dead = false;
  }

  die() {
    this.dead = true;
  }

  tick() {
    this.x += this.m * Math.cos(this.d);
    this.y += this.m * Math.sin(this.d);

    this.d += this.dd;
    this.m += this.dm;

    if (this.m < 0) {
      this.die();
    }
  }

  draw() {
    c.save();
    c.translate(this.x, this.y);
    c.scale(this.s, this.s);
    c.drawImage(
      CACHED_IMAGES[this.h],
      -CACHED_IMAGES[this.h].width / 2,
      -CACHED_IMAGES[this.h].height / 2
    );
    c.restore();
  }
}

class ParticleHandler {

  constructor(particles) {
    this.particles = particles;
  }

  add(instance) {
    if (instance instanceof Particle) {
      this.particles.push(instance);
    }
  }

  tick() {
    for (let i = this.particles.length - 1; i >= 0; --i) {
      const p = this.particles[i];
      p.tick();
      if (p.dead) {
        this.particles.splice(i, 1);
      }
    }
  }

  draw() {
    for (let i = this.particles.length - 1; i >= 0; --i) {
      const p = this.particles[i];
      p.draw();
    }
  }
}