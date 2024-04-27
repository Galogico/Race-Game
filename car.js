class Car {
    constructor(game, x, y, color) {
        this.game = game;
        this.w = 100;
        this.h = 50;
        this.pos = { x: x, y: y };
        this.velocity = { x: 0, y: 0 };
        this.angle = 0;
        this.tranlation = { x: x, y: y };
        this.color = color;

        this.keys = [];

        window.addEventListener("keydown", e => {
            this.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", e => {
            this.keys[e.keyCode] = false;
        });
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.tranlation.x, this.tranlation.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.w * 0.75, -this.h / 2, this.w, this.h);
        ctx.restore();
        ctx.fillRect(this.pos.x, this.pos.y, 10, 10);
    }
    update() {
        this.pos.x += this.velocity.x * Math.cos(this.angle);
        this.pos.y += this.velocity.y * Math.sin(this.angle);
        this.tranlation = this.pos;
    }
    accelerate() {
        this.velocity.x += 0.5;
        this.velocity.y += 0.5;
    }
    break() {
        this.velocity.x /= 1.1;
        this.velocity.y /= 1.1;
    }
    rotateLeft() {
        this.angle -= 0.05;
    }
    rotateRight() {
        this.angle += 0.05;
    }
    collide(other) { //rect & rect
        if (other.pos.x + other.w > this.pos.x && other.pos.x < this.pos.x + this.w) { // horizontal collision
            if (other.pos.y + other.h > this.pos.y && other.pos.y < this.pos.y + this.h) { // vertical collision
                return true;
            }
        }
    }
}

class Keyboard extends Car {
    constructor(game, x, y, color) {
        super(game, x, y, color);
    }
    update() {
        this.velocity.x /= 1.05;
        this.velocity.y /= 1.05;
        super.update();
        if (this.keys[83]) {
            this.break();
        }
        if (this.keys[87]) {
            this.accelerate();
        }
        if (this.keys[65]) {
            this.rotateLeft();
        }
        if (this.keys[68]) {
            this.rotateRight()
        }
        // if (this.collide(this.game.AiPlayer)) {

        // }
    }
}


class Ai extends Car {
    constructor(game, x, y, color) {
        super(game, x, y, color);
        this.maxVel = 4;
        this.nextPath = 0;
    }
    update() {
        super.update();
        this.velocity.x = this.maxVel;
        this.velocity.y = this.maxVel;
    }
    lookAt(other) {
        let AngleToOther = Math.atan2(-this.pos.y + other.y, -this.pos.x + other.x);
        this.angle = AngleToOther;
    }
    pathCollision() {
        let path = this.game.maps.current.path[this.nextPath];    
        if (this.pos.x === path.x && this.pos.y === path.y) {    
            if (this.nextPath >= this.game.maps.current.path.length-1) { this.nextPath = 0; }
            else { this.nextPath += 1; }                
        }
    }
}