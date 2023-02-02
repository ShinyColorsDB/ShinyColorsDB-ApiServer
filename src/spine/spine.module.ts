import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idol } from '../entities/idol.entity';
import { SpineService } from './spine.service';
import { SpineController } from './spine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Idol])],
  controllers: [SpineController],
  providers: [SpineService],
})
export class SpineModule {}
