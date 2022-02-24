


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