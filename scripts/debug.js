import "./frisk.js";

const debug_text = document.getElementById("debug-text");

const debug = {
  text : "debug text"
}

function update() {
  debug_text.innerHTML = debug.text;
}

function loop() {
  update();
  requestAnimationFrame(loop);
}

loop();

export default debug;