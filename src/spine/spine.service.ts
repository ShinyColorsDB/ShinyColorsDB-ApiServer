import { Injectable, NotFoundException } from '@nestjs/common';
import { IdolDress } from 'src/entities/idolDress.entity';
import { DataSource } from 'typeorm';
import { Idol } from '../entities/idol.entity';

@Injectable()
export class SpineService {
    constructor(private dataSource: DataSource) { }

    async getIdollist(): Promise<Idol[]> {
        return this.dataSource.getRepository(Idol).find({
            select: ['idolId', 'idolName', 'nickName'],
            order: { idolId: 'ASC' },
        });
    }

    async getDressList(idolId: number): Promise<IdolDress[]> {
        if (idolId < 0 || idolId > 26) {
            throw new NotFoundException(`Idol Id ${idolId} not found`);
        }
        return this.dataSource
            .query('SELECT SCDB_IdolDress.IdolId as idolId, SCDB_IdolDress.DressName as dressName, SCDB_IdolDress.DressUUID as dressUuid, SCDB_IdolDress.Sml_Cloth0 as sml_Cloth0, SCDB_IdolDress.Sml_Cloth1 as sml_Cloth1, SCDB_IdolDress.Big_Cloth0 as big_Cloth0, SCDB_IdolDress.Big_Cloth1 as big_Cloth1, SCDB_IdolDress.DressType as dressType, SCDB_IdolDress.Exist as exist FROM `SCDB_IdolDress` WHERE `IdolID` = ' + idolId.toString() + ' ORDER BY FIELD (`DressType`, \"P_SSR\", \"P_SR\", \"Anniversary\", \"Mizugi\", \"Special\", \"FesReward\", \"FesTour\", \"Other\"), `EnzaId`')
    }
}
