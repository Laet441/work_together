const frisk = {
  image: new Image(),
  loaded: false,
  position: {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
  },
  size: {
    x: 0,
    y: 0
  },
  scale: {
    x: 2,
    y: 2
  },
  speed: 3,
  active: false,
  
  load(context) {
    this.image.src = "assets/images/frisk/frisk_stand_bottom.png";
    this.image.onload = () => {
      this.loaded = true;
      this.size.x = this.image.width * this.scale.x;
      this.size.y = this.image.height * this.scale.y;
      this.active = true;
    }
  },
  update(context) {
    if (!this.active) return;
    
    
  },
  draw(context) {
    if (!this.active) return;
    
    context.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
  },
  
  move(velocityX, velocityY) {
    this.position.x += velocityX * this.speed;
    this.position.y += velocityY * this.speed;
  }
}

export default frisk;