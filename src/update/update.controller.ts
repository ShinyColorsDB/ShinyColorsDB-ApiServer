import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';

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
    this.updateService.checkPayload(payload);
    this.updateService.checkCredential(credential);
    this.updateService.checkToken(token);
    if (payload.hasOwnProperty('idolId')) {
      const idolId: string = (payload as any as UpdatePCard).idolId;
      if (this.updateService.checkCardExistence(idolId)) {
        return;
      }
      this.updateService.saveJsonFile(
        payload,
        (payload as any as UpdatePCard).idolId + '.json',
      );
    } else if (payload.hasOwnProperty('supportIdolId')) {
      const supportIdolId: string = (payload as any as UpdateSCard)
        .supportIdolId;
      if (this.updateService.checkCardExistence(supportIdolId)) {
        return;
      }
      this.updateService.saveJsonFile(
        payload,
        (payload as any as UpdateSCard).supportIdolId + '.json',
      );
    }
  }
}
