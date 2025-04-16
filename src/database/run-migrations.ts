import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 't12345678',
    database: process.env.DB_DATABASE || 'ai_train_tool',
    entities: ['src/**/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false,
});

dataSource
    .initialize()
    .then(async () => {
        console.log('Running migrations...');
        await dataSource.runMigrations();
        console.log('Migrations completed successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Error running migrations:', error);
        process.exit(1);
    }); 