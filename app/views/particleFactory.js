import Particle from './Particle';

export default class ParticleFactory {
    createParticle() {
      const posX = this.generateRandomFloat(0.0, 1.0);
      const posY = this.generateRandomFloat(0.0, 1.0);
      const velX = this.generateRandomFloat(-0.1, 0.1);
      const velY = this.generateRandomFloat(-0.1, 0.1);
  
      return new Particle(posX, posY, velX, velY);
    }
  
    createRain() {
      const posX = this.generateRandomFloat(0.0, 1920.0);
      const posY = this.generateRandomFloat(0.0, 0.0);
      const velX = this.generateRandomFloat(0.0, 0.0);
      const velY = this.generateRandomFloat(0.1, 0.15);
  
      return new Particle(posX, posY, velX, velY);
    }
  
    generateRandomFloat(min, max) {
      return Math.random() * (max - min) + min;
    }
  }
  