import { UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/user-register.dto';

export interface IUsersRepository {
  create: (user: UserRegisterDto) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
