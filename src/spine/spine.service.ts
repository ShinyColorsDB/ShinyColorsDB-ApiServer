import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ScdbIdolDress } from '../entities/ScdbIdolDress';
import { ScdbIdols } from '../entities/ScdbIdols';
import { ScdbSpinePreset } from '../entities/ScdbSpinePreset';

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

  async getDressList(idolId: number): Promise<any[]> {
    if (idolId == undefined) {
      throw new UnprocessableEntityException(
        'Query variable `idolId` is required',
      );
    }

    if (idolId < 0 || (idolId > 28 && idolId < 801) || idolId > 803) {
      throw new NotFoundException(`Idol Id ${idolId} not found`);
    }

    return this.dataSource
      .getRepository(ScdbIdolDress)
      .createQueryBuilder('dress')
      .select('dress.IdolId', 'idolId')
      .addSelect('dress.DressName', 'dressName')
      .addSelect('dress.DressUUID', 'dressUuid')
      .addSelect('dress.Sml_Cloth0', 'sml_Cloth0')
      .addSelect('dress.Sml_Cloth1', 'sml_Cloth1')
      .addSelect('dress.Big_Cloth0', 'big_Cloth0')
      .addSelect('dress.Big_Cloth1', 'big_Cloth1')
      .addSelect('dress.DressType', 'dressType')
      .addSelect('dress.Exist', 'exist')
      .where('dress.IdolId = :idolId', { idolId: idolId })
      .andWhere('dress.Exist != 0')
      .orderBy(
        'FIELD (dress.DressType, "P_SSR", "P_SR", "Anniversary", "Mizugi", "Special", "FesReward", "FesTour", "Other")',
      )
      .addOrderBy('dress.EnzaId', 'ASC')
      .getRawMany();
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
