import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import fs from 'fs';
import path from 'path';
import process from 'process';
import config from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];
console.log('🚀 ~ dbConfig:', dbConfig);
const db: { [key: string]: ModelCtor<Model> } & {
  sequelize?: Sequelize;
  Sequelize?: typeof Sequelize;
} = {};

let sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host || 'localhost',
    dialect: 'postgres',
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file) => {
    const modelImported = require(path.join(__dirname, file));

    const model = modelImported.default.initModel(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if ('associate' in model) {
    (model as any).associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
