import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';

import { UpdateService } from './update.service';
import { UpdatePCard } from '../interfaces/updatepcard';
import { UpdateSCard } from '../interfaces/updatescard';

const scardJsonPath = "/mnt/SC/scardjson/";

@Controller('update')
export class UpdateController {
    constructor(private updateService: UpdateService) { }

    @Post('pcardinfo')
    @HttpCode(201)
    async newPcardInfo(@Body() payload: Body, @Headers('X-CREDENTIAL') credential: String): Promise<any> {
        this.updateService.checkPayload(payload);
        this.updateService.checkCredential(credential);
        this.updateService.saveJsonFile(payload, (await payload.json()).idolId);
        return;
        this.updateService.updatePCard(await payload.json() as UpdatePCard);
    }

    @Post('scardinfo')
    @HttpCode(201)
    async newScardInfo(@Body() payload: Body, @Headers('X-CREDENTIAL') credential: String): Promise<any> {
        this.updateService.checkPayload(payload);
        this.updateService.checkCredential(credential);
        this.updateService.saveJsonFile(await payload.json(), (await payload.json()).idolId);
        return;
        this.updateService.updateSCard(await payload.json() as UpdateSCard);
    }
}
