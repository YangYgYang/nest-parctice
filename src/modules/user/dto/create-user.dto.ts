import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'

export class CreateUserDto {
    public readonly name: string;
    public readonly description?: string;
  }