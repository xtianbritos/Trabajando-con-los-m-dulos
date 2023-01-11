import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface';

export class PatchUserDto implements UserInterface{

    uuid: string;

    @IsOptional()
    @IsString()
    @Length(2, 20)
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    @Length(2, 20)
    @IsNotEmpty()
    lastName?: string | undefined;

    @IsOptional()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
