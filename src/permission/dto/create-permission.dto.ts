import { ApiProperty } from "@nestjs/swagger";

export class CreatePermissionDto {
    @ApiProperty()
    name: string;
}
