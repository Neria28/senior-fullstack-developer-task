import { Controller, Param, Post, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post('/login/:username')
  async login(
    @Param('username') username: string,
    @Req() request: RequestWithUser,
  ): Promise<User> {
    return request.user;
  }
}
