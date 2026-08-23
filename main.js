import "./scripts/canvas.js";
import "./scripts/frisk.js";
import "./scripts/joystick.js";
//import "./scripts/debug.js";

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

console.log(isMobile ? "Mobile" : "PC");

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
