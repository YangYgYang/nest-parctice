import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator'

export class UpdateListDto extends PartialType(CreateListDto) {
    
    @IsNumber()
    @ApiProperty()
    public  id: number;
}

