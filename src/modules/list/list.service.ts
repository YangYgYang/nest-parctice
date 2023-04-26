import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lists } from './entities/list.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(Lists)
    private listRepository: Repository<Lists>,
  ) {}

  async create(createListDto: CreateListDto) {
    const list = this.listRepository.create(createListDto);
    // await this.listRepository.save(list)
    return await this.listRepository.save(list);
  }

  async findAll(id: number) {
    const lists = await this.listRepository.find({
      where: { user: { id } },
    });
    return lists;
  }

  async findOne(id: number) {
    const list = await this.listRepository.findOne({ where: { id } });
    return list;
  }

  async update(updateListDto: UpdateListDto) {
    const list = await this.listRepository.findOne({
      relations: {
        user: true,
      },
      where: { id: updateListDto.id },
    });
    if (updateListDto.userId !== list.user.id) {
      throw new ForbiddenException('您無權修改此項目！');
    }
    return this.listRepository.save(updateListDto);
  }

  async remove(id: number) {
    await this.listRepository.delete(id);
    return `This action removes a #${id} list`;
  }
}
