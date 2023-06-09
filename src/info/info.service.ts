import { Injectable } from '@nestjs/common';
import { ScdbCardList } from 'src/entities/ScdbCardList.entity';
import { DataSource, Between, Brackets } from 'typeorm';
import { ScdbIdols } from '../entities/ScdbIdols.entity';
import { ScdbUnits } from '../entities/ScdbUnits.entity';

@Injectable()
export class InfoService {
  readonly TWILIGHT = 'TwilightCollection';
  readonly MYSONG = 'MySongCollection';
  readonly LIMITED = 'LimitedGasha';
  readonly GENERAL = 'GeneralGasha';
  constructor(private dataSource: DataSource) {}

  async getIdollist(): Promise<ScdbIdols[]> {
    return this.dataSource.getRepository(ScdbIdols).find({
      select: ['idolId', 'idolName'],
      where: { idolId: Between(1, 26) },
      order: { idolId: 'ASC' },
    });
  }

  async getIdolInfo(id: number): Promise<ScdbIdols> {
    return this.dataSource
      .getRepository(ScdbIdols)
      .createQueryBuilder('idol')
      .leftJoinAndSelect('idol.unit', 'unit')
      .leftJoinAndSelect('idol.cardLists', 'cardList')
      .orderBy('cardList.enzaId', 'ASC')
      .where('idol.idolId = :id', { id: id })
      .getOne();
  }

  async getUnitInfo(): Promise<ScdbUnits[]> {
    return this.dataSource
      .getRepository(ScdbUnits)
      .createQueryBuilder('unit')
      .leftJoinAndSelect('unit.idols', 'idol')
      .where('unit.unitId != :id1', { id1: 9 })
      .andWhere('unit.unitId != :id2', { id2: 0 })
      .orderBy('unit.unitId', 'ASC')
      .addOrderBy('idol.idolId', 'ASC')
      .getMany();
  }

  async getPCardInfo(cardUuid: string): Promise<ScdbCardList> {
    return this.dataSource
      .getRepository(ScdbCardList)
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

  async getSCardInfo(cardUuid: string): Promise<ScdbCardList> {
    return this.dataSource
      .getRepository(ScdbCardList)
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

  async getLatestPInfo(): Promise<ScdbCardList[]> {
    const latestPInfo = [];
    for (let i = 1; i <= 26; i++) {
      latestPInfo.push(
        await this.dataSource
          .getRepository(ScdbCardList)
          .createQueryBuilder('cardList')
          .orderBy('cardList.releaseDate', 'DESC')
          .addOrderBy('cardList.enzaId', 'DESC')
          .where('cardList.idolId = :id', { id: i })
          .andWhere('cardList.cardType LIKE :type', { type: 'P_%' })
          .getOne(),
      );
    }
    return latestPInfo;
  }

  async getLatestSInfo(): Promise<ScdbCardList[]> {
    const latestSInfo = [];
    for (let i = 1; i <= 26; i++) {
      latestSInfo.push(
        await this.dataSource
          .getRepository(ScdbCardList)
          .createQueryBuilder('cardList')
          .orderBy('cardList.releaseDate', 'DESC')
          .addOrderBy('cardList.enzaId', 'DESC')
          .where('cardList.idolId = :id', { id: i })
          .andWhere('cardList.cardType LIKE :type', { type: 'S_%' })
          .getOne(),
      );
    }
    return latestSInfo;
  }

  async getUpdateHistory(): Promise<ScdbCardList[]> {
    return this.dataSource
      .getRepository(ScdbCardList)
      .createQueryBuilder('cardList')
      .orderBy('cardList.releaseDate', 'DESC')
      .limit(10)
      .getMany();
  }

  async getPcardList(): Promise<ScdbCardList[]> {
    return this.dataSource
      .getRepository(ScdbCardList)
      .createQueryBuilder('cardList')
      .where('cardList.cardType REGEXP "P_"')
      .orderBy('cardList.idolId', 'ASC')
      .addOrderBy('cardList.enzaId', 'ASC')
      .getMany();
  }

  async getScardList(): Promise<ScdbCardList[]> {
    return this.dataSource
      .getRepository(ScdbCardList)
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
      const pElement = await this.getGap(k.idolId, type, 0),
        sElement = await this.getGap(k.idolId, type, 1);
      if (pElement) produceList.push(pElement);
      if (sElement) supportList.push(sElement);
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
  ): Promise<ScdbCardList> {
    const src = this.dataSource
      .getRepository(ScdbCardList)
      .createQueryBuilder('cardList');

    switch (queryType) {
      case 0:
        src.where(
          new Brackets((q) => {
            q.where('cardList.getMethod = :getMethod1', {
              getMethod1: this.LIMITED,
            }).orWhere('cardList.getMethod = :getMethod2', {
              getMethod2: this.TWILIGHT,
            });
          }),
        );
        break;
      case 1:
        src.where('cardList.getMethod = :getMethod', {
          getMethod: this.GENERAL,
        });
        break;
      case 2:
        src.where(
          new Brackets((q) => {
            q.where('cardList.getMethod = :getMethod1', {
              getMethod1: this.LIMITED,
            })
              .orWhere('cardList.getMethod = :getMethod2', {
                getMethod2: this.GENERAL,
              })
              .orWhere('cardList.getMethod = :getMethod3', {
                getMethod3: this.TWILIGHT,
              })
              .orWhere('cardList.getMethod = :getMethod4', {
                getMethod4: this.MYSONG,
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
