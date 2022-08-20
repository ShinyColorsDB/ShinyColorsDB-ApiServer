import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idol } from '../entities/idol.entity';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
  imports: [TypeOrmModule.forFeature([Idol])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
