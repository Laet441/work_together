import frisk from "./frisk.js";

const joystick = {
  circle: {
    big: {
      image: new Image(),
      loaded: false,
      position: {
        x: 0,
        y: 0
      },
      size: {
        x: 0,
        y: 0
      }
    },
    small: {
      image: new Image(),
      loaded: false,
      position: {
        x: 0,
        y: 0
      },
      size: {
        x: 0,
        y: 0
      }
    },
    clicked: false,
    click: {
      x: 0,
      y: 0
    },
    move: {
      x: 0,
      y: 0
    }
  },
  scale: {
    x: 2,
    y: 2
  },
  alpha: 0.3,
  active: false,
  
  load(context) {
    this.circle.big.image.src = "assets/images/joystick/big_circle.png";
    this.circle.big.image.onload = () => {
      this.circle.big.loaded = true;
      this.circle.big.position.y = context.canvas.height - this.circle.big.image.height * this.scale.y;
      this.circle.big.size.x = this.circle.big.image.width * this.scale.x;
      this.circle.big.size.y = this.circle.big.image.height * this.scale.y;
    }
    this.circle.small.image.src = "assets/images/joystick/small_circle.png";
    this.circle.small.image.onload = () => {
      this.circle.small.loaded = true;
      this.circle.small.position.x = this.circle.small.image.width / 2 * this.scale.x;
      this.circle.small.position.y = context.canvas.height - this.circle.small.image.height * this.scale.y * 1.5;
      this.circle.small.size.x = this.circle.small.image.width * this.scale.x;
      this.circle.small.size.y = this.circle.small.image.height * this.scale.y;
    }
  },
  update(context) {
    if (!this.active) {
      if (!this.circle.big.loaded || !this.circle.small.loaded) return;
      this.active = true;
    }
    
    if (this.circle.clicked) {
      const moveX = joystick.circle.move.x;
const moveY = joystick.circle.move.y;
frisk.move(moveX, moveY);
    }
    
  },
  draw(context) {
    if (!this.active) return;
    
    context.save();
    context.globalAlpha = this.alpha;
    
    const move = this.circle.move;
    const radius = Math.min(this.circle.big.size.x, this.circle.big.size.y) / 2;
    
    const tcb = this.circle.big;
    context.drawImage(tcb.image, tcb.position.x, tcb.position.y, tcb.size.x, tcb.size.y);
    
    const tcs = this.circle.small;
    const tcspx = tcs.position.x + this.circle.move.x + move.x * radius;
    const tcspy = tcs.position.y + this.circle.move.y + move.y * radius;
    context.drawImage(tcs.image, tcspx, tcspy, tcs.size.x, tcs.size.y);
    
    context.restore();
  },
  
  checkCircleClick(clickX, clickY) {
    const circleCenterX = this.circle.big.position.x + this.circle.big.size.x / 2;
    const circleCenterY = this.circle.big.position.y + this.circle.big.size.y / 2;
    const dx = clickX - circleCenterX;
    const dy = clickY - circleCenterY;
    const radius = Math.min(this.circle.big.size.x, this.circle.big.size.y) / 2;
    return dx*dx + dy*dy <= radius*radius;
  },
  circleClick(clickX, clickY) {
    this.circle.clicked = true;
    this.circle.click.x = clickX;
    this.circle.click.y = clickY;
    this.circleMove(clickX, clickY);
  },
  circleMove(x, y) {
    const cx = this.circle.big.position.x + this.circle.big.size.x / 2;
    const cy = this.circle.big.position.y + this.circle.big.size.y / 2;
    const r = Math.min(this.circle.big.size.x, this.circle.big.size.y) / 2;
    const dx = x - cx;
    const dy = y - cy;
    const len = Math.hypot(dx, dy);
    
    if (len > r) {
      const scale = r / len;
      this.circle.move.x = (dx * scale) / r;
      this.circle.move.y = (dy * scale) / r;
    } else {
      this.circle.move.x = dx / r;
      this.circle.move.y = dy / r;
    }
    
    //console.log("circle x = " + this.circle.move.x + "  | circle y = " + this.circle.move.y);
  },
  circleRelease() {
    this.circle.clicked = false;
    this.circle.move.x = 0;
    this.circle.move.y = 0;
  }
}

export default joystick;