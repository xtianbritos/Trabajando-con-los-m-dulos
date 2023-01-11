import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

export class PostUserDto implements UserInterface{

    uuid: string;

    @IsString()
    @Length(2, 20)
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    @Length(2, 20)
    @IsNotEmpty()
    lastName?: string | undefined;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
