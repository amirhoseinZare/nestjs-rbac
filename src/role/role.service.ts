import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { PermissionService } from 'src/permission/permission.service';
import { RolePermission } from './entities/role-permission.entity';
import { Permission } from 'src/permission/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RolePermission) private readonly rolePermissionRepository: Repository<RolePermission>,
    private readonly permissionService: PermissionService
  ) {

  }

  private async findOneByIdOrException(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } })
    if (!role) throw new BadRequestException(`role with id #${id} not found`)

    return role
  }

  private async findRolePermissionOrException(roleId: number, permissionId: number): Promise<{ role: Role, permission: Permission, rolePermission: null | RolePermission }> {
    const role = await this.findOne(roleId)
    const permission = await this.permissionService.findOne(permissionId)

    const rolePermission = await this.rolePermissionRepository.findOne({
      where: {
        role: { id: role.id },
        permission: { id: permission.id }
      }
    })

    return {
      role,
      permission,
      rolePermission
    }
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name } = createRoleDto
    const exists = (await this.roleRepository.count({ where: { name } })) > 0
    if (exists) throw new BadRequestException('permission with this name already exists')

    const newRole = this.roleRepository.create(createRoleDto)
    return await this.roleRepository.save(newRole);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  async findOne(id: number) {
    return this.findOneByIdOrException(id)
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOneByIdOrException(id)

    Object.assign(role, updateRoleDto)

    return this.roleRepository.save(role)
  }

  async remove(id: number): Promise<Role> {
    const role = await this.findOneByIdOrException(id)

    return this.roleRepository.remove(role)
  }

  async addPermission(roleId: number, permissionId: number) {
    const { role, permission, rolePermission } = await this.findRolePermissionOrException(roleId, permissionId)
    if (rolePermission) throw new BadRequestException('rolePermission already exists')

    const newRolePermission = this.rolePermissionRepository.create({
      role,
      permission
    })

    return this.rolePermissionRepository.save(newRolePermission)
  }

  async getPermissions(roleId: number) {
    const role = await this.findOneByIdOrException(roleId)
    return this.rolePermissionRepository.find({ where: { role: { id: role.id } }, relations: ['permission'] })
  }

}
