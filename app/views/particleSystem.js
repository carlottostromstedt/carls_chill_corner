export default class ParticleSystem {
    constructor() {
      this.isRunning = false;
      this.windowWidth = 1920;
      this.windowHeight = 1080;
      this.particles = [];
    }
  
    start() {
      this.isRunning = true;
    }
  
    stop() {
      this.isRunning = false;
    }
  
    update(deltaTime) {
      if (!this.isRunning) return;
  
      for (const particle of this.particles) {
        particle.update(deltaTime, this.windowWidth, this.windowHeight);
      }
    }
  
    render() {
      for (const particle of this.particles) {
        particle.render();
      }
    }
  
    addParticle(particle) {
      this.particles.push(particle);
    }
  
    getParticles() {
      return this.particles;
    }
  }
  