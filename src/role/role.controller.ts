import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { AddRolePermissionDto } from './dto/add-role-permission.dto';
import { AddRolePermissionsDto } from './dto/add-role-permissions-bulk.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }

  @Put('add-permission')
  addPermission(@Body() addRolePermissionDto: AddRolePermissionDto) {
    const { roleId, permissionId } = addRolePermissionDto
    return this.roleService.addPermission(roleId, permissionId)
  }

  @Get('permissions/:roleId')
  getPermissions(@Param('roleId') roleId: number) {
    return this.roleService.getPermissions(roleId)
  }

  @Put('add-permissions-bulk')
  async addPermissions(@Body() addRolePermissionsDto: AddRolePermissionsDto) {
    const { roleId, permissionIds } = addRolePermissionsDto;
    await this.roleService.addPermissionsBulk(roleId, permissionIds);
    return { message: 'Permissions added successfully' };
  }
}
