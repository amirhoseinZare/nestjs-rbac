import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";
import { Role } from "../../role/entities/role.entity";
import { Permission } from "../../permission/entities/permission.entity";

@Unique('role-permission-unique', ['role', 'permission'])
@Entity()
export class RolePermission {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, role => role)
    role: Role;

    @ManyToOne(() => Permission, permission => permission)
    permission: Permission;
}