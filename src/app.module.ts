import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
/* Entities */
import { ScdbCardIdolEvent } from './entities/ScdbCardIdolEvent.entity';
import { ScdbCardList } from './entities/ScdbCardList.entity';
import { ScdbCardMemoryAppeal } from './entities/ScdbCardMemoryAppeal';
import { ScdbCardPanel } from './entities/ScdbCardPanel.entity';
import { ScdbCardProficiency } from './entities/ScdbCardProficiency.entity';
import { ScdbCardSupportEvent } from './entities/ScdbCardSupportEvent.entity';
import { ScdbCardSupportSkill } from './entities/ScdbCardSupportSkill.entity';
import { ScdbIdols } from './entities/ScdbIdols.entity';
import { ScdbIdolDress } from './entities/ScdbIdolDress.entity';
import { ScdbUnits } from './entities/ScdbUnits.entity';
import { ScdbProduceAptitude } from './entities/ScdbProduceAptitude.entity';
import { ScdbSupportFightSkill } from './entities/ScdbSupportFightSkill.entity';
import { ScdbSpinePreset } from './entities/ScdbSpinePreset.entity';
/* Other modules */
import { SpineModule } from './spine/spine.module';
import { InfoModule } from './info/info.module';
import { UpdateModule } from './update/update.module';

@Module({
  imports: [
    InfoModule,
    SpineModule,
    UpdateModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env?.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        ScdbCardIdolEvent,
        ScdbCardList,
        ScdbCardMemoryAppeal,
        ScdbCardPanel,
        ScdbCardProficiency,
        ScdbCardSupportEvent,
        ScdbCardSupportSkill,
        ScdbIdols,
        ScdbIdolDress,
        ScdbUnits,
        ScdbProduceAptitude,
        ScdbSupportFightSkill,
        ScdbSpinePreset,
      ],
      logging: false,
      synchronize: process.env.ENV_PRODUCTION != 'true',
    }),
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
