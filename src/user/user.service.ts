import { Injectable, NotFoundException, Inject, forwardRef, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { BalanceHistoryService } from 'src/balance-history/balance-history.service';
import { ActionType } from 'src/balance-history/entities/balance-history.entity';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly dataSource: DataSource,
    @Inject(forwardRef(() => BalanceHistoryService))
    private readonly balanceHistoryService: BalanceHistoryService,

    @Inject(forwardRef(() => CacheService))
    private readonly cacheService: CacheService,
  ) {
  }

  async findOneBy(id: number, manager?: EntityManager): Promise<User> {
    const cacheUser = await this.cacheService.get<User>(id.toString());
    
    if(cacheUser){
      return cacheUser;
    }
    
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;
    const user = await userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    
    await this.cacheService.set(id.toString(), user);

    return user;
  }

  async updateBalance(id: number, newBalance: number, manager?: EntityManager): Promise<User> {
    const userRepository = manager ? manager.getRepository(User) : this.userRepository;
    const user = await this.findOneBy(id, manager);
    const updatedUser = userRepository.save({ ...user, balance: newBalance })
    await this.cacheService.set(id.toString(), updatedUser)

    return updatedUser;
  }

  async payment(userId: number, amount: number): Promise<number> {
    return await this.dataSource.transaction(async (manager) => {
 
      const user = await this.findOneBy(userId, manager);
      const userBalance = user.balance;

      if (userBalance <= 0 || userBalance < amount) {
        throw new BadRequestException('Недостаточно средств');
      }

      await this.balanceHistoryService.create({
        userId,
        amount,
        action: ActionType.DEBIT
      }, manager);
      
      const totalAmount = await this.balanceHistoryService.totalAmount(userId, manager);

      await this.updateBalance(userId, totalAmount, manager);

      return totalAmount;
    });
  }
}
