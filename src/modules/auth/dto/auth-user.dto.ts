import { IsNotEmpty, IsOptional, IsString, MaxLength, IsEmail} from 'class-validator'
import { ApiProperty} from '@nestjs/swagger'

export class AuthUserDto {

    @IsString()
    @ApiProperty()
    @IsEmail()
    public readonly email:string;

    @IsString()
    @ApiProperty()
    public readonly password?: string;

  }