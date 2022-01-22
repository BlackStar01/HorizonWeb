import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import type { UserCreationOptions } from '../../shared/lib/types/user-creation-options.interface';

export class MyEfreiDto {
  @IsString()
  username: string;

  @IsString()
  firstname: string;

  @IsString()
  name: string;

  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  public normalize(): UserCreationOptions {
    return {
      username: this.username,
      firstname: this.firstname,
      lastname: this.name,
      fullname: this.fullName,
      email: this.email,
    };
  }
}
