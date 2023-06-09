import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @MaxLength(100)
  @IsString()
  @ApiProperty()
  public readonly item: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  public readonly isDone: boolean;

  @IsString()
  @ApiProperty()
  public readonly description: string;

  @IsNumber()
  public userId: number;
}
