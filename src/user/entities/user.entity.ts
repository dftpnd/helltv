import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { BalanceHistory } from 'src/balance-history/entities/balance-history.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  balance: number;

  @OneToMany(
    () => BalanceHistory,
    (balanceHistory) => balanceHistory.user,
  )
  balanceHistory: BalanceHistory[];
}
