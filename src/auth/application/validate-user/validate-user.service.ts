import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '@users/infrastructure/adapters/secondary/typeorm/dao/user.dao.entity';
import { FindByEmailService } from '@users/application/find-by-email/find-by-email.service';
import { compare } from 'bcrypt';

@Injectable()
export class ValidateUserService {
  constructor(private findByEmailService: FindByEmailService) {}

  async validate(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmailService.find(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
