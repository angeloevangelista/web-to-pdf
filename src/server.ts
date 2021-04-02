import http from 'http';

import app from './app';

const serverPort = process.env.PORT || 3333;
const server = http.createServer(app);

server
  .listen(serverPort)
  .on('listening', () => console.clear())
  .on('listening', () => console.log(`🕐  ${new Date().toLocaleString()}`))
  .on('listening', () =>
    console.log(`🚀  Server is listening at *:${serverPort}`),
  )
  .on('listening', () =>
    console.log(
      `💻  Access the server locally at http://127.0.0.1:${serverPort}`,
    ),
  );
