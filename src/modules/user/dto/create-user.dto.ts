import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator'
import { ApiProperty} from '@nestjs/swagger'

export class CreateUserDto {

    @MaxLength(3)
    @IsString()
    @ApiProperty()
    public readonly username: string;

    @IsString()
    @ApiProperty()
    public readonly password?: string;

    @IsString()
    @ApiProperty()
    public readonly role:string;
  }