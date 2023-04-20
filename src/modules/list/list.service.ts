import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Injectable} from '@nestjs/common';
import { Repository} from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Lists } from './entities/list.entity';
import { User } from '../user/entities/user.entity';

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

  async findAll(id:number) {
    const lists = await this.listRepository.find({
      where: {user:{id} },
  })
    return lists;
  }

  async findOne(id: number) {
    const list = await this.listRepository.find({where:{id}})
    return list;
  }

  // update(id: number, updateListDto: UpdateListDto) {
  //   return `This action updates a #${id} list`;
  // }

  async remove(id: number) {
    await this.listRepository.delete(id)
    return `This action removes a #${id} list`;
  }
}
