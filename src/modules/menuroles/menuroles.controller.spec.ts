import { Test, TestingModule } from '@nestjs/testing';
import { MenuRolesController } from './menuroles.controller';

describe('RolesController', () => {
  let controller: MenuRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuRolesController],
    }).compile();

    controller = module.get<MenuRolesController>(MenuRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
