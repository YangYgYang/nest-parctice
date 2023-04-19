import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString, MaxLength, IsEmail} from 'class-validator'
import { ApiProperty} from '@nestjs/swagger'

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @MaxLength(3)
    @IsString()
    @ApiProperty()
    public readonly username: string;

    @IsString()
    @ApiProperty()
    @IsEmail()
    public readonly email:string;

    @IsString()
    @ApiProperty()
    public readonly role:string;

    @IsString()
    @ApiProperty()
    public readonly access_token:string;
}
