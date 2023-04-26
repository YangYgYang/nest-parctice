import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('runTest', () => {
    it('should return an array of users', () => {
      //預期回傳的資料
      const result = [
        { id: 1, username: 'Michael', role: 'user' },
        { id: 2, username: 'Mary', role: 'user' },
      ];
      //jest會監視usersService.()，並給予假資料 result
      jest.spyOn(service, 'findAll').mockImplementation(() => result);

      controller.findAll(Request, Response, Next).then((data) => {
        //預期data會跟result一樣
        expect(data).toBe(result);
      });
    });
  });
});

it('should be defined', () => {
  expect(controller).toBeDefined();
});
