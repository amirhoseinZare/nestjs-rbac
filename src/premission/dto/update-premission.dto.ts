import { PartialType } from '@nestjs/mapped-types';
import { CreatePremissionDto } from './create-premission.dto';

export class UpdatePremissionDto extends PartialType(CreatePremissionDto) {}
