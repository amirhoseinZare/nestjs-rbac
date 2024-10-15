import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremissionService } from './premission.service';
import { CreatePremissionDto } from './dto/create-premission.dto';
import { UpdatePremissionDto } from './dto/update-premission.dto';

@Controller('premission')
export class PremissionController {
  constructor(private readonly premissionService: PremissionService) {}

  @Post()
  create(@Body() createPremissionDto: CreatePremissionDto) {
    return this.premissionService.create(createPremissionDto);
  }

  @Get()
  findAll() {
    return this.premissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.premissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePremissionDto: UpdatePremissionDto) {
    return this.premissionService.update(+id, updatePremissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.premissionService.remove(+id);
  }
}
