import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

//data transfer object // class = { }

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: "company's name should not be empty" })
  name: string;
}

export class CreateUserDto {
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;

  @IsNotEmpty({ message: 'Age should not be empty' })
  age: string;

  @IsNotEmpty({ message: 'Render should not be empty' })
  render: string;

  @IsNotEmpty({ message: 'Role should not be empty' })
  role: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsEmail({}, { message: 'Email should invalid' })
  @IsNotEmpty({ message: 'Email should not be empty' })
  email: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  password: string;

  @IsNotEmpty({ message: 'Name should not be empty' })
  name: string;

  @IsNotEmpty({ message: 'Address should not be empty' })
  address: string;

  @IsNotEmpty({ message: 'Age should not be empty' })
  age: string;

  @IsNotEmpty({ message: 'Render should not be empty' })
  render: string;
}
