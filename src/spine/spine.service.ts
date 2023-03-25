import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ScdbIdolDress } from '../entities/ScdbIdolDress.entity';
import { ScdbIdols } from '../entities/ScdbIdols.entity';
import { ScdbSpinePreset } from '../entities/ScdbSpinePreset.entity';

import { DataSource } from 'typeorm';

@Injectable()
export class SpineService {
  constructor(private dataSource: DataSource) {}

  async getIdollist(): Promise<ScdbIdols[]> {
    return this.dataSource.getRepository(ScdbIdols).find({
      select: ['idolId', 'idolName', 'nickName'],
      order: { idolId: 'ASC' },
    });
  }

  async getDressList(idolId: number): Promise<ScdbIdolDress[]> {
    if (idolId == undefined) {
      throw new UnprocessableEntityException(
        'Query variable `idolId` is required',
      );
    }
    if (idolId < 0 || idolId > 26) {
      throw new NotFoundException(`Idol Id ${idolId} not found`);
    }
    return this.dataSource.query(
      'SELECT SCDB_IdolDress.IdolId as idolId, SCDB_IdolDress.DressName as dressName, SCDB_IdolDress.DressUUID as dressUuid, SCDB_IdolDress.Sml_Cloth0 as sml_Cloth0, SCDB_IdolDress.Sml_Cloth1 as sml_Cloth1, SCDB_IdolDress.Big_Cloth0 as big_Cloth0, SCDB_IdolDress.Big_Cloth1 as big_Cloth1, SCDB_IdolDress.DressType as dressType, SCDB_IdolDress.Exist as exist FROM `SCDB_IdolDress` WHERE `IdolID` = ' +
        idolId.toString() +
        ' ORDER BY FIELD (`DressType`, "P_SSR", "P_SR", "Anniversary", "Mizugi", "Special", "FesReward", "FesTour", "Other"), `EnzaId`',
    );
  }

  async getSpinePreset(idolId: number): Promise<ScdbSpinePreset[]> {
    return this.dataSource
      .getRepository(ScdbSpinePreset)
      .createQueryBuilder('preset')
      .where('preset.idolId = :idolId', { idolId: idolId })
      .orderBy('preset.presetId', 'ASC')
      .getMany();
  }
}
