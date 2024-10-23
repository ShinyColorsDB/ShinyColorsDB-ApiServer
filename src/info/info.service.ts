import { Injectable } from '@nestjs/common';
import { DataSource, Brackets, Not } from 'typeorm';

import { ScdbCardList } from '../entities/ScdbCardList';
import { ScdbIdols } from '../entities/ScdbIdols';
import { ScdbUnits } from '../entities/ScdbUnits';
import { ScdbSupportSkillList } from '../entities/ScdbSupportSkillList';
import { ScdbCardSupportSkill } from 'src/entities/ScdbCardSupportSkill';

import { QuerySupportSkill } from '../interfaces/querysupportskill';

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
      where: { idolId: Not(0) },
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
      .where('unit.unitId != :id1', { id1: 0 })
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
      .leftJoinAndSelect('memoryAppeals.extraEffect', 'extraMemoryEffect')
      .leftJoinAndSelect('pcard.cardPanels', 'panels')
      .leftJoinAndSelect('panels.extraEffect', 'extraPanelEffect')
      .leftJoinAndSelect('pcard.cardProduceAptitude', 'aptitudes')
      .leftJoinAndSelect('pcard.cardStatus', 'status')
      .leftJoinAndSelect('pcard.memoryChrageSkills', 'memoryChargeSkills')
      .orderBy('panels.panelId', 'ASC')
      .addOrderBy('memoryAppeals.memoryId', 'ASC')
      .addOrderBy('idolEvents.eventId', 'ASC')
      .addOrderBy('memoryChargeSkills.releaseEvolution', 'ASC')
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
      .leftJoinAndSelect('panels.extraEffect', 'extraPanelEffect')
      .leftJoinAndSelect('scard.supportFightSkills', 'supportFightSkills')
      .leftJoinAndSelect('scard.cardStatus', 'status')
      .orderBy('supportEvents.eventId', 'ASC')
      .addOrderBy('supportSkills.skillId', 'ASC')
      .addOrderBy('panels.panelId', 'ASC')
      .where('scard.cardUuid = :cardUuid', { cardUuid: cardUuid })
      .getOne();
  }

  async getLatestPInfo(): Promise<ScdbCardList[]> {
    const latestPInfo = [];
    for (let i = 1; i <= 28; i++) {
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
    for (let i = 1; i <= 28; i++) {
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
      if (pElement) {
        produceList.push(pElement);
      }
      if (sElement) {
        supportList.push(sElement);
      }
    }

    return {
      produce: produceList,
      support: supportList,
    };
  }

  async getSupportSkillList(): Promise<ScdbSupportSkillList[]> {
    return this.dataSource.getRepository(ScdbSupportSkillList).find();
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

  async query1SupportSkill(queryData: QuerySupportSkill): Promise<any> {
    const rankedQuery = this.dataSource
      .getRepository(ScdbCardSupportSkill)
      .createQueryBuilder('A')
      .select('E.IdolID', 'E_IdolID')
      .addSelect('E.CardUUID', 'E_CardUuid')
      .addSelect('E.CardName', 'E_CardName')
      .addSelect('E.CardType', 'E_CardType')
      .addSelect('A.EnzaID', 'EnzaID')
      .addSelect('A.SkillName', 'A_SkillName')
      .addSelect('A.SkillDesc', 'A_SkillDesc')
      .addSelect('A.SkillLevel', 'A_SkillLevel')
      .addSelect('A.GainedAt', 'A_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.EnzaID ORDER BY A.EnzaID ASC, A.SkillLevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardList, 'E', 'A.EnzaID = E.EnzaID');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.IdolID IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery.andWhere(
      '(A.SkillName = :aSkillName AND A.SkillLevel >= :aSkillLevel)',
      {
        aSkillName: queryData.querySkills[0][0],
        aSkillLevel: queryData.querySkills[0][1],
      },
    );

    return rankedQuery.getRawMany();
  }

  async query2SupportSkill(queryData: QuerySupportSkill): Promise<any> {
    const rankedQuery = this.dataSource
      .getRepository(ScdbCardSupportSkill)
      .createQueryBuilder('A')
      .select('E.IdolID', 'E_IdolID')
      .addSelect('E.CardUUID', 'E_CardUuid')
      .addSelect('E.CardName', 'E_CardName')
      .addSelect('E.CardType', 'E_CardType')
      .addSelect('A.EnzaID', 'EnzaID')
      .addSelect('A.SkillName', 'A_SkillName')
      .addSelect('A.SkillDesc', 'A_SkillDesc')
      .addSelect('A.SkillLevel', 'A_SkillLevel')
      .addSelect('A.GainedAt', 'A_GainedAt')
      .addSelect('B.SkillName', 'B_SkillName')
      .addSelect('B.SkillDesc', 'B_SkillDesc')
      .addSelect('B.SkillLevel', 'B_SkillLevel')
      .addSelect('B.GainedAt', 'B_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.EnzaID ORDER BY A.EnzaID ASC, A.SkillLevel ASC, B.SkillLevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardSupportSkill, 'B', 'A.EnzaID = B.EnzaID')
      .innerJoin(ScdbCardList, 'E', 'A.EnzaID = E.EnzaID');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.IdolID IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery
      .andWhere(
        '(A.SkillName = :aSkillName AND A.SkillLevel >= :aSkillLevel)',
        {
          aSkillName: queryData.querySkills[0][0],
          aSkillLevel: queryData.querySkills[0][1],
        },
      )
      .andWhere(
        '(B.SkillName = :bSkillName AND B.SkillLevel >= :bSkillLevel)',
        {
          bSkillName: queryData.querySkills[1][0],
          bSkillLevel: queryData.querySkills[1][1],
        },
      );

    return rankedQuery.getRawMany();
  }

  async query3SupportSkill(queryData: QuerySupportSkill): Promise<any> {
    const rankedQuery = this.dataSource
      .getRepository(ScdbCardSupportSkill)
      .createQueryBuilder('A')
      .select('E.IdolID', 'E_IdolID')
      .addSelect('E.CardUUID', 'E_CardUuid')
      .addSelect('E.CardName', 'E_CardName')
      .addSelect('E.CardType', 'E_CardType')
      .addSelect('A.EnzaID', 'EnzaID')
      .addSelect('A.SkillName', 'A_SkillName')
      .addSelect('A.SkillDesc', 'A_SkillDesc')
      .addSelect('A.SkillLevel', 'A_SkillLevel')
      .addSelect('A.GainedAt', 'A_GainedAt')
      .addSelect('B.SkillName', 'B_SkillName')
      .addSelect('B.SkillDesc', 'B_SkillDesc')
      .addSelect('B.SkillLevel', 'B_SkillLevel')
      .addSelect('B.GainedAt', 'B_GainedAt')
      .addSelect('C.SkillName', 'C_SkillName')
      .addSelect('C.SkillDesc', 'C_SkillDesc')
      .addSelect('C.SkillLevel', 'C_SkillLevel')
      .addSelect('C.GainedAt', 'C_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.EnzaID ORDER BY A.EnzaID ASC, A.SkillLevel ASC, B.SkillLevel ASC, C.SkillLevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardSupportSkill, 'B', 'A.EnzaID = B.EnzaID')
      .innerJoin(ScdbCardSupportSkill, 'C', 'A.EnzaID = C.EnzaID')
      .innerJoin(ScdbCardList, 'E', 'A.EnzaID = E.EnzaID');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.IdolID IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery
      .andWhere(
        '(A.SkillName = :aSkillName AND A.SkillLevel >= :aSkillLevel)',
        {
          aSkillName: queryData.querySkills[0][0],
          aSkillLevel: queryData.querySkills[0][1],
        },
      )
      .andWhere(
        '(B.SkillName = :bSkillName AND B.SkillLevel >= :bSkillLevel)',
        {
          bSkillName: queryData.querySkills[1][0],
          bSkillLevel: queryData.querySkills[1][1],
        },
      )
      .andWhere(
        '(C.SkillName = :cSkillName AND C.SkillLevel >= :cSkillLevel)',
        {
          cSkillName: queryData.querySkills[2][0],
          cSkillLevel: queryData.querySkills[2][1],
        },
      );

    return rankedQuery.getRawMany();
  }

  async query4SupportSkill(queryData: QuerySupportSkill): Promise<any> {
    const rankedQuery = this.dataSource
      .getRepository(ScdbCardSupportSkill)
      .createQueryBuilder('A')
      .select('E.IdolID', 'E_IdolID')
      .addSelect('E.CardUUID', 'E_CardUuid')
      .addSelect('E.CardName', 'E_CardName')
      .addSelect('E.CardType', 'E_CardType')
      .addSelect('A.EnzaID', 'EnzaID')
      .addSelect('A.SkillName', 'A_SkillName')
      .addSelect('A.SkillDesc', 'A_SkillDesc')
      .addSelect('A.SkillLevel', 'A_SkillLevel')
      .addSelect('A.GainedAt', 'A_GainedAt')
      .addSelect('B.SkillName', 'B_SkillName')
      .addSelect('B.SkillDesc', 'B_SkillDesc')
      .addSelect('B.SkillLevel', 'B_SkillLevel')
      .addSelect('B.GainedAt', 'B_GainedAt')
      .addSelect('C.SkillName', 'C_SkillName')
      .addSelect('C.SkillDesc', 'C_SkillDesc')
      .addSelect('C.SkillLevel', 'C_SkillLevel')
      .addSelect('C.GainedAt', 'C_GainedAt')
      .addSelect('D.SkillName', 'D_SkillName')
      .addSelect('D.SkillDesc', 'D_SkillDesc')
      .addSelect('D.SkillLevel', 'D_SkillLevel')
      .addSelect('D.GainedAt', 'D_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.EnzaID ORDER BY A.EnzaID ASC, A.SkillLevel ASC, B.SkillLevel ASC, C.SkillLevel ASC, D.SkillLevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardSupportSkill, 'B', 'A.EnzaID = B.EnzaID')
      .innerJoin(ScdbCardSupportSkill, 'C', 'A.EnzaID = C.EnzaID')
      .innerJoin(ScdbCardSupportSkill, 'D', 'A.EnzaID = D.EnzaID')
      .innerJoin(ScdbCardList, 'E', 'A.EnzaID = E.EnzaID');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.IdolID IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery
      .andWhere(
        '(A.SkillName = :aSkillName AND A.SkillLevel >= :aSkillLevel)',
        {
          aSkillName: queryData.querySkills[0][0],
          aSkillLevel: queryData.querySkills[0][1],
        },
      )
      .andWhere(
        '(B.SkillName = :bSkillName AND B.SkillLevel >= :bSkillLevel)',
        {
          bSkillName: queryData.querySkills[1][0],
          bSkillLevel: queryData.querySkills[1][1],
        },
      )
      .andWhere(
        '(C.SkillName = :cSkillName AND C.SkillLevel >= :cSkillLevel)',
        {
          cSkillName: queryData.querySkills[2][0],
          cSkillLevel: queryData.querySkills[2][1],
        },
      )
      .andWhere(
        '(D.SkillName = :dSkillName AND D.SkillLevel >= :dSkillLevel)',
        {
          dSkillName: queryData.querySkills[3][0],
          dSkillLevel: queryData.querySkills[3][1],
        },
      );

    return rankedQuery.getRawMany();
  }
}
