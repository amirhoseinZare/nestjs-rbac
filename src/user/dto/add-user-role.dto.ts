import { ApiProperty } from "@nestjs/swagger";

export class AddUserRoleDto {
    @ApiProperty()
    userId: number;

    @ApiProperty()
    roleId: number;
}
