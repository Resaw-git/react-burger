import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.findById(userId);
    return this.toResponse(user);
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    const user = await this.findById(userId);
    if (dto.name !== undefined) user.name = dto.name;
    if (dto.email !== undefined) user.email = dto.email.toLowerCase();
    await this.usersRepository.save(user);
    return this.toResponse(user);
  }

  private async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  private toResponse(user: User) {
    return {
      success: true,
      user: { email: user.email, name: user.name },
    };
  }
}
