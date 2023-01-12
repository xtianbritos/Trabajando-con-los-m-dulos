import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

export class PutUserDto implements UserInterface{

    uuid: string;

    @IsString({message: 'name debe ser un string'})
    @Length(2, 20, {message: 'name debe tener entre 2 y 20 caracteres'})
    @IsNotEmpty({message: 'name no puede estar vacío'})
    name: string;

    @IsOptional()
    @IsString({message: 'lastName debe ser un string'})
    @Length(2, 20, {message: 'lastName debe tener entre 2 y 20 caracteres'})
    @IsNotEmpty({message: 'lastName no puede estar vacío'})
    lastName?: string | undefined;

    @IsEmail({},{message: 'email debe ser un email'})
    @IsNotEmpty({message: 'email no puede estar vacío'})
    email: string;
}
