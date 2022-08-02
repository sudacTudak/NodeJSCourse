import { IsEmail, IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString({ message: 'Не указан email' })
  @IsEmail({}, { message: 'Неверно указан email' })
  email: string;

  @IsString({ message: 'Не указан пароль' })
  @Length(8, undefined, { message: 'Пароль должен быть не менее 8 символов' })
  password: string;
}
