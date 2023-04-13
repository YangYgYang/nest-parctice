import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const user = new User();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = hash;
    user.role = createUserDto.role;

    await this.userRepository.save(user);
    return user;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role:user.role };

    return {
        // access_token: this.jwt.sign(payload),
    };
  }

  findOne(id: number) {  
    return this.userRepository.findOne({where:{id}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    await this.userRepository.delete(id)
    return `This action removes a #${id} user`;
  }

  getHello(){
    return 'Hello World3!';
  }
}
