const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });
const clients = new Set();

// Списки для генерации случайных никнеймов
const adjectives = ['Быстрый', 'Умный', 'Хитрый', 'Веселый', 'Тихий', 'Дерзкий'];
const nouns = ['Кодер', 'Хакер', 'Пиксель', 'Скрипт', 'Браузер', 'Курсор'];
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3', '#33FFF0'];

function generateNickname() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}${noun}`;
}

wss.on('connection', (ws) => {
  clients.add(ws);
  
  const userId = Math.random().toString(36).substring(2, 6);
  const nickname = generateNickname(); // Генерируем красивое имя
  const userColor = colors[Math.floor(Math.random() * colors.length)];

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    
    const payload = JSON.stringify({ 
      id: userId, 
      name: nickname, // Передаем никнейм
      type: data.type, 
      x: data.x, 
      y: data.y,
      color: userColor 
    });

    for (const client of clients) {
      if (client !== ws && client.readyState === 1) {
        client.send(payload);
      }
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    const removePayload = JSON.stringify({ id: userId, type: 'disconnect' });
    for (const client of clients) {
      if (client.readyState === 1) {
        client.send(removePayload);
      }
    }
  });
});

console.log('Сервер никнеймов запущен на порту 8080');
