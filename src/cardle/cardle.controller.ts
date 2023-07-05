import { Controller, Get } from '@nestjs/common';
import { CardleService } from './cardle.service';

@Controller('cardle')
export class CardleController {
  constructor(private cardleService: CardleService) {}

  @Get('getCardle')
  async getCardle() {
    return this.cardleService.getCardle();
  }
}
