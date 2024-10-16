import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService
  ) { }

  private async findOneByIdOrException(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new BadRequestException(`User with id #${id} not found`);
    return user;
  }

  private async findUserRoleOrException(userId: number, roleId: number): Promise<{ user: User, role: Role, userRole: null | UserRole }> {
    const user = await this.findOne(userId)
    const role = await this.roleService.findOne(roleId)

    const userRole = await this.userRoleRepository.findOne({
      where: {
        user: { id: user.id },
        role: { id: role.id }
      }
    })

    return {
      user,
      role,
      userRole
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name } = createUserDto;
    const exists = (await this.userRepository.count({ where: { name } })) > 0;
    if (exists) throw new BadRequestException('User with this name already exists');

    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.findOneByIdOrException(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOneByIdOrException(id);
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOneByIdOrException(id);
    return this.userRepository.remove(user);
  }

  async addRole(userId: number, roleId: number) {
    const { user, role, userRole } = await this.findUserRoleOrException(userId, roleId)
    if (userRole) throw new BadRequestException('userRole already exists')

    const newUserRole = this.userRoleRepository.create({
      role,
      user
    })

    return this.userRoleRepository.save(newUserRole)
  }

  async getRoles(userId: number) {
    const user = await this.findOneByIdOrException(userId)
    const roles = await this.userRoleRepository.find({
      where: { user: { id: user.id } }, relations: ['role', 'role.permissions', 'role.permissions.permission']
    })

    return roles.map(({ role: { name, id, permissions } }) => {
      const permissionList = permissions.map(({ permission: { name, id } }) => ({ name, id }))

      return {
        role: { id, name },
        permissions: permissionList
      }
    })
  }
}