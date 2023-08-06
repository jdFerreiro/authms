import { Test, TestingModule } from '@nestjs/testing';
import { MenuRoleService } from './menuroles.service';

describe('MenuRoleService', () => {
  let service: MenuRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuRoleService],
    }).compile();

    service = module.get<MenuRoleService>(MenuRoleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
