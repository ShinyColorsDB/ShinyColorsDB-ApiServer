import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScdbIdols } from '../entities/ScdbIdols.entity';
import { CardleController } from './cardle.controller';
import { CardleService } from './cardle.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScdbIdols])],
  controllers: [CardleController],
  providers: [CardleService],
})
export class CardleModule {}
