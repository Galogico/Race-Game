function renderProgram(game, canvas, ctx) {
  ctx.save();
  ctx.translate(-game.player.pos.x + canvas.width/2, -game.player.pos.y + canvas.height/2);

  game.maps.draw(ctx);
  // render
  game.gameObjects.forEach(obj => {
    obj.update();
    obj.draw(ctx);
    if (obj instanceof Ai) {
      obj.pathCollision();
      obj.lookAt(game.maps.current.path[obj.nextPath]);
    }
  });

  ctx.restore();
}


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
      this.player = new Keyboard(this, 0, 0, 'red');
      this.AiPlayer = new Ai(this, 0, 0, 'green');
      this.gameObjects = [this.player, this.AiPlayer];

      this.spriteUpdate = false;
      this.spriteTimer = 0;
      this.spriteInterval = 150;

      this.maps = new Maps();
    }
  }
  game.define();

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spriteTiming(game, deltaTime);
    renderProgram(game, canvas, ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});

function spriteTiming (game, deltaTime) {
  // sprite timing
  if (game.spriteTimer > game.spriteInterval) {
    game.spriteUpdate = true;
    game.spriteTimer = 0;
  }
  else {
    game.spriteUpdate = false;
    game.spriteTimer += deltaTime;
  }
}