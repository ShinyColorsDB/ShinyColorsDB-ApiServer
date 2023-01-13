import { Injectable } from '@nestjs/common';
import { CardList } from 'src/entities/cardList.entity';
import { DataSource, Between, Brackets } from 'typeorm';
import { Idol } from '../entities/idol.entity';
import { Unit } from '../entities/unit.entity';

@Injectable()
export class InfoService {
  constructor(private dataSource: DataSource) {}

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
      .addOrderBy('idol.idolId', 'ASC')
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
      .leftJoinAndSelect('pcard.cardProduceAptitudes', 'aptitudes')
      .orderBy('panels.panelId', 'ASC')
      .addOrderBy('memoryAppeals.memoryId', 'ASC')
      .addOrderBy('idolEvents.eventId', 'ASC')
      .where('pcard.cardUuid = :cardUuid', { cardUuid: cardUuid })
      .getOne();
  }

  async getSCardInfo(cardUuid: string): Promise<CardList> {
    return this.dataSource
      .getRepository(CardList)
      .createQueryBuilder('scard')
      .leftJoinAndSelect('scard.idol', 'idol')
      .leftJoinAndSelect('scard.cardSupportEvents', 'supportEvents')
      .leftJoinAndSelect('scard.cardSupportSkills', 'supportSkills')
      .leftJoinAndSelect('scard.cardProficiencies', 'proficiencies')
      .leftJoinAndSelect('scard.cardPanels', 'panels')
      .leftJoinAndSelect('scard.cardSupportFightSkills', 'supportFightSkills')
      .orderBy('supportEvents.eventId', 'ASC')
      .addOrderBy('supportSkills.skillId', 'ASC')
      .addOrderBy('panels.panelId', 'ASC')
      .where('scard.cardUuid = :cardUuid', { cardUuid: cardUuid })
      .getOne();
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

  async getPcardList(): Promise<CardList[]> {
    return this.dataSource
      .getRepository(CardList)
      .createQueryBuilder('cardList')
      .where('cardList.cardType REGEXP "P_"')
      .orderBy('cardList.idolId', 'ASC')
      .addOrderBy('cardList.enzaId', 'ASC')
      .getMany();
  }

  async getScardList(): Promise<CardList[]> {
    return this.dataSource
      .getRepository(CardList)
      .createQueryBuilder('cardList')
      .where('cardList.cardType REGEXP "S_"')
      .orderBy('cardList.idolId', 'ASC')
      .addOrderBy('cardList.enzaId', 'ASC')
      .getMany();
  }

  async getTableByType(type: number) {
    const produceList = [],
      supportList = [];

    for (const k of await this.getIdollist()) {
      produceList.push(await this.getGap(k.idolId, type, 0));
      supportList.push(await this.getGap(k.idolId, type, 1));
    }

    return {
      produce: produceList,
      support: supportList,
    };
  }

  /**
   * @param {number} idolId
   * @param {number} queryType
   * 0: `limited only`,
   * 1: `general only`,
   * 2: `all`
   * @param {number} cardType
   * 0: P, 1: S
   **/
  async getGap(
    idolId: number,
    queryType: number,
    cardType: number,
  ): Promise<CardList> {
    const src = this.dataSource
      .getRepository(CardList)
      .createQueryBuilder('cardList');

    switch (queryType) {
      case 0:
        src.where(
          new Brackets((q) => {
            q.where('cardList.getMethod = :getMethod1', {
              getMethod1: 'LimitedGasha',
            }).orWhere('cardList.getMethod = :getMethod2', {
              getMethod2: 'TwilightCollect',
            });
          }),
        );
        break;
      case 1:
        src.where('cardList.getMethod = :getMethod', {
          getMethod: 'GeneralGasha',
        });
        break;
      case 2:
        src.where(
          new Brackets((q) => {
            q.where('cardList.getMethod = :getMethod1', {
              getMethod1: 'LimitedGasha',
            })
              .orWhere('cardList.getMethod = :getMethod2', {
                getMethod2: 'GeneralGasha',
              })
              .orWhere('cardList.getMethod = :getMethod3', {
                getMethod3: 'TwilightCollect',
              });
          }),
        );
        break;
    }

    switch (cardType) {
      case 0:
        src.andWhere('cardList.cardType = "P_SSR"');
        break;
      case 1:
        src.andWhere('cardList.cardType = "S_SSR"');
        break;
    }

    src
      .andWhere('cardList.idolId = :idolId', { idolId: idolId })
      .orderBy('cardList.releaseDate', 'DESC');

    return src.getOne();
  }
}
