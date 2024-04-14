//import Car from "car.js"

class Game {
  constructor (canvas, context) {
      this.canvas = canvas;
      this.ctx = context;

      this.player = new Car(this, context, 300, 250);
      this.gameObjects = [this.player];

      this.spriteUpdate = false;
      this.spriteTimer = 0;
      this.spriteInterval = 150;

      window.addEventListener('keydown', (e) => {
        if (e.code === 'Backspace' && this.typed.length > 0) {
          this.typed = this.typed.substring(0, this.typed.length-1);
        }
      });   
    }
    render (deltaTime) {
      // sprite timing
      if (this.spriteTimer > this.spriteInterval) {
        this.spriteUpdate = true;
        this.spriteTimer = 0;
      }
      else {
        this.spriteUpdate = false;
        this.spriteTimer += deltaTime;
      }
      // render
      this.gameObjects.forEach(obj => { 
        obj.update();
        obj.draw();
      });
    }
}


window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1100;
    canvas.height = 650;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.font = '30px Impact';

    const game = new Game(canvas, ctx);
    
    let lastTime = 0;
    function animate (timeStamp) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      game.render(ctx, deltaTime);
      requestAnimationFrame(animate);
    }
    animate(0);
  });