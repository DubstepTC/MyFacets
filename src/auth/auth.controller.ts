import { Body, Controller, ForbiddenException, Get, Post, Req, Res, Put, Delete, Param} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupParamsDto } from './dto/signup/signup.dto';
import { Response } from 'express';
import AuthControllerInterface from './interface/authController.interface';
import { AuthControllerDto } from './dto/authController.dto';
import { SigninParamsDto } from './dto/signin/signIn.dto';
import { ItemProfileDto } from './dto/profile/profile.dto';
import { PasswordLessParamsDto } from './dto/passwordless/passwordless';

@Controller({
  path: 'auth',
  version: '1'
})
export class AuthController implements AuthControllerInterface {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupParamsDto, @Res() res: Response): Promise<Response<AuthControllerDto>> {
    const result = await this.authService.signup(dto);
    return res.status(200).send({
      message: 'User created succefully',
      data: result
    });
  }

  @Post('signin')
  async signin(@Res() res: Response, @Body() dto: SigninParamsDto): Promise<Response<AuthControllerDto>> {
    const result = await this.authService.signin(dto);
   
    const token = await this.authService.signToken({
      userId: result.id,
      email: result.email,
    });

    if (!token) throw new ForbiddenException('Could not signin');

    res.cookie('token', token, {});
    return res.status(200).send({
      message: 'Logged in succefully',
      data: result
    })
  }

  @Get('signout')
  async signout(@Res() res: Response): Promise<Response>{
    res.clearCookie('token');
    return res.status(200).send({ message: 'Logged out succefully' });
  }

  @Post('passwordLess')
  async passwordLess(@Body() dto: PasswordLessParamsDto, @Res() res: Response): Promise<Response<AuthControllerDto>> {
    const token = await this.authService.passwordLess(dto);

    return res.json({
      success: true,
      message: "На вашей почте скоро появится письмо для сброса пароля",
      token,
    });
  }

  @Put('profile/:id')
  async updateProfile(@Param('id') id: number, @Body() dto: ItemProfileDto, @Res() res: Response): Promise<Response<AuthControllerDto>> {
    try {
      const updatedProfile = await this.authService.updateProfile(id, dto);
      return res.status(200).send({
        message: 'Profile updated successfully',
        data: updatedProfile,
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Failed to update profile',
        error: error.message,
      });
    }
  }

  @Delete('profile/:id') 
  async cancelProfileChanges(@Param('id') id: number, @Res() res: Response): Promise<Response<AuthControllerDto>> {
    try {
      const userProfile = await this.authService.cancelProfileChanges(id);
      return res.status(200).send({
        message: 'Profile changes cancelled',
        data: userProfile,
      });
    } catch (error) {
      return res.status(400).send({
        message: 'Failed to cancel profile changes',
        error: error.message,
      });
    }
  }
}
