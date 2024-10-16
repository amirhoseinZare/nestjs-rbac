import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(@InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>) {

  }

  private async findOneByIdOrException(id: number) {
    const permission = await this.permissionRepository.findOne({ where: { id } })
    if (!permission) throw new BadRequestException(`permission with id #${id} not found`)

    return permission
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const { name } = createPermissionDto
    const exists = (await this.permissionRepository.count({ where: { name } })) > 0
    if (exists) throw new BadRequestException('permission with this name already exists')

    const newPermission = this.permissionRepository.create(createPermissionDto)
    return this.permissionRepository.save(newPermission)
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find()
  }

  async findOne(id: number): Promise<Permission> {
    return this.findOneByIdOrException(id)
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const premission = await this.findOneByIdOrException(id)

    Object.assign(premission, updatePermissionDto)

    return this.permissionRepository.save(premission)
  }

  async remove(id: number): Promise<Permission> {
    const premission = await this.findOneByIdOrException(id)

    return this.permissionRepository.remove(premission)
  }
}
