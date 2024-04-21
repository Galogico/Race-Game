window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 1500;
  canvas.height = 750;
  //ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.font = '30px Impact';

  const game = {
    define: function () {
      this.player = new Keyboard(this, ctx, 100, 150, 'red');
      this.AiPlayer = new Ai(this, ctx, 760, 450, 'green');
      this.gameObjects = [this.player, this.AiPlayer];

      this.spriteUpdate = false;
      this.spriteTimer = 0;
      this.spriteInterval = 150;   
    },
    render: function(deltaTime) {
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
  game.define();

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render(deltaTime);
    requestAnimationFrame(animate);
  }
  animate(0);
});