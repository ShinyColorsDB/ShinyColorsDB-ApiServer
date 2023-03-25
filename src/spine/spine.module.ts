import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScdbIdols } from '../entities/ScdbIdols.entity';
import { SpineService } from './spine.service';
import { SpineController } from './spine.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScdbIdols])],
  controllers: [SpineController],
  providers: [SpineService],
})
export class SpineModule {}
