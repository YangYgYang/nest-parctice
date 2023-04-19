import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Injectable} from '@nestjs/common';
import { Repository} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Lists } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(Lists) 
    private listRepository: Repository<Lists>){}

  async create(createListDto: CreateListDto) {
    const list = this.listRepository.create(createListDto)
    await this.listRepository.save(list)
    return list;
  }

  // findAll() {
  //   return `This action returns all list`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} list`;
  // }

  // update(id: number, updateListDto: UpdateListDto) {
  //   return `This action updates a #${id} list`;
  // }

  async remove(id: number) {
    await this.listRepository.delete(id)
    return `This action removes a #${id} list`;
  }
}
