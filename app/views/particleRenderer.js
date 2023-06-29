export default class ParticleRenderer {
    constructor(targetContext) {
      this.context = targetContext;
    }
  
    render(particles) {
      let x = 0;
      for (const particle of particles) {
        this.context.beginPath();
        this.context.arc(
          particle.positionX,
          particle.positionY,
          4.0,
          0,
          Math.PI * 2
        );
  
        if (x % 2 === 0) {
          this.context.fillStyle = 'blue';
        } else {
          this.context.fillStyle = 'green';
        }
  
        this.context.fill();
        x++;
      }
    }
  }
  