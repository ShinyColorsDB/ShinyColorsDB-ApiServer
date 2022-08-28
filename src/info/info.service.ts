import { Injectable } from '@nestjs/common';
import { CardList } from 'src/entities/cardList.entity';
import { DataSource, Between,  } from 'typeorm';
import { Idol } from '../entities/idol.entity';
import { Unit } from '../entities/unit.entity';

@Injectable()
export class InfoService {
  constructor(private dataSource: DataSource) {}
  //private readonly cats: Cat[] = [];

  async getIdollist(): Promise<Idol[]> {
    return this.dataSource.getRepository(Idol).find({
      select: ['idolId', 'idolName'],
      where: { idolId: Between(1, 25) },
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
      .orderBy('panels.panelId', 'ASC')
      .addOrderBy('memoryAppeals.memoryId', 'ASC')
      .addOrderBy('idolEvents.eventId', 'ASC')
      .where('pcard.cardUuid = :cardUuid', { cardUuid: cardUuid })
      .getOne();
  }

  async getSCardInfo(): Promise<CardList[]> {
    return this.dataSource
      .getRepository(CardList)
      .createQueryBuilder('scard')
      .getMany();
  }

  async getLatestPInfo(): Promise<CardList[]> {
    return this.dataSource.query(
      'select SCDB_CardList.EnzaID as enzaId, SCDB_CardList.IdolID as idolId, SCDB_CardList.CardName as cardName, SCDB_CardList.CardUUID as cardUuid, SCDB_CardList.BigPic1 as bigPic1, SCDB_CardList.CardType as cardType, SCDB_CardList.ReleaseDate as releaseDate from SCDB_CardList, (select IdolID, max(ReleaseDate) as re from SCDB_CardList where SCDB_CardList.CardType REGEXP "P_" group by IdolID) latest where SCDB_CardList.IdolID=latest.IdolID and SCDB_CardList.ReleaseDate=latest.re ORDER BY SCDB_CardList.IdolID;',
    );
  }

  async getLatestSInfo(): Promise<CardList[]> {
    return this.dataSource.query(
      'select SCDB_CardList.EnzaID as enzaId, SCDB_CardList.IdolID as idolId, SCDB_CardList.CardName as cardName, SCDB_CardList.CardUUID as cardUuid, SCDB_CardList.BigPic1 as bigPic1, SCDB_CardList.CardType as cardType, SCDB_CardList.ReleaseDate as releaseDate from SCDB_CardList, (select IdolID, max(ReleaseDate) as re from SCDB_CardList where SCDB_CardList.CardType REGEXP "S_" group by IdolID) latest where SCDB_CardList.IdolID=latest.IdolID and SCDB_CardList.ReleaseDate=latest.re ORDER BY SCDB_CardList.IdolID;',
    );
  }

  async getUpdateHistory(): Promise<CardList[]> {
    return this.dataSource
      .getRepository(CardList)
      .createQueryBuilder('cardList')
      .orderBy('cardList.releaseDate', 'DESC')
      .limit(10)
      .getMany();
  }
}
