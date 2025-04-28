import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BalanceHistoryService } from './balance-history.service';
import { BalanceHistory } from './entities/balance-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BalanceHistory])],
  exports: [BalanceHistoryService],
  providers: [BalanceHistoryService],
})
export class BalanceHistoryModule {}
