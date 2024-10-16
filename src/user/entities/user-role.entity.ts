import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique } from "typeorm";
import { User } from "../../user/entities/user.entity";
import { Role } from "../../role/entities/role.entity";

@Unique('user-role-unique', ['user', 'role'])
@Entity()
export class UserRole {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user)
    user: User;

    @ManyToOne(() => Role, role => role)
    role: Role;
}