import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as fns from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import { isEmpty, isNotEmptyObject } from 'class-validator';
import { DataSource } from 'typeorm';

import { CardList } from 'src/entities/cardList.entity';
import { UpdatePCard } from 'src/interfaces/updatepcard';
import { UpdateSCard } from '../interfaces/updatescard';
import { UpdateUtilities } from './update.utilities';
import { CardIdolEvent } from 'src/entities/cardIdolEvent.entity';

@Injectable()
export class UpdateService {
  UpdateUtilities: UpdateUtilities;
  constructor(private dataSource: DataSource) {
    this.UpdateUtilities = new UpdateUtilities();
  }

  async updatePCard(payload: UpdatePCard) {
    const bigPic1 = uuidv4(),
      bigPic2 = uuidv4(),
      smlPic = uuidv4(),
      cardUuid = uuidv4();
    if (
      (await this.checkDuplicateUuid(bigPic1)) ||
      (await this.checkDuplicateUuid(bigPic2)) ||
      (await this.checkDuplicateUuid(smlPic)) ||
      (await this.checkDuplicateUuid(cardUuid))
    ) {
      this.updatePCard(payload);
      return;
    }
    const newCard = new CardList();
    newCard.enzaId = payload.idolId;
    newCard.idolId = Number(payload.idol.character.id);
    newCard.cardName = this.UpdateUtilities.removeSpace(payload.idol.name);
    newCard.cardUuid = cardUuid;
    newCard.bigPic1 = bigPic1;
    newCard.bigPic2 = bigPic2;
    newCard.smlPic = smlPic;
    newCard.cardType = this.UpdateUtilities.getCardType(payload.idolId);
    newCard.getMethod = null;
    newCard.ideaMark = null;
    newCard.cardHash = payload.idol.hash;
    newCard.releaseDate = fns.format(new Date(), 'yyyy-MM-dd');
    newCard.cardIdolEvents = this.UpdateUtilities.getIdolEvents(
      payload.idol.produceIdolEvents,
      payload.idol.produceAfterEvents,
    );
    newCard.cardMemoryAppeals = this.UpdateUtilities.getMemoryAppeals(
      payload.idol.memoryAppeals,
      payload.idolId,
    );
    newCard.cardPanels = this.UpdateUtilities.getPanels(
      payload.idol.skillPanels,
    );
    await this.dataSource.getRepository(CardList).save(newCard);
    await this.UpdateUtilities.getPImage(
      payload.idolId,
      payload.idol.hash,
      bigPic1,
      bigPic2,
      smlPic,
    );

    if (this.UpdateUtilities.isPSSR(payload.idolId)) {
      this.UpdateUtilities.getPSSRMovie(payload.idolId, payload.idol.hash);
    } else if (this.UpdateUtilities.isPSR(payload.idolId)) {
      this.UpdateUtilities.getPSRMovie(payload.idolId, payload.idol.hash);
    }
  }

  async updateSCard(payload: UpdateSCard) {
    const bigPic1 = uuidv4(),
      smlPic = uuidv4(),
      cardUuid = uuidv4();
    if (
      (await this.checkDuplicateUuid(bigPic1)) ||
      (await this.checkDuplicateUuid(smlPic)) ||
      (await this.checkDuplicateUuid(cardUuid))
    ) {
      this.updateSCard(payload);
      return;
    }
    const newCard = new CardList();
    newCard.enzaId = payload.supportIdolId;
    newCard.idolId = Number(payload.supportIdol.character.id);
    newCard.cardName = this.UpdateUtilities.removeSpace(
      payload.supportIdol.name,
    );
    newCard.cardUuid = cardUuid;
    newCard.bigPic1 = bigPic1;
    newCard.bigPic2 = null;
    newCard.smlPic = smlPic;
    newCard.cardType = this.UpdateUtilities.getCardType(payload.supportIdolId);
    newCard.getMethod = null;
    newCard.ideaMark = payload.supportIdol.ideaMark;
    newCard.cardHash = payload.supportIdol.hash;
    newCard.releaseDate = fns.format(new Date(), 'yyyy-MM-dd');
    newCard.cardPanels = this.UpdateUtilities.getPanels(
      payload.supportIdol.skillPanels,
    );
    newCard.cardProficiencies = this.UpdateUtilities.getProficiencies(
      payload.musicSupportProficiencyBonuses,
      payload.supportIdolId,
    );
    newCard.cardSupportEvents = this.UpdateUtilities.getSupportEvents(
      payload.supportIdol.produceSupportIdolEvents,
    );
    newCard.cardSupportSkills = this.UpdateUtilities.getSupportSkills(
      payload.supportIdol.supportSkills,
    );
    await this.dataSource.getRepository(CardList).save(newCard);
    await this.UpdateUtilities.getSImage(
      payload.supportIdolId,
      payload.supportIdol.hash,
      bigPic1,
      smlPic,
    );
  }

  async checkDuplicateUuid(uuid: string): Promise<boolean> {
    if (
      (await this.dataSource
        .getRepository(CardList)
        .createQueryBuilder('cardlist')
        .where('cardlist.cardUuid = :uuid', { uuid: uuid })
        .orWhere('cardlist.bigPic1 = :uuid', { uuid: uuid })
        .orWhere('cardlist.bigPic2 = :uuid', { uuid: uuid })
        .orWhere('cardlist.smlPic = :uuid', { uuid: uuid })
        .getOne()) != null
    ) {
      return true;
    } else {
      return false;
    }
  }

  checkPayload(payload: JSON): void {
    if (!isNotEmptyObject(payload)) {
      console.error('Payload Error');
      throw new UnprocessableEntityException('Payload Error');
    }
  }

  checkCredential(credential: string): void {
    if (isEmpty(credential) || credential != process.env.UPDATE_CREDENTIAL) {
      console.error('Credential Error');
      throw new UnauthorizedException('Credential Error');
    }
  }

  saveJsonFile(payload: JSON, fileName: string) {
    console.log(fileName);
    fs.writeFileSync(
      path.join(process.env.FILE_CARDJSON_PATH, fileName),
      JSON.stringify(payload),
    );
  }

  async checkCardExistence(enzaId: string): Promise<void> {
    if (
      isEmpty(enzaId) ||
      (await this.dataSource
        .getRepository(CardList)
        .createQueryBuilder('cardlist')
        .where('cardlist.enzaId = :enzaId', { enzaId: enzaId })
        .getOne()) != null
    ) {
      console.error('Already Exist');
      throw new ConflictException('Already Exist');
    }
  }
}
