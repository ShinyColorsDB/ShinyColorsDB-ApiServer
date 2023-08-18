import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ScdbCardle } from 'src/entities/ScdbCardle';
import { ScdbCardList } from 'src/entities/ScdbCardList';
import { ScdbCardleChunk } from 'src/entities/ScdbCardleChunk';

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

    const today = new Date();
    const newCardle = new ScdbCardle();
    newCardle.cardleDate = new Date(today.setDate(today.getDate() + 1));
    newCardle.cardleType = cardToday.cardType.startsWith('P')
      ? Math.floor(Math.random() * 2)
      : 0;
    newCardle.enzaId = cardToday.enzaId;
    await this.dataSource.getRepository(ScdbCardle).save(newCardle);

    for (let i = 0; i < 6; i++) {
      const newChunk = new ScdbCardleChunk();
      newChunk.chunkX = this._randomNumber(1036);
      newChunk.chunkY = this._randomNumber(540);
      newChunk.cardleIndex2 = newCardle;
      await this.dataSource.getRepository(ScdbCardleChunk).save(newChunk);
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
