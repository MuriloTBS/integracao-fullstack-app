const http = require('http');

const PORT = process.env.PORT || 3000;

const routes = {
  '/': (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Pipeline ativo', version: '1.0.0' }));
  },
  '/health': (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
  },
};

const server = http.createServer((req, res) => {
  const handler = routes[req.url];
  if (handler) {
    handler(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, () => {
  process.stdout.write(`Servidor rodando na porta ${PORT}\n`);
});
