const { WebSocketServer } = require('ws');
const http = require('http');
const fs = require('fs');
const path = require('path');



// // 1. Создаем веб-сервер, который будет бесплатно отдавать страницу index.html по ссылке
// const server = http.createServer((req, res) => {
//   if (req.url === '/' || req.url === '/index.html') {
//     fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
//       if (err) {
//         res.writeHead(500);
//         res.end('Ошибка загрузки index.html');
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
//         res.end(content);
//       }
//     });
//   } else {
//     res.writeHead(404);
//     res.end('Страница не найдена');
//   }
// });

// // 2. Подключаем WebSocket-сервер поверх созданного веб-сервера
// const wss = new WebSocketServer({ server });
// const clients = new Set();

// const adjectives = ['Быстрый', 'Умный', 'Хитрый', 'Веселый', 'Тихий', 'Дерзкий'];
// const nouns = ['Кодер', 'Хакер', 'Пиксель', 'Скрипт', 'Браузер', 'Курсор'];
// const colors = [
//   '#1a1a1a', '#2c3e50', '#212f3d', '#111625', // Черные, асфальтовые и темно-серые
//   '#1b4f72', '#0e2f44', '#154360', '#1c2833', // Глубокие синие и полуночные
//   '#0e6251', '#0b5345', '#145a32', '#196f3d', // Темно-изумрудные и хвойные зеленые
//   '#512e5f', '#4a235a', '#6c3483', '#4d1c5a', // Темно-фиолетовые и баклажановые
//   '#78281f', '#641e16', '#5b1414', '#4a0000', // Бордовые, винные и глубокие темно-красные
//   '#6e2c00', '#5e3311', '#4e2808', '#3e1d01'  // Темный шоколад и глубокий коричневый
// ];


// function generateNickname() {
//   const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
//   const noun = nouns[Math.floor(Math.random() * nouns.length)];
//   return `${adj}${noun}`;
// }

// wss.on('connection', (ws) => {
//   clients.add(ws);
//   const userId = Math.random().toString(36).substring(2, 6);
//   const nickname = generateNickname(); 
//   const userColor = colors[Math.floor(Math.random() * colors.length)];

//   ws.on('message', (message) => {
//     const data = JSON.parse(message);
//     const payload = JSON.stringify({ 
//       id: userId, 
//       name: nickname, 
//       type: data.type, 
//       x: data.x, 
//       y: data.y,
//       text: data.text, // Поддержка отправки сообщений чата
//       color: userColor 
//     });

//     for (const client of clients) {
//       if (client !== ws && client.readyState === 1) {
//         client.send(payload);
//       }
//     }
//   });

//   ws.on('close', () => {
//     clients.delete(ws);
//     const removePayload = JSON.stringify({ id: userId, type: 'disconnect' });
//     for (const client of clients) {
//       if (client.readyState === 1) {
//         client.send(removePayload);
//       }
//     }
//   });
// });

// // 3. Запускаем сервер на порту, который выделит Render
// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   console.log(`Сервер полностью запущен на порту ${PORT}`);
// });
