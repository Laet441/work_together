// 1. Находим Canvas и получаем контекст рисования (ctx)
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 2. Создаем объект картинки в памяти
const friskImage = new Image();
friskImage.src = "assets/images/frisk/frisk_stand_bottom.png";

let friskX = canvas.width / 2 - 25;
let friskY = canvas.height / 2 - 25;

// Скорость теперь меньше, потому что она применяется каждый кадр (~60 раз в секунду)
const speed = 4; 
const spriteWidth = 50;
const spriteHeight = 50;

// 1. Объект для хранения состояния клавиш (нажата = true, отпущена = false)
const keys = {
  ArrowUp: false,    w: false,  ц: false,
  ArrowDown: false,  s: false,  ы: false,
  ArrowLeft: false,  a: false,  ф: false,
  ArrowRight: false, d: false,  в: false
};

// 2. Слушаем нажатие (кнопку зажали)
document.addEventListener('keydown', (event) => {
  const key = event.key; // Регистр важен для стрелок (ArrowUp), для букв сделаем ниже
  if (key in keys) keys[key] = true;
  if (key.toLowerCase() in keys) keys[key.toLowerCase()] = true;
});

// 3. Слушаем отпускание (кнопку отпустили)
document.addEventListener('keyup', (event) => {
  const key = event.key;
  if (key in keys) keys[key] = false;
  if (key.toLowerCase() in keys) keys[key.toLowerCase()] = false;
});

// 4. Функция обновления игровой логики (расчет координат)
function update() {
  // Движение вверх
  if (keys.ArrowUp || keys.w || keys.ц) {
    friskY -= speed;
  }
  // Движение вниз
  if (keys.ArrowDown || keys.s || keys.ы) {
    friskY += speed;
  }
  // Движение влево
  if (keys.ArrowLeft || keys.a || keys.ф) {
    friskX -= speed;
  }
  // Движение вправо
  if (keys.ArrowRight || keys.d || keys.в) {
    friskX += speed;
  }
}

// 5. Функция отрисовки кадра
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Фон холста
  ctx.fillStyle = "#111111"; 
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(friskImage, friskX, friskY, spriteWidth, spriteHeight);
}

// 6. Главный игровой цикл (Game Loop)
function gameLoop() {
  update(); // 1. Считаем новые координаты на основе зажатых клавиш
  draw();   // 2. Рисуем новый кадр

  // Запрашиваем у браузера следующий кадр анимации (работает плавно на частоте монитора)
  requestAnimationFrame(gameLoop);
}

// Запуск игры после загрузки картинки
friskImage.onload = () => {
  gameLoop();
};
