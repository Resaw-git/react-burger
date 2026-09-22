import 'dotenv/config';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { User } from '../users/users.entity';
import { Ingredient } from '../ingredients/ingredients.entity';
import { Order } from '../orders/orders.entity';

/**
 * DataSource для TypeORM CLI (миграции).
 * Использование: npm run migration:generate|run|revert
 */
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Ingredient, Order],
  migrations: [join(__dirname, 'migrations/*{.ts,.js}')],
  synchronize: false,
});
