import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BalanceHistory } from 'src/balance-history/entities/balance-history.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow<string>('DATABASE_HOST'),
        port: configService.getOrThrow<number>('DATABASE_PORT'),
        username: configService.getOrThrow<string>('DATABASE_USER'),
        password: configService.getOrThrow<string>('DATABASE_PASSWORD'),
        database: configService.getOrThrow<string>('DATABASE_NAME'),
        entities: [User, BalanceHistory],
        synchronize: configService.getOrThrow<string>('NODE_ENV') === 'development',
        autoLoadEntities: true, //todo: why?
        migrations: [__dirname + '/migrations/**/*{.ts,.js}']
      }),
    }),
  ],
})
export class DatabaseModule {}
