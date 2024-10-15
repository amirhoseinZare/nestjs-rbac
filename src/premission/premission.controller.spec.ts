import { Test, TestingModule } from '@nestjs/testing';
import { PremissionController } from './premission.controller';
import { PremissionService } from './premission.service';

describe('PremissionController', () => {
  let controller: PremissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PremissionController],
      providers: [PremissionService],
    }).compile();

    controller = module.get<PremissionController>(PremissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
