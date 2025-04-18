import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  NotFoundException,
  Post,
  Query,
  UnprocessableEntityException,
} from '@nestjs/common';

import { QuerySupportSkill } from '../interfaces/querysupportskill';

import { InfoService } from './info.service';
import * as xmlbuilder2 from 'xmlbuilder2';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get('idolList')
  async getIdolList() {
    return await this.infoService.getIdollist();
  }

  @Get('idolInfo')
  async getIdolInfo(
    @Query('idolId') idolId: number,
    @Headers('CF-IPCountry') country: string,
    @Headers('X-Forwarded-For') forwarder: string,
  ) {
    if (
      isNaN(idolId) ||
      (idolId > 28 && idolId < 801 && idolId != 91) ||
      idolId > 804
    ) {
      throw new NotFoundException(`Idol Id ${idolId} not found`);
    }
    console.log(`${country} user accessing iInfo ${idolId}`);
    console.log(`Forwarded by ${forwarder}`);

    return await this.infoService.getIdolInfo(idolId);
  }

  @Get('unitInfo')
  async getUnitInfo() {
    return this.infoService.getUnitInfo();
  }

  @Get('pCardInfo')
  async getPCardInfo(
    @Query('cardId') cardId: string,
    @Headers('CF-IPCountry') country: string,
    @Headers('X-Forwarded-For') forwarder: string,
  ) {
    if (!cardId) {
      throw new UnprocessableEntityException('Card Id is required');
    }

    const thisCard = await this.infoService.getPCardInfo(cardId);

    if (thisCard) {
      console.log(`${country} user accessing pCard ${thisCard.cardName}`);
      console.log(`Forwarded by ${forwarder}`);
      return thisCard;
    } else {
      throw new NotFoundException(`Card Id ${cardId} not found`);
    }
  }

  @Get('sCardInfo')
  async getSCardInfo(
    @Query('cardId') cardId: string,
    @Headers('CF-IPCountry') country: string,
    @Headers('X-Forwarded-For') forwarder: string,
  ) {
    if (!cardId) {
      throw new UnprocessableEntityException('Card Id is required');
    }

    const thisCard = await this.infoService.getSCardInfo(cardId);

    if (thisCard) {
      console.log(`${country} user accessing sCard ${thisCard.cardName}`);
      console.log(`Forwarded by ${forwarder}`);
      return thisCard;
    } else {
      throw new NotFoundException(`Card Id ${cardId} not found`);
    }
  }

  @Get('recentUpdate')
  async getRecentUpdate() {
    return await this.infoService.getRecentUpdate();
  }

  @Get('latestPInfo')
  async getLatestInfo() {
    return await this.infoService.getLatestPInfo();
  }

  @Get('latestSInfo')
  async getLatestSInfo() {
    return await this.infoService.getLatestSInfo();
  }

  @Get('liveInfos')
  async getLiveInfos() {
    return await this.infoService.getLiveInfos();
  }

  @Get('liveInfo')
  async getLiveInfo(@Query('liveId') liveId: string) {
    return await this.infoService.getLiveInfo(liveId);
  }

  @Get('albumInfos')
  async getAlbumInfos() {
    return await this.infoService.getAlbumInfos();
  }

  @Get('updateHistory')
  async getUpdateHistory() {
    return await this.infoService.getUpdateHistory();
  }

  @Get('supportSkillList')
  async getSupportSkillList() {
    return await this.infoService.getSupportSkillList();
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
      .txt('2023-08-29')
      .up()
      .ele('changefreq')
      .txt('yearly')
      .up()
      .ele('priority')
      .txt('1')
      .up();

    siteMap
      .ele('url')
      .ele('loc')
      .txt('https://shinycolors.moe/timetable')
      .up()
      .ele('lastmod')
      .txt('2023-04-01')
      .up()
      .ele('changefreq')
      .txt('yearly')
      .up()
      .ele('priority')
      .txt('1')
      .up();

    siteMap
      .ele('url')
      .ele('loc')
      .txt('https://shinycolors.moe/cardle')
      .up()
      .ele('lastmod')
      .txt('2023-07-05')
      .up()
      .ele('changefreq')
      .txt('yearly')
      .up()
      .ele('priority')
      .txt('1')
      .up();

    siteMap
      .ele('url')
      .ele('loc')
      .txt('https://shinycolors.moe/r-lookup')
      .up()
      .ele('lastmod')
      .txt('2023-08-28')
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
    sitelist2 += 'https://shinycolors.moe/timetable\n';
    sitelist2 += 'https://shinycolors.moe/cardle\n';
    sitelist2 += 'https://shinycolors.moe/r-lookup\n';

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

  @Post('querySupportSkill')
  @Header('Content-Type', 'application/json')
  async querySupportSkill(@Body() queryData: QuerySupportSkill) {
    switch (queryData.querySkills.length) {
      case 1:
        return (await this.infoService.query1SupportSkill(queryData)).filter(
          (e) => {
            return e.RowNum == '1';
          },
        );
      case 2:
        return (await this.infoService.query2SupportSkill(queryData)).filter(
          (e) => {
            return e.RowNum == '1';
          },
        );
      case 3:
        return (await this.infoService.query3SupportSkill(queryData)).filter(
          (e) => {
            return e.RowNum == '1';
          },
        );
      case 4:
        return (await this.infoService.query4SupportSkill(queryData)).filter(
          (e) => {
            return e.RowNum == '1';
          },
        );
      default:
        break;
    }
  }
}
