import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { IsNotEmpty, IsOptional, IsString, MaxLength} from 'class-validator'

export class CreateUserDto {

    @MaxLength(3)
    public readonly name: string;

    @IsString()
    public readonly description?: string;
  }