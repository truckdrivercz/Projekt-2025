class Player{

    constructor(x, y, w, h, c, v){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
        this.v = v;
        this.basicV = v;
        this.maxV = v * 2
    }

    draw(ctx){
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(keys){
        if(keys["w"]){
            if(this.y - this.v > 0){
                this.y -= this.v;
            }
        }
        if(keys["s"]){
            if(this.y + this.h + this.v < canvas.height){
                this.y += this.v;
            }
            
        }
        if(keys["a"]){
            if(this.x - this.v > 0){
                this.x -= this.v;
            }
        }
        if(keys["d"]){
            if(this.x + this.h + this.v < canvas.width){
                this.x += this.v;
            }
        }
        if(keys[" "]) {
            this.w -= 2;
            this.h -= 2;
        }
        if(keys["k"]){
            this.v = this.maxV;
        }
        else{
            this.v = this.basicV;
        }
    }

}

const myPlayer = new Player(10, 10, 50, 50, "red", 5);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let keys = {};

window.addEventListener("keydown", (e) => keys[e.key] = true);
window.addEventListener("keyup", (e) => keys[e.key] = false);

const testObject = {
    w: 100,
    h: 100,
    x: 200,
    y: 300,
    c:"blue"
}

const gameLoop = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    myPlayer.update(keys);

    myPlayer.draw(ctx);

    ctx.fillStyle = testObject.c;
    ctx.fillRect(testObject.x, testObject.y, testObject.w, testObject.h);
    checkCollision(myPlayer, testObject);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

const checkCollision = (player, obj) => {
    if (
        player.x < obj.x + obj.w &&
        player.x + player.w > obj.x &&
        player.y < obj.y + obj.h &&
        player.y + player.h > obj.y
    ) {
        switch(true){
            case keys["w"]:
                player.y = obj.y + obj.h;
                break;
            case keys["s"]:
                player.y = obj.y - player.h;
                break
            case keys["a"]:
                player.x = obj.x + obj.w;
                break;
            case keys["d"]:
                player.x = obj.x - player.w;
                break
        }
    }
}
