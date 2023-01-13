import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';

import { UpdateService } from './update.service';
import { UpdatePCard } from '../interfaces/updatepcard';
import { UpdateSCard } from '../interfaces/updatescard';

@Controller('update')
export class UpdateController {
  constructor(private updateService: UpdateService) {}

  @Post('pcardinfo')
  @HttpCode(201)
  async newPcardInfo(
    @Body() payload: JSON,
    @Headers('X-CREDENTIAL') credential: string,
  ): Promise<any> {
    this.updateService.checkPayload(payload);
    this.updateService.checkCredential(credential);
    await this.updateService.checkCardExistence(
      (payload as any as UpdatePCard).idolId,
    );

    this.updateService.saveJsonFile(
      payload,
      (payload as any as UpdatePCard).idolId + '.json',
    );
    this.updateService.updatePCard(payload as any as UpdatePCard);
  }

  @Post('scardinfo')
  @HttpCode(201)
  async newScardInfo(
    @Body() payload: JSON,
    @Headers('X-CREDENTIAL') credential: string,
  ): Promise<any> {
    this.updateService.checkPayload(payload);
    this.updateService.checkCredential(credential);
    await this.updateService.checkCardExistence(
      (payload as any as UpdateSCard).supportIdolId,
    );

    this.updateService.saveJsonFile(
      payload,
      (payload as any as UpdateSCard).supportIdolId + '.json',
    );
    this.updateService.updateSCard(payload as any as UpdateSCard);
  }
}
