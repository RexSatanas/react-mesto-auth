const http = require('http');

const server = http.createServer(() => {
  console.log('Пришёл запрос!');
});

server.listen(3000);