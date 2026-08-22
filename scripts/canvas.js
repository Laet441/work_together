import frisk from "./frisk.js";
import joystick from "./joystick.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

const body = document.querySelector("body");

body.addEventListener('click', function() {
  if (body.requestFullscreen) {
    body.requestFullscreen();
  } else if (body.webkitRequestFullScreen) {
    body.webkitRequestFullScreen();
  } else if (body.mozRequestFullScreen) {
    body.mozRequestFullScreen();
  }
});



//const canvas = {
//  draw_image(image, position_x, position_y) {
//    context.drawImage(image, position_x, position_y);
//  }
//}

function load() {
  context.imageSmoothingEnabled = false;
  
  joystick.load();
  frisk.load();
}

function update() {
  joystick.update();
  frisk.update();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "gray"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  
  joystick.draw(context);
  frisk.draw(context);
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