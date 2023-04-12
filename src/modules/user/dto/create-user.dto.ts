import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator'

export class CreateUserDto {

    @MaxLength(3)
    @IsString()
    public readonly username: string;

    @IsString()
    public readonly password?: string;

    @IsString()
    public readonly role:string;
  }