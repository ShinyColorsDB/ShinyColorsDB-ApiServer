import { ConflictException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { isEmpty, isNotEmptyObject } from 'class-validator';
import { DataSource } from 'typeorm';

import { CardList } from 'src/entities/cardList.entity';
import { UpdatePCard } from 'src/interfaces/updatepcard';
import { UpdateSCard } from '../interfaces/updatescard';

const CardJsonPath = '/mnt/SC/scardjson/';

@Injectable()
export class UpdateService {
    constructor(private dataSource: DataSource) { }

    async updatePCard(payload: UpdatePCard) {

    }

    async updateSCard(payload: UpdateSCard) {

    }

    checkPayload(payload: Body): void {
        if (!isNotEmptyObject(payload)) {
            console.error("Payload Error");
            throw new UnprocessableEntityException("Payload Error");
        }
    }

    checkCredential(credential: String): void {
        if (isEmpty(credential) || credential != process.env.UPDATE_CREDENTIAL) {
            console.error("Credential Error");
            throw new UnauthorizedException("Credential Error");
        }
    }

    saveJsonFile(payload: Body, fileName: string) {
        fs.writeFileSync(path.join(CardJsonPath, fileName), JSON.stringify(payload));
    }

    async checkCardExistence(cardId: number): Promise<void> {
        if (isEmpty(cardId) ||
            await this.dataSource.getRepository(CardList).createQueryBuilder('cardlist').where('cardlist.cardId = :cardId', { cardId: cardId }).getOne() == null
        ) {
            console.error("Already Exist");
            throw new ConflictException("Already Exist");
        }
    }

    getImage() {

    }
}
