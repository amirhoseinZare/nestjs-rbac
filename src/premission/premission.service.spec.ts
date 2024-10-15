import { Test, TestingModule } from '@nestjs/testing';
import { PremissionService } from './premission.service';

describe('PremissionService', () => {
  let service: PremissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PremissionService],
    }).compile();

    service = module.get<PremissionService>(PremissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
