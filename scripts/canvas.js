import settings from "./settings.js";
import audio from "./audio.js";
import frisk from "./frisk.js";
import joystick from "./joystick.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let isInit = false;

const startScreen = {
  image: new Image(),
  loaded: false,
  load() {
    this.image.src = "../assets/images/misc/start_screen.png";
    this.image.onload = () => {
      this.loaded = true;
    }
  }
}

startScreen.load();

canvas.addEventListener("click", (event) => {
  if (!isInit) {
    isInit = true;
    audio.play("quiet_glade.ogg", true);
  }
})

canvas.addEventListener("touchstart", (event) => {
  //event.preventDefault();
  
  const touch = event.touches[0];
  const rect = canvas.getBoundingClientRect();
  const screenX = touch.clientX - rect.left;
  const screenY = touch.clientY - rect.top;
  const clickX = Math.min(Math.max((screenX / rect.width) * canvas.width, 0), canvas.width);
  const clickY = Math.min(Math.max((screenY / rect.height) * canvas.height, 0), canvas.height);
  
  if (joystick.checkCircleClick(clickX, clickY)) {
    joystick.circleClick(clickX, clickY);
  }
  
  //console.log('клик по холсту:', canvasX, canvasY);
});

canvas.addEventListener("touchmove", (event) => {
  //event.preventDefault();
  
  const touch = event.touches[0];
  const rect = canvas.getBoundingClientRect();
  const screenX = touch.clientX - rect.left;
  const screenY = touch.clientY - rect.top;
  const clickX = Math.min(Math.max((screenX / rect.width) * canvas.width, 0), canvas.width);
  const clickY = Math.min(Math.max((screenY / rect.height) * canvas.height, 0), canvas.height);
  
  if (joystick.circle.clicked) {
    joystick.circleMove(clickX, clickY);
  }
  
  //console.log('клик по холсту:', canvasX, canvasY);
});

canvas.addEventListener("touchend", (event) => {
  joystick.circleRelease();
});

//const canvas = {
//  draw_image(image, position_x, position_y) {
//    context.drawImage(image, position_x, position_y);
//  }
//}

function load() {
  //import settings from "./scripts/settings.js";
  
  context.imageSmoothingEnabled = false;
  context.font = "20px arial";
  context.textBaseline = 'top';
  
  joystick.load(context);
  frisk.load(context);
}

function update() {
  if (!isInit) return;
  
  joystick.update(context);
  frisk.update(context);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  if (!isInit) {
    if (startScreen.loaded) context.drawImage(startScreen.image, 0, 0);
    return;
  }
  
  context.fillStyle = "gray"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  frisk.draw(context);
  joystick.draw(context);
  
  let startText = "Your device is " + (settings.isMobile ? "MOBILE. Check out the joystick! :p" : "NOT MOBILE. I recommend accessing from a mobile device!");
  context.fillStyle = "black";
  context.fillText(startText, 10, 10, context.canvas.width - 20);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
  
  //console.log("Frisk X: " + frisk.x + "  |  Frisk Y: " + frisk.y);
}


load();
loop();

//export default canvas;