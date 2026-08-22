//import canvas from "./canvas.js";

const frisk = {
  image: new Image(),
  position: {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
  },
  velocity: {
    x: 0,
    y: 0
  },
  speed: 1,
  sprite_width: 50,
  sprite_height: 50,
  active: false,
  
  load() {
    this.image.src = "assets/images/frisk/frisk_stand_bottom.png";
    this.image.onload = () => {
      this.active = true;
    }
  },
  update() {
    if (!this.active) return;
    
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;
  },
  draw(context) {
    if (!this.active) return;
    
    context.drawImage(this.image, this.position.x, this.position.y);
    //canvas.draw_image(this.image, this.position.x, this.position.y);
    //ctx.drawImage(this.image, this.x, this.y, this.sprite_width, this.sprite_height);
  }
}

export default frisk;