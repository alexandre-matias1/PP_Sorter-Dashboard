// lib/typeorm.ts
import { DataSource } from 'typeorm';
import { Logs } from '../../logs';
import path from 'path';
const dbPath = path.join(process.cwd(), 'database.db');



const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  synchronize: false,
  logging: true,
  entities: [Logs],
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
