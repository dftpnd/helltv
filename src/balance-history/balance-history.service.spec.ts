import { Test, TestingModule } from '@nestjs/testing';
import { BalanceHistoryService } from './balance-history.service';

describe('BalanceHistoryService', () => {
  let service: BalanceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceHistoryService],
    }).compile();

    service = module.get<BalanceHistoryService>(BalanceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
