import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScdbIdols } from '../entities/ScdbIdols';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

import { existsSync, mkdirSync } from 'fs';

@Module({
  imports: [TypeOrmModule.forFeature([ScdbIdols])],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {
  constructor() {
    // unitInfo
    if (!existsSync(`${process.env.CACHE_PATH}/info`)) {
      console.log('Creating info cache directory');
      mkdirSync(`${process.env.CACHE_PATH}/info`, { recursive: true });
    }
    // idolInfo
    if (!existsSync(`${process.env.CACHE_PATH}/info/idolInfo`)) {
      console.log('Creating idolList cache directory');
      mkdirSync(`${process.env.CACHE_PATH}/info/idolInfo`, { recursive: true });
    }
    // pCardInfo
    if (!existsSync(`${process.env.CACHE_PATH}/info/pCardInfo`)) {
      console.log('Creating pCardInfo cache directory');
      mkdirSync(`${process.env.CACHE_PATH}/info/pCardInfo`, {
        recursive: true,
      });
    }
    // sCardInfo
    if (!existsSync(`${process.env.CACHE_PATH}/info/sCardInfo`)) {
      console.log('Creating sCardInfo cache directory');
      mkdirSync(`${process.env.CACHE_PATH}/info/sCardInfo`, {
        recursive: true,
      });
    }
  }
}
