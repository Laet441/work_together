const frisk = {
  images: {
    standBottom: {name: "frisk_stand_bottom"},
    standTop: {name: "frisk_stand_top"},
    standLeft: {name: "frisk_stand_left"},
    standRight: {name: "frisk_stand_right"}
  },
  image: undefined,
  position: {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
  },
  velocity: {
    x: 0,
    y: 0
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
  direction: "bottom",
  isMoving: false,
  loaded: false,
  active: false,
  
  load(context) {
    const keys = Object.keys(this.images);
    for (var i = 0; i < keys.length; i++) {
      const key = keys[i];
      const item = this.images[key];
      item.image = new Image();
      item.loaded = false;
      item.image.src = "../assets/images/frisk/" + item.name + ".png";
      //console.log(item.image.src);
      item.image.onload = () => {
        item.loaded = true;
      }
      //console.log(Object.keys(this.images).length);
    }
  },
  update(context) {
    if (!this.active) {
      let loaded = true;
      
      const keys = Object.keys(this.images);
      for (var i = 0; i < keys.length; i++) {
        const key = keys[i];
        const item = this.images[key];
        if (!item.loaded) loaded = false;
      }
      
      if (!loaded) return;
      this.setImage("standBottom");
      this.active = true;
      
      //console.log(this.images.standBottom.loaded);
    }
    
    // Moving
    this.position.x += this.velocity.x * this.speed;
    this.position.y += this.velocity.y * this.speed;
    
    // Set image
    if (this.isMoving) {
      let angle = Math.atan2(this.velocity.y, this.velocity.x) * (180 / Math.PI) + 180;
      let imageName = "";
      
      if ((angle >= 0 && angle < 45) || (angle >= 315 && angle < 360)) imageName = "standLeft";
      else if (angle >= 45 && angle < 135) imageName = "standTop";
      else if (angle >= 135 && angle < 225) imageName = "standRight";
      else if (angle >= 225 && angle < 315) imageName = "standBottom";
      
      if (this.image != this.images[imageName].image) this.setImage(imageName);
      
      console.log(angle);
    }
    
    // Reset moving
    if (this.isMoving) {
      this.velocity.x = 0;
      this.velocity.y = 0;
      this.isMoving = false;
    }
    
    // Clamp frisk's position
    if (this.position.x < -this.size.x * 0.2) this.position.x = -this.size.x * 0.2;
    else if (this.position.x > context.canvas.width - this.size.x * 0.8) this.position.x = context.canvas.width - this.size.x * 0.8;
    if (this.position.y < -this.size.y * 0.8) this.position.y = -this.size.y * 0.8;
    else if (this.position.y > context.canvas.height - this.size.y) this.position.y = context.canvas.height - this.size.y;
  },
  draw(context) {
    if (!this.active) return;
    
    context.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
  },
  
  move(velocityX, velocityY) {
    this.velocity.x = velocityX;
    this.velocity.y = velocityY;
    this.isMoving = true;
  },
  setImage(name) {
    const image = this.images[name];

    if (!image) {
      console.warn("[Warn] Failed to load image for Frisk named \"" + name + "\"");
      return;
    }
    
    this.image = image.image;
    this.size.x = image.image.width * this.scale.x;
    this.size.y = image.image.height * this.scale.y;
  }
}

export default frisk;