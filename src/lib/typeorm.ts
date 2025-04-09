// lib/typeorm.ts
import { DataSource } from 'typeorm';
import { logs_v2 } from '../../logs'; // Sua entidade

const dbPath = '../../../db/'

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath, // Caminho para o arquivo do banco SQLite
  synchronize: false,  // Sincroniza o banco de dados com as entidades
  logging: true,      // Habilita logs para ver o SQL gerado
  entities: [logs_v2],   // Liste suas entidades aqui
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
