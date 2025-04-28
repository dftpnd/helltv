import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';

export enum ActionType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT',
}

@Entity('balance_history')
export class BalanceHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.balanceHistory)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'enum', enum: ActionType })
  action: ActionType;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  ts: Date;
}
