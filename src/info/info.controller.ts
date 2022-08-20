import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { Request } from 'express';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get('idollist')
  async getIdolList() {
    return this.infoService.getIdollist();
  }

  @Get('idolinfo')
  async getIdolInfo(@Query('idolId') idolId) {
    if (isNaN(idolId) || idolId < 1 || idolId > 25) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.infoService.getIdolInfo(idolId);
  }

  @Get('unitinfo')
  async getUnitInfo() {
    return this.infoService.getUnitInfo();
  }

  @Get('pcardinfo')
  async getPCardInfo(@Query('cardId') cardId) {
    return this.infoService.getPCardInfo(cardId);
  }
}
