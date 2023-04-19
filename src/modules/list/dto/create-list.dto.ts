import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { IsBoolean, IsOptional, IsString, MaxLength, IsEmail} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateListDto {

  @MaxLength(100)
  @IsString()
  @ApiProperty()
  public readonly item: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  public readonly isDone:boolean;

  @IsString()
  @ApiProperty()
  public readonly description: string;
}