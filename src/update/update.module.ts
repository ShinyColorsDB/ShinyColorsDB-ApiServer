import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idol } from '../entities/idol.entity';
import { UpdateService } from './update.service';
import { UpdateController } from './update.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Idol])],
    controllers: [UpdateController],
    providers: [UpdateService],
})
export class UpdateModule { }
