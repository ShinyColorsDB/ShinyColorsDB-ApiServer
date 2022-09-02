import { Controller, Get, HttpException, HttpStatus, NotFoundException, Query, UnprocessableEntityException } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get('idollist')
  async getIdolList() {
    return await this.infoService.getIdollist();
  }

  @Get('idolinfo')
  async getIdolInfo(@Query('idolId') idolId: number) {
    if (isNaN(idolId) || idolId < 1 || idolId > 25) {
      throw new NotFoundException(`Idol Id ${idolId} not found`);
    }
    return await this.infoService.getIdolInfo(idolId);
  }

  @Get('unitinfo')
  async getUnitInfo() {
    return this.infoService.getUnitInfo();
  }

  @Get('pcardinfo')
  async getPCardInfo(@Query('cardId') cardId: string) {
    if (!cardId) {
      throw new UnprocessableEntityException('Card Id is required');
    }

    const thisCard = await this.infoService.getPCardInfo(cardId);

    if (thisCard) {
      return thisCard;
    }
    else {
      throw new NotFoundException(`Card Id ${cardId} not found`);
    }
  }

  @Get('scardinfo')
  async getSCardInfo(@Query('cardId') cardId: string) {
    if (!cardId) {
      throw new UnprocessableEntityException('Card Id is required');
    }

    const thisCard = await this.infoService.getSCardInfo(cardId);

    if (thisCard) {
      return thisCard;
    }
    else {
      throw new NotFoundException(`Card Id ${cardId} not found`);
    }
  }

  @Get('latestpinfo')
  async getLatestInfo() {
    return await this.infoService.getLatestPInfo();
  }

  @Get('latestsinfo')
  async getLatestSInfo() {
    return await this.infoService.getLatestSInfo();
  }

  @Get('updatehistory')
  async getUpdateHistory() {
    return await this.infoService.getUpdateHistory();
  }

  @Get('sitelist')
  async getSiteList() {
    const iList = await this.infoService.getIdollist(),
      pList = await this.infoService.getPcardList(),
      sList = await this.infoService.getScardList();

    let siteStr = "";
    for (let i of iList) {
      siteStr += `https://shinycolors.moe/idolinfo?idolid=${i.idolId}\n`;
    }

    for (let p of pList) {
      siteStr += `https://shinycolors.moe/pcardinfo?uuid=${p.cardUuid}\n`;
    }

    for (let s of sList) {
      siteStr += `https://shinycolors.moe/scardinfo?uuid=${s.cardUuid}\n`;
    }
    return siteStr;
  }
}
