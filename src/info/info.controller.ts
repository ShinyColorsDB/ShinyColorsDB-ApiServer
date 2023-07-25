import {
  Controller,
  Get,
  Header,
  Headers,
  NotFoundException,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InfoService } from './info.service';
import * as xmlbuilder2 from 'xmlbuilder2';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get('idollist')
  async getIdolList() {
    return await this.infoService.getIdollist();
  }

  @Get('idolinfo')
  async getIdolInfo(
    @Query('idolId') idolId: number,
    @Headers('CF-IPCountry') country: string,
    @Headers('X-Forwarded-For') forwarder: string,
  ) {
    if (
      isNaN(idolId) ||
      idolId < 1 ||
      (idolId > 28 && idolId < 801) ||
      idolId > 803
    ) {
      throw new NotFoundException(`Idol Id ${idolId} not found`);
    }
    console.log(`${country} user accessing iInfo ${idolId}`);
    console.log(`Forwarded by ${forwarder}`);

    return await this.infoService.getIdolInfo(idolId);
  }

  @Get('unitinfo')
  async getUnitInfo() {
    return this.infoService.getUnitInfo();
  }

  @Get('pcardinfo')
  async getPCardInfo(
    @Query('cardId') cardId: string,
    @Headers('CF-IPCountry') country: string,
    @Headers('X-Forwarded-For') forwarder: string,
  ) {
    if (!cardId) {
      throw new UnprocessableEntityException('Card Id is required');
    }

    const thisCard = await this.infoService.getPCardInfo(cardId);
    console.log(`${country} user accessing pCard ${thisCard.cardName}`);
    console.log(`Forwarded by ${forwarder}`);

    if (thisCard) {
      return thisCard;
    } else {
      throw new NotFoundException(`Card Id ${cardId} not found`);
    }
  }

  @Get('scardinfo')
  async getSCardInfo(
    @Query('cardId') cardId: string,
    @Headers('CF-IPCountry') country: string,
    @Headers('X-Forwarded-For') forwarder: string,
  ) {
    if (!cardId) {
      throw new UnprocessableEntityException('Card Id is required');
    }

    const thisCard = await this.infoService.getSCardInfo(cardId);
    console.log(`${country} user accessing sCard ${thisCard.cardName}`);
    console.log(`Forwarded by ${forwarder}`);

    if (thisCard) {
      return thisCard;
    } else {
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
  @Header('Content-Type', 'text/xml')
  async getSiteList() {
    const iList = await this.infoService.getIdollist(),
      pList = await this.infoService.getPcardList(),
      sList = await this.infoService.getScardList();

    const siteMap = xmlbuilder2
      .create({ version: '1.0', encoding: 'utf-8' })
      .ele('urlset', { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' });
    siteMap
      .ele('url')
      .ele('loc')
      .txt('https://shinycolors.moe/')
      .up()
      .ele('lastmod')
      .txt('2021-05-25')
      .up()
      .ele('changefreq')
      .txt('yearly')
      .up()
      .ele('priority')
      .txt('1')
      .up();

    for (const i of iList) {
      siteMap
        .ele('url')
        .ele('loc')
        .txt(`https://shinycolors.moe/idolinfo?idolid=${i.idolId}`)
        .up()
        .ele('lastmod')
        .txt('2021-05-25')
        .up()
        .ele('changefreq')
        .txt('yearly')
        .up()
        .ele('priority')
        .txt('0.8')
        .up();
    }

    for (const p of pList) {
      siteMap
        .ele('url')
        .ele('loc')
        .txt(`https://shinycolors.moe/pcardinfo?uuid=${p.cardUuid}`)
        .up()
        .ele('lastmod')
        .txt(p.lastModified)
        .up()
        .ele('changefreq')
        .txt('monthly')
        .up()
        .ele('priority')
        .txt('0.6')
        .up();
    }

    for (const s of sList) {
      siteMap
        .ele('url')
        .ele('loc')
        .txt(`https://shinycolors.moe/scardinfo?uuid=${s.cardUuid}`)
        .up()
        .ele('lastmod')
        .txt(s.lastModified)
        .up()
        .ele('changefreq')
        .txt('monthly')
        .up()
        .ele('priority')
        .txt('0.6')
        .up();
    }

    return siteMap.end({ prettyPrint: true });
  }

  @Get('sitelist2')
  @Header('Content-Type', 'text/plain')
  async getSiteList2() {
    const iList = await this.infoService.getIdollist(),
      pList = await this.infoService.getPcardList(),
      sList = await this.infoService.getScardList();

    let sitelist2 = 'https://shinycolors.moe/\n';

    for (const i of iList) {
      sitelist2 += `https://shinycolors.moe/idolinfo?idolid=${i.idolId}\n`;
    }

    for (const p of pList) {
      sitelist2 += `https://shinycolors.moe/pcardinfo?uuid=${p.cardUuid}\n`;
    }

    for (const s of sList) {
      sitelist2 += `https://shinycolors.moe/scardinfo?uuid=${s.cardUuid}\n`;
    }

    return sitelist2;
  }

  @Get('getLimitedTable')
  @Header('Content-Type', 'application/json')
  async getLimitedTable() {
    return await this.infoService.getTableByType(0);
  }

  @Get('getGeneralTable')
  @Header('Content-Type', 'application/json')
  async getGeneralTable() {
    return await this.infoService.getTableByType(1);
  }

  @Get('getAllTable')
  @Header('Content-Type', 'application/json')
  async getAllTable() {
    return await this.infoService.getTableByType(2);
  }
}
