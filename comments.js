// Create web server
// Run: node comments.js
// Access in browser: http://localhost:3000
// Run with nodemon: nodemon comments.js
// Access in browser: http://localhost:3000
// nodemon will automatically restart the server when you change the code
// Run with pm2: pm2 start comments.js
// Access in browser: http://localhost:3000
// pm2 will restart the server if it crashes and keep it running if the server restarts

const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  const path = url.parse(req.url).pathname;
  if (path === '/') {
    fs.readFile(__dirname + '/comments.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading comments.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (path === '/comments') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(['comment 1', 'comment 2']));
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        console.log('POSTed: ' + body);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Got comment: ' + body);
      });
    }
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000);
console.log('Server running at http://localhost:3000/');
