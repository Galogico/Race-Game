class Car {
    constructor (game, context, x, y) {
        this.game = game;
        this.ctx = context;
        this.w = 100;
        this.h = 50;
        this.location = [x, y];
        this.velocity = [0, 0];
        this.angle = 0;
        this.tranlation = [x, y];
        window.addEventListener('keydown', (e) => {
            if (e.key === 'w') {this.accelerate();}
            if (e.key === 's') {this.break();}
            if (e.key === 'a') {this.rotateLeft();}
            if (e.key === 'd') {this.rotateRight();}
        });
    }
    draw () {
        this.ctx.save();
        this.ctx.translate(this.tranlation[0], this.tranlation[1]);
        this.ctx.rotate(this.angle);
        this.ctx.fillRect(-this.w*0.75, -this.h/2, this.w, this.h);
        this.ctx.restore();
    }
    update () {
        this.location[0] += this.velocity[0] * Math.cos(this.angle);
        this.location[1] += this.velocity[1] * Math.sin(this.angle);

        this.velocity = this.velocity.map(vel => vel/1.01);

        this.tranlation[0] = this.location[0];  
        this.tranlation[1] = this.location[1];
    }
    accelerate () {
        this.velocity[0] += 1;
        this.velocity[1] += 1;
    }
    break () {
        this.velocity[0] /= 1.1;
        this.velocity[1] /= 1.1;
    }
    rotateLeft () {
        this.angle -= 0.05;
    }
    rotateRight () {
        this.angle += 0.05;
    }
}

//export default Car;