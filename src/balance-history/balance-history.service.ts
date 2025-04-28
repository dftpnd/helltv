import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { ActionType, BalanceHistory } from './entities/balance-history.entity';

@Injectable()
export class BalanceHistoryService {
  constructor(
    @InjectRepository(BalanceHistory)
    private readonly balanceHistoryRepository: Repository<BalanceHistory>,
  ) {}

  async findAllByUserId(userId: number): Promise<BalanceHistory[]> {
    return this.balanceHistoryRepository.find({ where: { userId } });
  }

  async totalAmount(userId: number, manager?: EntityManager): Promise<number> {
    const balanceHistoryRepository = manager ? manager.getRepository(BalanceHistory) : this.balanceHistoryRepository;
    const totalCredit = await balanceHistoryRepository.sum('amount', { userId, action: ActionType.CREDIT }) || 0;
    const totalDebit = await balanceHistoryRepository.sum('amount', { userId, action: ActionType.DEBIT }) || 0;
    const result = totalCredit - totalDebit;
    
    return result;
  }

  async create(data: { userId: number; amount: number; action: ActionType }, manager?: EntityManager): Promise<BalanceHistory> {
    const balanceHistoryRepository = manager ? manager.getRepository(BalanceHistory) : this.balanceHistoryRepository;
    return balanceHistoryRepository.save(data);
  }
}
