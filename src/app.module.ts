import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { DataSource } from 'typeorm';
/* Entities */
import { ScdbCardIdolEvent } from './entities/ScdbCardIdolEvent';
import { ScdbCardList } from './entities/ScdbCardList';
import { ScdbCardMemoryAppeal } from './entities/ScdbCardMemoryAppeal';
import { ScdbCardPanel } from './entities/ScdbCardPanel';
import { ScdbExtraSkillEffect } from './entities/ScdbExtraSkillEffect';
import { ScdbCardProficiency } from './entities/ScdbCardProficiency';
import { ScdbCardSupportEvent } from './entities/ScdbCardSupportEvent';
import { ScdbCardSupportSkill } from './entities/ScdbCardSupportSkill';
import { ScdbIdols } from './entities/ScdbIdols';
import { ScdbIdolDress } from './entities/ScdbIdolDress';
import { ScdbUnits } from './entities/ScdbUnits';
import { ScdbProduceAptitude } from './entities/ScdbProduceAptitude';
import { ScdbSupportFightSkill } from './entities/ScdbSupportFightSkill';
import { ScdbSpinePreset } from './entities/ScdbSpinePreset';
import { ScdbCardle } from './entities/ScdbCardle';
import { ScdbSupportSkillList } from './entities/ScdbSupportSkillList';
import { ScdbCardleChunk } from './entities/ScdbCardleChunk';

/* Other modules */
import { SpineModule } from './spine/spine.module';
import { InfoModule } from './info/info.module';
import { UpdateModule } from './update/update.module';
import { CardleModule } from './cardle/cardle.module';
import { ScdbCardStatus } from './entities/ScdbCardStatus';
import { ScdbMemoryChargeSkill } from './entities/ScdbMemoryChargeSkill';
import { ScdbLiveInfo } from './entities/ScdbLiveInfo';
import { ScdbAlbum } from './entities/ScdbAlbum';
import { ScdbAlbumDetail } from './entities/ScdbAlbumDetail';
import { ScdbLiveSetList } from './entities/ScdbLiveSetList';

@Module({
  imports: [
    InfoModule,
    SpineModule,
    UpdateModule,
    CardleModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: (process.env?.DATABASE_TYPE as 'postgres' | 'mysql') || 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env?.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      schema: 'shinycolors',
      entities: [
        ScdbCardIdolEvent,
        ScdbCardList,
        ScdbCardMemoryAppeal,
        ScdbCardPanel,
        ScdbExtraSkillEffect,
        ScdbCardProficiency,
        ScdbCardSupportEvent,
        ScdbCardSupportSkill,
        ScdbIdols,
        ScdbIdolDress,
        ScdbUnits,
        ScdbProduceAptitude,
        ScdbSupportFightSkill,
        ScdbSpinePreset,
        ScdbCardle,
        ScdbCardleChunk,
        ScdbSupportSkillList,
        ScdbCardStatus,
        ScdbMemoryChargeSkill,
        ScdbLiveInfo,
        ScdbLiveSetList,
        ScdbAlbum,
        ScdbAlbumDetail,
      ],
      logging: false,
      synchronize: process.env.ENV_PRODUCTION != 'true',
    }),
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
