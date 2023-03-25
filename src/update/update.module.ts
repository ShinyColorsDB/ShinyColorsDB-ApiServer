import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScdbIdols } from '../entities/ScdbIdols.entity';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScdbIdols])],
  controllers: [UpdateController],
  providers: [UpdateService],
})
export class UpdateModule {}
