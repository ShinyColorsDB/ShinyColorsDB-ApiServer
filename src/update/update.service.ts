import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { isEmpty, isNotEmptyObject } from 'class-validator';
import { DataSource } from 'typeorm';

import { ScdbCardList } from '../entities/ScdbCardList';

@Injectable()
export class UpdateService {
  constructor(private dataSource: DataSource) {}

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

  checkToken(token: string): void {
    if (isEmpty(token) || token != process.env.UPDATE_TOKEN) {
      console.error('Token Error');
      throw new UnauthorizedException('Token Error');
    }
  }

  saveJsonFile(payload: JSON, fileName: string) {
    console.log('Saving cardId ' + fileName + ' to filesystem');
    fs.writeFileSync(
      path.join(process.env.FILE_CARDJSON_TEMP_PATH, fileName),
      JSON.stringify(payload),
    );
  }

  saveIdolInfo(payload: JSON, fileName: string) {
    console.log('Saving idolId ' + fileName + ' to filesystem');
    fs.writeFileSync(
      path.join(process.env.FILE_IDOLINFO_PATH, fileName),
      JSON.stringify(payload),
    );
  }

  async checkCardExistence(enzaId: string): Promise<boolean> {
    if (
      isEmpty(enzaId) ||
      (await this.dataSource
        .getRepository(ScdbCardList)
        .createQueryBuilder('cardlist')
        .where('cardlist.enzaId = :enzaId', { enzaId: enzaId })
        .getOne()) != null
    ) {
      console.error('Card already exists');
      return true;
    } else {
      return false;
    }
  }
}
