import frisk from "./frisk.js";
import joystick from "./joystick.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

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
  context.imageSmoothingEnabled = false;
  
  joystick.load(context);
  frisk.load(context);
}

function update() {
  joystick.update(context);
  frisk.update(context);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "gray"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  frisk.draw(context);
  joystick.draw(context);
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