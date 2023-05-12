import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import Redlock from 'redlock';
import Client from 'ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    // InjectRepository可以將建立的entity綁定到service中
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { username, email, password, role } = createUserDto;
    const checkEmail = await this.userRepository.findOne({ where: { email } });
    if (checkEmail) {
      throw new BadRequestException('此 Email 已註冊過！');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.userRepository.save({
      username,
      email,
      password: hash,
      role,
    });
    delete user.password;
    return user;
  }
  // 使用new user()的寫法
  // async create(createUserDto: CreateUserDto): Promise<any> {
  //   const user = new User();
  //   user.username = createUserDto.username;
  //   user.email = createUserDto.email;
  //   user.password = createUserDto.password;
  //   user.role = createUserDto.role;
  //   const salt = await bcrypt.genSalt(10);
  //   const hash = await bcrypt.hash(user.password, salt);
  //   user.password = hash
  //   this.userRepository.save(user);
  //   delete user.password;
  //   return user;
  //  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    delete user.password;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user update ${updateUserDto}`;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return `This action removes a #${id} user`;
  }

  getHello() {
    return 'Hello World3!';
  }
  async testLock(testValue: string) {
    const cluster = new Redis.Cluster([{ host: 'localhost', port: 6376 }], {
      redisOptions: {
        password: 'bitnami',
        commandTimeout: 8000,
      },
      natMap: {
        '173.17.0.2:6379': { host: 'localhost', port: 6371 },
        '173.17.0.3:6379': { host: 'localhost', port: 6372 },
        '173.17.0.4:6379': { host: 'localhost', port: 6373 },
        '173.17.0.5:6379': { host: 'localhost', port: 6374 },
        '173.17.0.6:6379': { host: 'localhost', port: 6375 },
        '173.17.0.7:6379': { host: 'localhost', port: 6376 },
      },
    });
    // async function wait(ms: number) {
    //   return new Promise((resolve) => setTimeout(resolve, ms));
    // }
    // console.log(cluster);
    // async function main() {
    //   // wait redis client to find all cluster nodes
    //   await wait(8000);

    //   // list all cluster nodes
    //   console.log(
    //     'all node',
    //     cluster.nodes().map((node) => [node.options.port, node.options.role]),
    //   );

    //   console.log('set');
    //   await cluster.set('foo', 'bar');

    //   console.log('get');
    //   const value = await cluster.get('foo');
    //   console.log('value', { value });

    //   cluster.quit();
    // }

    // void main();
    //以下試著拿到鎖的狀態(另一種寫法)
    // const redis = new Redis({
    //   host: 'localhost',
    //   port: 6379,
    // });

    // const client = new Client();
    // const redlock = new Redlock([client]);

    // await redlock.using(['1', '2'], 5000, async (signal) => {
    //   const task = new Promise((resolve) => {
    //     redis.set('testValue', testValue);
    //     setTimeout(() => {
    //       console.log('setTimeOut', Date());
    //       resolve('success');
    //     }, 5 * 1000);
    //   });
    //   await task;

    //   // Make sure any attempted lock extension has not failed.
    //   if (signal.aborted) {
    //     console.log('鎖住了！');
    //     throw signal.error;
    //   }
    // });

    // 以下可以成功執行，也有正確鎖住
    // const redis = new Redis({
    //   host: 'localhost',
    //   port: 6379,
    // });
    // const app = await NestFactory.create(ListModule);
    // const listService = await app.get(ListService);
    // console.log(listService);

    const client = new Client();
    const redlock = new Redlock([client]);
    const lock = await redlock.acquire(['a'], 8000);

    try {
      console.log('拿到鎖了', Date());
      const task = new Promise((resolve) => {
        cluster.set('testValue', testValue);
        setTimeout(() => {
          resolve(console.log('setTimeOut', Date()));
        }, 5 * 1000);
      });
      const ans = cluster.get('testValue');
      console.log('有寫入資料', ans);
      await task;
    } finally {
      await lock.release();
      console.log('釋放鎖', Date());
    }
  }
}
