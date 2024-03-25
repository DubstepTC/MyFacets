import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../entities/user/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
      ) {}

      async signIn(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.userId, username: user.username };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
//попытка регистрации
    async createUser(
      email: string,
      password: string
    ) {
      const lowerCaseEmail = email.toLowerCase();
      const hashedPassword = await bcrypt.hash(
        password, 10
      );
    //  const user = this.prisma.mutation.createUser(
    //    {
    //      data: {
    //        email: lowerCaseEmail,
    //        password: hashedPassword
    //      }
    //    }
    //  );
}}

