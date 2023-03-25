import { Controller, Get, Query } from '@nestjs/common';
import { SpineService } from './spine.service';

@Controller('spine')
export class SpineController {
  constructor(private spineService: SpineService) {}

  @Get('idollist')
  async getIdolList() {
    return await this.spineService.getIdollist();
  }

  @Get('dresslist')
  async getDressList(@Query('idolId') idolId: number) {
    return await this.spineService.getDressList(idolId);
  }

  @Get('spinepreset')
  async getSpinePreset(@Query('idolId') idolId: number) {
    return await this.spineService.getSpinePreset(idolId);
  }
}
