import { ApiProperty } from '@nestjs/swagger';

export class AddRolePermissionsDto {
    @ApiProperty()
    roleId: number;

    @ApiProperty({ isArray: true })
    permissionIds: number[];
}