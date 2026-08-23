//import "./scripts/settings.js";
//import settings from "./scripts/settings.js";
import "./scripts/canvas.js";
import "./scripts/frisk.js";

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
