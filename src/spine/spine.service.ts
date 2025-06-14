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

    if (
      idolId < 0 ||
      (idolId > 28 && idolId < 801 && idolId != 91) ||
      idolId > 804
    ) {
      throw new NotFoundException(`Idol Id ${idolId} not found`);
    }

    return this.dataSource
      .getRepository(ScdbIdolDress)
      .createQueryBuilder('dress')
      .select('dress.idolid', 'idolId')
      .addSelect('dress.dressname', 'dressName')
      .addSelect('dress.dressuuid', 'dressUuid')
      .addSelect('dress.sml_cloth0', 'sml_Cloth0')
      .addSelect('dress.sml_cloth1', 'sml_Cloth1')
      .addSelect('dress.big_cloth0', 'big_Cloth0')
      .addSelect('dress.big_cloth1', 'big_Cloth1')
      .addSelect('dress.dresstype', 'dressType')
      .addSelect('dress.enzaid', 'enzaId')
      .addSelect('dress.exist', 'exist')
      .where('dress.idolid = :idolId', { idolId: idolId })
      .addSelect(
        `
        CASE dress.dresstype
          WHEN 'P_UR' THEN 1
          WHEN 'P_SSR' THEN 2
          WHEN 'P_SR' THEN 3
          WHEN 'Anniversary' THEN 4
          WHEN 'Mizugi' THEN 5
          WHEN 'Special' THEN 6
          WHEN 'FesReward' THEN 7
          WHEN 'FesTour' THEN 8
          WHEN 'Other' THEN 9
          ELSE 10
        END
      `,
        'dress_type_order',
      )
      .orderBy('dress_type_order', 'ASC')
      .addOrderBy('dress.enzaid', 'ASC')
      .getRawMany();
  }

  async getSpinePreset(idolId: number): Promise<ScdbSpinePreset[]> {
    return this.dataSource
      .getRepository(ScdbSpinePreset)
      .createQueryBuilder('preset')
      .where('preset.idolid = :idolId', { idolId: idolId })
      .orderBy('preset.presetid', 'ASC')
      .getMany();
  }
}
