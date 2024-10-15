import { Module } from '@nestjs/common';
import { PremissionService } from './premission.service';
import { PremissionController } from './premission.controller';
import { Premission } from './entities/premission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Premission])],
  controllers: [PremissionController],
  providers: [PremissionService],
})
export class PremissionModule {}
