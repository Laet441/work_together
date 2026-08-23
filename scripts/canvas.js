import settings from "./settings.js";
import audio from "./audio.js";
import frisk from "./frisk.js";
import joystick from "./joystick.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let isInit = false;
let startTime = performance.now();
let fps = 0;
let fpsCount = 0;

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
  if (!isInit && startScreen.loaded) {
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
  
  if (settings.isMobile) joystick.load(context);
  frisk.load(context);
}

function update() {
  if (!isInit) return;
  
  if (settings.isMobile) joystick.update(context);
  frisk.update(context);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  if (!isInit) {
    if (startScreen.loaded) context.drawImage(startScreen.image, 0, 0);
    else {
      context.font = "36px arial";
      context.textBaseline = "center";
      context.textAlign = "center";
      context.fillStyle = "white";
      context.fillText("Assets are loading. Please wait.", 320, 240);
    }
    return;
  }
  
  context.fillStyle = "gray"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  frisk.draw(context);
  if (settings.isMobile) joystick.draw(context);
  
  let startText = "Your device is " + (settings.isMobile ? "MOBILE. Check out the joystick! :p" : "NOT MOBILE. I recommend accessing from a mobile device!");
  context.textBaseline = "top";
  context.textAlign = "left";
  context.strokeStyle = "black";
  context.fillStyle = "white";
  context.lineWidth = 3;
  context.font = "20px arial";
  context.strokeText(startText, 10, 20, context.canvas.width - 20);
  context.fillText(startText, 10, 20, context.canvas.width - 20);
  
  context.textBaseline = "top";
  context.textAlign = "right";
  context.strokeStyle = "black";
  context.fillStyle = "white";
  context.lineWidth = 5;
  context.font = "16px monospace";
  context.strokeText(fps, context.canvas.width - 5, 5);
  context.fillText(fps, context.canvas.width - 5, 5);
}

function loop(time) {
  fpsCount++;
  if (time - startTime >= 1000) {
    startTime = time;
    fps = fpsCount;
    fpsCount = 0;
  }
  update();
  draw();
  requestAnimationFrame(loop);
  
  //console.log("Frisk X: " + frisk.x + "  |  Frisk Y: " + frisk.y);
}


load();
loop(performance.now());

//export default canvas;