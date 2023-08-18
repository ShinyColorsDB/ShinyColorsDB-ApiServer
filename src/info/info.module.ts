import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScdbIdols } from '../entities/ScdbIdols';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
  imports: [TypeOrmModule.forFeature([ScdbIdols])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
