import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { ScdbCardList } from '../entities/ScdbCardList';
import { ScdbIdols } from '../entities/ScdbIdols';
import { ScdbUnits } from '../entities/ScdbUnits';
import { ScdbSupportSkillList } from '../entities/ScdbSupportSkillList';
import { ScdbCardSupportSkill } from 'src/entities/ScdbCardSupportSkill';

import { QuerySupportSkill } from '../interfaces/querysupportskill';
import { ScdbLiveInfo } from 'src/entities/ScdbLiveInfo';
import { ScdbAlbum } from 'src/entities/ScdbAlbum';

@Injectable()
export class InfoService {
  readonly TWILIGHT = 'TwilightCollection';
  readonly MYSONG = 'MySongCollection';
  readonly LIMITED = 'LimitedGasha';
  readonly GENERAL = 'GeneralGasha';
  readonly PARALLEL = 'ParallelCollection';
  readonly COLLAB = 'CollabTwilightCollection';
  constructor(private dataSource: DataSource) {}

  async getIdollist(): Promise<ScdbIdols[]> {
    return this.dataSource.getRepository(ScdbIdols).find({
      select: ['idolId', 'idolName', 'cv'],
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
      .leftJoinAndSelect('pcard.memoryChargeSkills', 'memoryChargeSkills')
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
      .leftJoinAndSelect('scard.idol', 'idolid')
      .leftJoinAndSelect('scard.cardSupportEvents', 'supportevents')
      .leftJoinAndSelect('scard.cardSupportSkills', 'supportskills')
      .leftJoinAndSelect('scard.cardProficiencies', 'proficiencies')
      .leftJoinAndSelect('scard.cardPanels', 'panels')
      .leftJoinAndSelect('panels.extraEffect', 'extrapaneleffect')
      .leftJoinAndSelect('scard.supportFightSkills', 'supportfightskills')
      .leftJoinAndSelect('scard.cardStatus', 'status')
      .orderBy('supportEvents.eventId', 'ASC')
      .addOrderBy('supportSkills.skillId', 'ASC')
      .addOrderBy('panels.panelId', 'ASC')
      .where('scard.cardUuid = :cardUuid', { cardUuid: cardUuid })
      .getOne();
  }

  async getRecentUpdate(): Promise<ScdbCardList[]> {
    return this.dataSource
      .getRepository(ScdbCardList)
      .createQueryBuilder('cardList')
      .orderBy('cardList.releaseDate', 'DESC')
      .limit(12)
      .getMany();
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

  async getLiveInfos(): Promise<ScdbLiveInfo[]> {
    return this.dataSource
      .getRepository(ScdbLiveInfo)
      .createQueryBuilder('live')
      .orderBy('live.liveID', 'DESC')
      .limit(6)
      .getMany();
  }

  async getLiveInfo(liveId: string): Promise<ScdbLiveInfo> {
    return this.dataSource
      .getRepository(ScdbLiveInfo)
      .createQueryBuilder('live')
      .where('live.liveID = :liveId', { liveId: liveId })
      .leftJoinAndSelect('live.liveSetLists', 'liveSetLists')
      .getOne();
  }

  async getAlbumInfos(): Promise<ScdbAlbum[]> {
    return this.dataSource
      .getRepository(ScdbAlbum)
      .createQueryBuilder('album')
      .where('album.albumCategory != :category', {
        category: '',
      })
      .orderBy('album.albumIndex', 'DESC')
      .limit(9)
      .getMany();
  }

  async getTableByType(type: number) {
    const produceList = await this.getLatestGashaCards(type, 0),
      supportList = await this.getLatestGashaCards(type, 1);

    return {
      produce: produceList,
      support: supportList,
    };
  }

  async getSupportSkillList(): Promise<ScdbSupportSkillList[]> {
    return this.dataSource.getRepository(ScdbSupportSkillList).find();
  }

  getQueryType(queryType: number) {
    switch (queryType) {
      case 0:
        return [
          this.TWILIGHT,
          this.MYSONG,
          this.LIMITED,
          this.PARALLEL,
          this.COLLAB,
        ];
      case 1:
        return [this.GENERAL];
      case 2:
        return [
          this.TWILIGHT,
          this.MYSONG,
          this.LIMITED,
          this.PARALLEL,
          this.COLLAB,
          this.GENERAL,
        ];
    }
  }

  async getLatestGashaCards(
    queryType: number,
    cardType: number,
  ): Promise<ScdbCardList[]> {
    const cardRepository = this.dataSource.getRepository(ScdbCardList);

    // Single query to get the latest card for each idol
    const cards = await cardRepository
      .createQueryBuilder('card')
      .innerJoin(
        (qb) =>
          qb
            .select('idolid')
            .addSelect('MAX(releaseDate)', 'maxReleaseDate')
            .from(ScdbCardList, 'sub')
            .where('sub.getmethod IN (:...getMethods)', {
              getMethods: this.getQueryType(queryType),
            })
            .andWhere('sub.cardtype = :cardType', {
              cardType: cardType === 0 ? 'P_SSR' : 'S_SSR',
            })
            .andWhere('sub.idolid BETWEEN 1 AND 28')
            .groupBy('sub.idolid'),
        'latest',
        'card.idolid = latest.idolid AND card.releaseDate = latest."maxReleaseDate"',
      )
      .where('card.getmethod IN (:...getMethods)', {
        getMethods: this.getQueryType(queryType),
      })
      .andWhere('card.idolid BETWEEN 1 AND 28')
      .orderBy('card.idolid', 'ASC')
      .getMany();

    return cards;
  }

  async query1SupportSkill(queryData: QuerySupportSkill): Promise<any> {
    const rankedQuery = this.dataSource
      .getRepository(ScdbCardSupportSkill)
      .createQueryBuilder('A')
      .select('E.idolid', 'E_IdolID')
      .addSelect('E.carduuid', 'E_CardUuid')
      .addSelect('E.cardname', 'E_CardName')
      .addSelect('E.cardtype', 'E_CardType')
      .addSelect('A.enzaid', 'EnzaID')
      .addSelect('A.skillname', 'A_SkillName')
      .addSelect('A.skilldesc', 'A_SkillDesc')
      .addSelect('A.skilllevel', 'A_SkillLevel')
      .addSelect('A.gainedat', 'A_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.enzaid ORDER BY A.enzaid ASC, A.skilllevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardList, 'E', 'A.enzaid = E.enzaid');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.idolid IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery.andWhere(
      '(A.skillname = :aSkillName AND A.skilllevel >= :aSkillLevel)',
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
      .select('E.idolid', 'E_IdolID')
      .addSelect('E.carduuid', 'E_CardUuid')
      .addSelect('E.cardname', 'E_CardName')
      .addSelect('E.cardtype', 'E_CardType')
      .addSelect('A.enzaid', 'EnzaID')
      .addSelect('A.skillname', 'A_SkillName')
      .addSelect('A.skilldesc', 'A_SkillDesc')
      .addSelect('A.skilllevel', 'A_SkillLevel')
      .addSelect('A.gainedat', 'A_GainedAt')
      .addSelect('B.skillname', 'B_SkillName')
      .addSelect('B.skilldesc', 'B_SkillDesc')
      .addSelect('B.skilllevel', 'B_SkillLevel')
      .addSelect('B.gainedat', 'B_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.enzaid ORDER BY A.enzaid ASC, A.skilllevel ASC, B.skilllevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardSupportSkill, 'B', 'A.enzaid = B.enzaid')
      .innerJoin(ScdbCardList, 'E', 'A.enzaid = E.enzaid');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.idolid IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery
      .andWhere(
        '(A.skillname = :aSkillName AND A.skilllevel >= :aSkillLevel)',
        {
          aSkillName: queryData.querySkills[0][0],
          aSkillLevel: queryData.querySkills[0][1],
        },
      )
      .andWhere(
        '(B.skillname = :bSkillName AND B.skilllevel >= :bSkillLevel)',
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
      .select('E.idolid', 'E_IdolID')
      .addSelect('E.carduuid', 'E_CardUuid')
      .addSelect('E.cardname', 'E_CardName')
      .addSelect('E.cardtype', 'E_CardType')
      .addSelect('A.enzaid', 'EnzaID')
      .addSelect('A.skillname', 'A_SkillName')
      .addSelect('A.skilldesc', 'A_SkillDesc')
      .addSelect('A.skilllevel', 'A_SkillLevel')
      .addSelect('A.gainedat', 'A_GainedAt')
      .addSelect('B.skillname', 'B_SkillName')
      .addSelect('B.skilldesc', 'B_SkillDesc')
      .addSelect('B.skilllevel', 'B_SkillLevel')
      .addSelect('B.gainedat', 'B_GainedAt')
      .addSelect('C.skillname', 'C_SkillName')
      .addSelect('C.skilldesc', 'C_SkillDesc')
      .addSelect('C.skilllevel', 'C_SkillLevel')
      .addSelect('C.gainedat', 'C_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.enzaid ORDER BY A.enzaid ASC, A.skilllevel ASC, B.skilllevel ASC, C.skilllevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardSupportSkill, 'B', 'A.enzaid = B.enzaid')
      .innerJoin(ScdbCardSupportSkill, 'C', 'A.enzaid = C.enzaid')
      .innerJoin(ScdbCardList, 'E', 'A.enzaid = E.enzaid');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.idolid IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery
      .andWhere(
        '(A.skillname = :aSkillName AND A.skilllevel >= :aSkillLevel)',
        {
          aSkillName: queryData.querySkills[0][0],
          aSkillLevel: queryData.querySkills[0][1],
        },
      )
      .andWhere(
        '(B.skillname = :bSkillName AND B.skilllevel >= :bSkillLevel)',
        {
          bSkillName: queryData.querySkills[1][0],
          bSkillLevel: queryData.querySkills[1][1],
        },
      )
      .andWhere(
        '(C.skillname = :cSkillName AND C.skilllevel >= :cSkillLevel)',
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
      .select('E.idolid', 'E_IdolID')
      .addSelect('E.carduuid', 'E_CardUuid')
      .addSelect('E.cardname', 'E_CardName')
      .addSelect('E.cardtype', 'E_CardType')
      .addSelect('A.enzaid', 'EnzaID')
      .addSelect('A.skillname', 'A_SkillName')
      .addSelect('A.skilldesc', 'A_SkillDesc')
      .addSelect('A.skilllevel', 'A_SkillLevel')
      .addSelect('A.gainedat', 'A_GainedAt')
      .addSelect('B.skillname', 'B_SkillName')
      .addSelect('B.skilldesc', 'B_SkillDesc')
      .addSelect('B.skilllevel', 'B_SkillLevel')
      .addSelect('B.gainedat', 'B_GainedAt')
      .addSelect('C.skillname', 'C_SkillName')
      .addSelect('C.skilldesc', 'C_SkillDesc')
      .addSelect('C.skilllevel', 'C_SkillLevel')
      .addSelect('C.gainedat', 'C_GainedAt')
      .addSelect('D.skillname', 'D_SkillName')
      .addSelect('D.skilldesc', 'D_SkillDesc')
      .addSelect('D.skilllevel', 'D_SkillLevel')
      .addSelect('D.gainedat', 'D_GainedAt')
      .addSelect(
        '(ROW_NUMBER() OVER (PARTITION BY A.enzaid ORDER BY A.enzaid ASC, A.skilllevel ASC, B.skilllevel ASC, C.skilllevel ASC, D.skilllevel ASC))',
        'RowNum',
      )
      .innerJoin(ScdbCardSupportSkill, 'B', 'A.enzaid = B.enzaid')
      .innerJoin(ScdbCardSupportSkill, 'C', 'A.enzaid = C.enzaid')
      .innerJoin(ScdbCardSupportSkill, 'D', 'A.enzaid = D.enzaid')
      .innerJoin(ScdbCardList, 'E', 'A.enzaid = E.enzaid');

    if (queryData.queryIdols.length) {
      rankedQuery.where('E.idolid IN (:...idolIds)', {
        idolIds: queryData.queryIdols,
      });
    }

    rankedQuery
      .andWhere(
        '(A.skillname = :aSkillName AND A.skilllevel >= :aSkillLevel)',
        {
          aSkillName: queryData.querySkills[0][0],
          aSkillLevel: queryData.querySkills[0][1],
        },
      )
      .andWhere(
        '(B.skillname = :bSkillName AND B.skilllevel >= :bSkillLevel)',
        {
          bSkillName: queryData.querySkills[1][0],
          bSkillLevel: queryData.querySkills[1][1],
        },
      )
      .andWhere(
        '(C.skillname = :cSkillName AND C.skilllevel >= :cSkillLevel)',
        {
          cSkillName: queryData.querySkills[2][0],
          cSkillLevel: queryData.querySkills[2][1],
        },
      )
      .andWhere(
        '(D.skillname = :dSkillName AND D.skilllevel >= :dSkillLevel)',
        {
          dSkillName: queryData.querySkills[3][0],
          dSkillLevel: queryData.querySkills[3][1],
        },
      );

    return rankedQuery.getRawMany();
  }
}
