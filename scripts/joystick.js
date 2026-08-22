//import canvas from "./canvas.js";

const joystick = {
  circle: {
    big: {
      image: new Image(),
      loaded: false,
      position: {
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
      }
    },
    position: {
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
  
  load() {
    this.circle.big.image.src = "assets/images/joystick/big_circle.png";
    this.circle.big.image.onload = () => {
      this.circle.big.loaded = true;
    }
    this.circle.small.image.src = "assets/images/joystick/small_circle.png";
    this.circle.small.image.onload = () => {
      this.circle.small.loaded = true;
    }
  },
  update() {
    if (!this.active) {
      if (!this.circle.big.loaded || !this.circle.small.loaded) return;
      this.active = true;
    }
    
  },
  draw(context) {
    if (!this.active) return;
    
    context.save();
    context.globalAlpha = this.alpha;
    
    const tcb = this.circle.big;
    const tcbiw = tcb.image.width * this.scale.x;
    const tcbih = tcb.image.height * this.scale.y;
    const tcbpx = tcb.position.x;
    const tcbpy = context.canvas.height - tcb.position.y - tcbih;
    context.drawImage(tcb.image, tcbpx, tcbpy, tcbiw, tcbih);
    
    const tcs = this.circle.small;
    const tcsiw = tcs.image.width * this.scale.x;
    const tcsih = tcs.image.height * this.scale.y;
    const tcspx = tcbpx + tcbiw / 2 - tcsiw / 2;
    const tcspy = tcbpy + tcbih / 2 - tcsih / 2;
    context.drawImage(tcs.image, tcspx, tcspy, tcsiw, tcsih);
    
    context.restore();
    
    //console.log(context.canvas.height);
    
    //canvas.draw_image(tcb.image, tcb.position.x, tcb.position.y);
  }
}

export default joystick;