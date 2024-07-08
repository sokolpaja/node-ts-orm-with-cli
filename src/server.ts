import * as http from 'http';
import { AddressInfo } from 'net';
import App from './App';

const app: App = new App();
let server: http.Server;

function serverError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific error codes here.
  throw error;
}

function serverListening(): void {
  const addressInfo: AddressInfo = server.address() as AddressInfo;
  console.info(
    `Listening on ${addressInfo.address}:${process.env.PORT || 8080}`
  );
}

app
  .init()
  .then(() => {
    app.express.set('port', process.env.PORT || 8080);

    server = app.httpServer;
    server.on('error', serverError);
    server.on('listening', serverListening);
    server.listen(process.env.PORT || 8080);
  })
  .catch((err: Error) => {
    console.log('🚀 ~ err:', err);
  });

process.on('unhandledRejection', (reason: Error) => {
  console.error('Unhandled Promise Rejection: reason:', reason.message);
  console.error(reason.stack);
});
