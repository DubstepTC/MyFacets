import { BadRequestException, Injectable } from '@nestjs/common';
import { ItemAuthDto } from './dto/items/itemAuth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import AuthServiceInterface from './interface/authService.interface';
import { SignupParamsDto } from './dto/signup/signup.dto';
import { SigninParamsDto } from './dto/signin/signIn.dto';
import { PrismaService } from 'nestjs-prisma';
import { MailService } from './mail/mail.service'
import { PasswordLessParamsDto } from './dto/passwordless/passwordless';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService implements AuthServiceInterface {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailService: MailService,
  ) { }

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

    try {
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
    } catch (err) {
      throw new BadRequestException(err.response);
    }
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

  async signToken(args: { userId: number; email: string }): Promise<string> {
    const payload = {
      id: args.userId,
      email: args.email,
    };

    const token = await this.jwt.signAsync(payload);

    return token;
  }

  async passwordLess(dto: PasswordLessParamsDto): Promise<string> {
    const { email } = dto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException('User not found');

    const token = randomBytes(32).toString('hex');

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordLessToken: token,
        passwordLessTokenExpiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // token expires in 24 hours
      },
    });

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${user.email}`;

    const mailOptions = {
      to: user.email,
      from: 'myfacets@mail.ru',
      subject: 'Reset password',
      text: `Please click the link below to reset your password:\n\n${resetPasswordUrl}`,
    };

    await this.mailService.sendEmail(mailOptions);

    return token;
  }
}
