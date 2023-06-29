export default class Particle {
    constructor(posX, posY, velX, velY) {
      this.positionX = posX;
      this.positionY = posY;
      this.velocityX = velX;
      this.velocityY = velY;
    }
  
    update(deltaTime, windowWidth, windowHeight) {
      this.positionX += this.velocityX * deltaTime;
      this.positionY += this.velocityY * deltaTime;
  
      // Check if the particle has hit the window boundaries
      if (this.positionX < 0 || this.positionX > windowWidth) {
        // Reverse the horizontal velocity to bounce back
        this.velocityX = -this.velocityX;
      }
  
      if (this.positionY < 0 || this.positionY > windowHeight) {
        // Reverse the vertical velocity to bounce back
        this.velocityY = -this.velocityY;
      }
    }
  
    render() {
      console.log(`Particle at (${this.positionX}, ${this.positionY})`);
    }
  }
  