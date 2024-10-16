import { ApiProperty } from "@nestjs/swagger";

export class AddRolePermissionDto {
    @ApiProperty()
    roleId: number;

    @ApiProperty()
    permissionId: number;
}
