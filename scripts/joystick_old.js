import frisk from "./frisk.js";
import debug from "./debug.js";

let startX, startY;

const joystick_circle = document.getElementById("joystick-circle")

function set_frisk_direction(touch_x, touch_y) {
  const circle_rect = joystick_circle.getBoundingClientRect();
  const radius = Math.min(circle_rect.width, circle_rect.height) / 2;
  const dx = touch_x - (circle_rect.left + circle_rect.width / 2);
  const dy = touch_y - (circle_rect.top + circle_rect.height / 2);
  let len = Math.hypot(dx, dy);
  len = Math.min(len, radius);
  const dir_x = dx / len;
  const dir_y = dy / len;
  const factor = len / radius;
  const vx = dir_x * factor;
  const vy = dir_y * factor;
  
  frisk.velocity_x = vx;
  frisk.velocity_y = vy;
  
  debug.text = "fvx: " + vx + "  |  fvy: " + vy + "  |  len: " + len + "  |  radius: " + radius;
  //console.log("fvx: " + vx + "  |  fvy: " + vy + "  |  len: " + len + "  |  radius: " + radius);
}

joystick_circle.addEventListener("touchstart", (event) => {
  const t = event.touches[0];
  set_frisk_direction(t.clientX, t.clientY);
})

joystick_circle.addEventListener("touchmove", (event) => {
  const t = event.touches[0];
  set_frisk_direction(t.clientX, t.clientY);

  //console.log("{Joystick}.Frisk.X: " + frisk.x + "  |  {Joystick}.Frisk.Y: " + frisk.y);
})

joystick_circle.addEventListener("touchend", (event) => {
  //event.preventDefault()
  //joystick_circle.style.
  
  frisk.velocity_x = 0;
  frisk.velocity_y = 0;
  
})
