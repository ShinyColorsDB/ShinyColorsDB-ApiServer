import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { CardIdolEvent } from './entities/cardIdolEvent.entity';
import { CardList } from './entities/cardList.entity';
import { CardMemoryAppeal } from './entities/cardMemoryAppeal.entity';
import { CardPanel } from './entities/cardPanel.entity';
import { CardProficiency } from './entities/cardProficiency.entity';
import { CardSupportEvent } from './entities/cardSupportEvent.entity';
import { CardSupportSkill } from './entities/cardSupportSkill.entity';
import { Idol } from './entities/idol.entity';
import { IdolDress } from './entities/idolDress.entity';
import { Unit } from './entities/unit.entity';
import { SpineModule } from './spine/spine.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    InfoModule,
    SpineModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env?.DATABASE_PORT) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [CardIdolEvent, CardList, CardMemoryAppeal, CardPanel, CardProficiency, CardSupportEvent, CardSupportSkill, Idol, IdolDress, Unit],
      logging: true,
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
