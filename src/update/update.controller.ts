import {
  Body,
  Controller,
  Headers,
  HttpCode,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UpdateService } from './update.service';
import { UpdatePCard } from '../interfaces/updatepcard';
import { UpdateSCard } from '../interfaces/updatescard';

@Controller('update')
export class UpdateController {
  constructor(private updateService: UpdateService) {}

  @Post('newcardinfo')
  @HttpCode(201)
  async newCardInfo(
    @Body() payload: JSON,
    @Headers('X-CREDENTIAL') credential: string,
    @Headers('X-TOKEN') token: string,
  ): Promise<any> {
    this.updateService.checkCredential(credential);
    this.updateService.checkToken(token);
    this.updateService.checkPayload(payload);
    if (payload.hasOwnProperty('idolId')) {
      console.log('new Produce card');
      const idolId: string = (payload as any as UpdatePCard).idolId;
      if (await this.updateService.checkCardExistence(idolId)) {
        return;
      }
      this.updateService.saveJsonFile(
        payload,
        (payload as any as UpdatePCard).idolId + '.json',
      );
    } else if (payload.hasOwnProperty('supportIdolId')) {
      console.log('new Support card');
      const supportIdolId: string = (payload as any as UpdateSCard)
        .supportIdolId;
      if (await this.updateService.checkCardExistence(supportIdolId)) {
        return;
      }
      this.updateService.saveJsonFile(
        payload,
        (payload as any as UpdateSCard).supportIdolId + '.json',
      );
    }
  }

  @Post('idolinfo')
  @HttpCode(201)
  async idolInfo(
    @Body() payload: JSON,
    @Headers('X-CREDENTIAL') credential: string,
    @Headers('X-TOKEN') token: string,
  ): Promise<any> {
    this.updateService.checkCredential(credential);
    this.updateService.checkToken(token);
    if (payload.hasOwnProperty('id')) {
      this.updateService.saveIdolInfo(
        payload,
        String((payload as any).id).padStart(2, '0') + '.json',
      );
    } else {
      throw new UnprocessableEntityException('Error format.');
    }
  }
}
