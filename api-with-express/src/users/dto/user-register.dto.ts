import { IsEmail, IsString, Length } from 'class-validator';

export class UserRegisterDto {
  @IsString({ message: 'Не указан email' })
  @IsEmail({}, { message: 'Неверно указан email' })
  email: string;

  @IsString({ message: 'Не указано имя' })
  @Length(3, 18, { message: 'Имя должно содержать минимум 3 символа и максимум 18 символов' })
  name: string;

  @IsString({ message: 'Не указан пароль' })
  @Length(8, undefined, { message: 'Пароль должен быть не менее 8 символов' })
  password: string;
}
