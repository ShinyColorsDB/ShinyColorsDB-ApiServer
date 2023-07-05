import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScdbCardle } from 'src/entities/ScdbCardle.entity';
import { ScdbCardList } from 'src/entities/ScdbCardList.entity';
import { ScdbCardleChunk } from 'src/entities/ScdbCardleChunk.entity';

@Injectable()
export class CardleService {
  constructor(private dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    name: 'setCardle',
    timeZone: 'Asia/Tokyo',
  })
  async setCardle(): Promise<void> {
    const cardToday = await this.dataSource
      .getRepository(ScdbCardList)
      .createQueryBuilder('cardlist')
      .select('cardlist.enzaId')
      .addSelect('cardlist.cardType')
      .orderBy('RAND()')
      .getOne();
    //console.log(cardToday);
    const newCardle = this.dataSource.getRepository(ScdbCardle).create({
      cardleDate: new Date(),
      enzaId: cardToday.enzaId,
      cardleType: cardToday.cardType.startsWith('P')
        ? Math.floor(Math.random() * 2)
        : 0,
    });
    const result = await this.dataSource
      .getRepository(ScdbCardle)
      .save(newCardle);

    for (let k = 0; k < 6; k++) {
      const newCardleChunk = this.dataSource
        .getRepository(ScdbCardleChunk)
        .create({
          cardleIndex: result.cardleIndex,
          chunkX: this._randomNumber(1036),
          chunkY: this._randomNumber(540),
        });
      await this.dataSource.getRepository(ScdbCardle).save(newCardleChunk);
    }
  }

  async getCardle(): Promise<ScdbCardle> {
    console.log('getCardle');
    return await this.dataSource
      .getRepository(ScdbCardle)
      .createQueryBuilder('cardle')
      .leftJoinAndSelect('cardle.enza', 'enza')
      .leftJoinAndSelect('cardle.cardleChunks', 'cardleChunks')
      .orderBy('cardle.cardleIndex', 'DESC')
      .getOne();
  }

  _randomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
