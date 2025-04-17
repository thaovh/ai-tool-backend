import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { InitialMigration1744772402240 } from '../migrations/1744772402240-InitialMigration';

config();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 't12345678',
    database: process.env.DB_DATABASE || 'ai_train_tool',
    entities: ['src/**/*.entity{.ts,.js}'],
    migrations: [InitialMigration1744772402240],
    synchronize: false,
});

AppDataSource.initialize()
    .then(async () => {
        console.log('Data Source has been initialized!');
        try {
            await AppDataSource.runMigrations();
            console.log('Migrations have been executed successfully');
        } catch (error) {
            console.error('Error during migration:', error);
        } finally {
            await AppDataSource.destroy();
        }
    })
    .catch((error) => console.log('Error during Data Source initialization:', error)); 