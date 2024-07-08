import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import http from 'http';
import helmet from 'helmet';
import 'dotenv/config';
import registerRoutes from './routes';
import db from './data/models';
import morgan from 'morgan';

export default class App {
  public express: Application;

  public httpServer: http.Server;

  public async init(): Promise<void> {
    this.express = express();
    this.httpServer = http.createServer(this.express);

    // Assert database connection
    await this.assertDatabaseConnection();

    // add all global middleware like cors
    this.middleware();

    //  register the all routes
    this.routes();

    // add the middleware to handle error, make sure to add if after registering routes method
    // this.express.use();
  }

  /**
   * here register your all routes
   */
  private routes(): void {
    this.express.get('/', this.basePathRoute);
    this.express.use('/api', registerRoutes());
    this.express.get('/web', this.parseRequestHeader, this.basePathRoute);
  }

  /**
   * here you can apply your middlewares
   */
  private middleware(): void {
    // support application/json type post data
    // support application/x-www-form-urlencoded post data
    // Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
    this.express.use(helmet({ contentSecurityPolicy: false }));
    this.express.use(express.json({ limit: '100mb' }));
    this.express.use(morgan('dev'));
    this.express.use(express.urlencoded({ limit: '100mb', extended: true }));
    // add multiple cors options as per your use
    const corsOptions = {
      origin: '*',
      // origin: [
      // 	'http://localhost:8080/',
      // 	'http://example.com/',
      // 	'http://127.0.0.1:8080',
      // 	'http://localhost:8081',
      // 	'http://192.168.86.23:8081',
      // ],
    };
    this.express.use(cors(corsOptions));
  }

  private parseRequestHeader(
    _req: Request,
    _res: Response,
    next: NextFunction
  ): void {
    // parse request header
    // console.log(req.headers.access_token);
    next();
  }

  private basePathRoute(_request: Request, response: Response): void {
    response.json({ message: 'Node App working base path' });
  }

  private async assertDatabaseConnection(): Promise<void> {
    try {
      console.log('starting db authenticate:');
      await db.sequelize.authenticate();
      console.info('db authenticated');

      console.info('starting db sync');
      await db.sequelize.sync();
      console.info('DB :synced successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
