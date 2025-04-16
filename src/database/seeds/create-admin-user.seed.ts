import { DataSource } from 'typeorm';
import { User, UserRole, UserStatus } from '../../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

export const createAdminUser = async (dataSource: DataSource): Promise<void> => {
  const userRepository = dataSource.getRepository(User);

  // Check if admin user already exists
  const existingAdmin = await userRepository.findOne({
    where: [{ email: 'vht2@gmail.com' }, { phoneNumber: '0936226839' }],
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('t12345678', 10);
  const adminUser = userRepository.create({
    firstName: 'Admin',
    lastName: 'User',
    email: 'vht2@gmail.com',
    phoneNumber: '0936226839',
    password: hashedPassword,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  });

  await userRepository.save(adminUser);
  console.log('Admin user created successfully');
};
