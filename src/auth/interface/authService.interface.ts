import { SignupParamsDto } from 'src/auth/dto/signup/signup.dto';
import { SigninParamsDto } from 'src/auth/dto/signin/signIn.dto';
import { ItemAuthDto } from 'src/auth/dto/items/itemAuth.dto';
import { ItemProfileDto } from '../dto/profile/profile.dto';

export default interface AuthServiceInterface {
  signup(dto: SignupParamsDto): Promise<ItemAuthDto>;
  signin(dto: SigninParamsDto): Promise<ItemAuthDto>;
  hashPassword(password: string): Promise<string>;
  comparePasswords(args: { hash: string; password: string }): Promise<string>;
  signToken(args: { userId: number; email: string }): Promise<string>;
  updateProfile(id: number, profileData: ItemProfileDto, imageUrl: Express.Multer.File): Promise<any>
  cancelProfileChanges(id: number): Promise<any>;
}
