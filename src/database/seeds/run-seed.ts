import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { createAdminUser } from './create-admin-user.seed';

// Load environment variables
dotenv.config();

const configService = new ConfigService();

// Create a new data source
const dataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
});

// Initialize data source and run seeds
const runSeed = async () => {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    // Run seeds
    await createAdminUser(dataSource);

    console.log('Seeds completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    // Close the connection
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
};

runSeed();
