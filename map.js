class Maps {
    constructor() {
        this.image = document.getElementById('tilesMap');
        this.rows = 20; //must define at the map
        this.columns = 20;
        this.tileSize = 128;
        this.ImageTileSize = 128; 
        // 6 & 5
        // 4 & 3
        this.map1 = [
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
           0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 

        ];
        this.map1Paths = [
            { x: this.tileSize * 0, y: this.tileSize * 10 },
            { x: this.tileSize * 10, y: this.tileSize * 10 },
            { x: this.tileSize * 10, y: this.tileSize * 0 },
            { x: this.tileSize * 0, y: this.tileSize * 0 }
        ];
        this.current = {map: this.map1, path:this.map1Paths};
        
        // imgs definition
        this.crossWalk = {
            x: this.ImageTileSize * 1,
            y: this.ImageTileSize * 1
        }
        this.straightRoad = {
            x: this.ImageTileSize * 1, //1
            y: this.ImageTileSize * 0  //1
        }
        this.sideRoad = {
            x: this.ImageTileSize * 2, //0
            y: this.ImageTileSize * 1  //1
        }
        this.rightUpRoad = {
            x: this.ImageTileSize * 2,
            y: this.ImageTileSize * 2
        }
        this.leftUpRoad = {
            x: this.ImageTileSize * 0,
            y: this.ImageTileSize * 2
        }
        this.rightBottomRoad = {
            x: this.ImageTileSize * 2,
            y: this.ImageTileSize * 0
        }
        this.leftBottomRoad = {
            x: this.ImageTileSize * 0,
            y: this.ImageTileSize * 0
        }
    }
    draw(ctx) {
        this.RenderMap(ctx, this.current.map);
    }
    RenderMap(ctx, map) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                let x = j * this.tileSize;
                let y = i * this.tileSize;
                let t = (i*this.rows)+j; 

                if (map[t] === -1) {

                }
                else if (map[t] === 0) {
                    this.DrawImage(ctx, this.crossWalk.x, this.crossWalk.y, x, y);
                }
                else if (map[t] === 1) {
                    this.DrawImage(ctx, this.straightRoad.x, this.straightRoad.y, x, y);
                }
                else if (map[t] === 2) {
                    this.DrawImage(ctx, this.sideRoad.x, this.sideRoad.y, x, y);
                }
                else if (map[t] === 3) {
                    this.DrawImage(ctx, this.rightUpRoad.x, this.rightUpRoad.y, x, y);
                }
                else if (map[t] === 4) {
                    this.DrawImage(ctx, this.leftUpRoad.x, this.leftUpRoad.y, x, y);
                }
                else if (map[t] === 5) {
                    this.DrawImage(ctx, this.rightBottomRoad.x, this.rightBottomRoad.y, x, y);
                }
                else if (map[t] === 6) {
                    this.DrawImage(ctx, this.leftBottomRoad.x, this.leftBottomRoad.y, x, y);
                }
            }
        }
    }
    DrawImage(ctx, IMGX, IMGY, x, y) {
        ctx.drawImage(this.image, IMGX, IMGY, this.ImageTileSize, this.ImageTileSize, x, y, this.tileSize, this.tileSize);
    }
}
