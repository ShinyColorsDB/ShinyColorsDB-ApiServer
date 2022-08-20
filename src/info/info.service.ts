import { Injectable } from '@nestjs/common';
import { CardList } from 'src/entities/cardList.entity';
import { DataSource, Between,  } from 'typeorm';
import { Idol } from '../entities/idol.entity';
import { Unit } from '../entities/unit.entity';

@Injectable()
export class InfoService {
  constructor(
    private dataSource: DataSource,
  ) {}
  //private readonly cats: Cat[] = [];

  async getIdollist(): Promise<Idol[]> {
    return this.dataSource
      .getRepository(Idol).find({
        select: ['idolId', 'idolName'],
        where: { idolId: Between(1,25) },
        order: { idolId: 'ASC' },
      });
  }

  async getIdolInfo(id: number): Promise<Idol> {
    return this.dataSource
      .getRepository(Idol)
      .createQueryBuilder('idol')
      .leftJoinAndSelect('idol.unit', 'unit')
      .leftJoinAndSelect('idol.cardLists', 'cardList')
      .orderBy('cardList.enzaId', 'ASC')
      .where('idol.idolId = :id', { id: id })
      .getOne();
  }

  async getUnitInfo(): Promise<Unit[]> {
    return this.dataSource
      .getRepository(Unit)
      .createQueryBuilder('unit')
      .leftJoinAndSelect('unit.idols', 'idol')
      .where('unit.unitId != :id1', { id1: 8 })
      .andWhere('unit.unitId != :id2', { id2: 0 })
      .orderBy('unit.unitId', 'ASC')
      .getMany();
  }

  async getPCardInfo(cardUuid: string): Promise<CardList> {
    return this.dataSource
      .getRepository(CardList)
      .createQueryBuilder('pcard')
      .leftJoinAndSelect('pcard.idol', 'idol')
      .leftJoinAndSelect('pcard.cardIdolEvents', 'idolEvents')
      .leftJoinAndSelect('pcard.cardMemoryAppeals', 'memoryAppeals')
      .leftJoinAndSelect('pcard.cardPanels', 'panels')
      .where('pcard.cardUuid = :cardUuid', { cardUuid: cardUuid })
      .getOne();
  };
}
