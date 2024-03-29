import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemAuthDto } from './dto/items/itemAuth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import AuthServiceInterface from './interface/authService.interface';
import { SignupParamsDto } from './dto/signup/signup.dto';
import { SigninParamsDto } from './dto/signing/signing';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(dto: SignupParamsDto): Promise<ItemAuthDto> {
    const { email, first_name, middle_name, last_name, password } = dto;
    try {
      const userExists = await this.prisma.user.findUnique({
        where: { email },
      });

      if (userExists) throw new BadRequestException('Email already exists');

      const hashedPassword = await this.hashPassword(password);

      const result = await this.prisma.user.create({
        data: {
          email: email,
          first_name: first_name,
          middle_name: middle_name,
          last_name: last_name,
          password: hashedPassword,
        },
      });

      if (!result) throw new BadRequestException();
      return result;
    } catch (err) {
      throw new BadRequestException(err.response);
    }
  }

  async signin(dto: SigninParamsDto) {
    const { email, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!foundUser) throw new BadRequestException('Wrong credentials (email)');

    const compareSuccess = await this.comparePasswords({
      password,
      hash: foundUser.password,
    });

    if (!compareSuccess)
      throw new BadRequestException('Wrong credentials (password)');

    return foundUser;
  }

  async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: {
    hash: string;
    password: string;
  }): Promise<string> {
    const booleanToSting: boolean = await bcrypt.compare(
      args.password,
      args.hash,
    );
    return booleanToSting.toString();
  }

  async signToken(args: { userId: string; email: string }): Promise<string> {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload);

    return token;
  }
}
