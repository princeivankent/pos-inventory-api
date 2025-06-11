import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

type AuthInput = { username: string; password: string; };
type SignInData = { id: string; username: string; };
type AuthResult = { accessToken: string; id: string; username: string; };

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: 'dummy-access-token', // In a real application, generate a JWT or similar token
      id: user.id,
      username: user.username,
    };
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findUserByUsername(input.username);

    if (user && user.password === input.password) {
      return { id: user.id, username: user.username };
    }

    return null;
  }
}
