import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string; rol: string }> {
    console.log(createUserDto);
    const user = await this.usersService.create(createUserDto);
    const token = this.usersService.generateToken(user);
    return { token, rol: user.rol };
  }

  @Post('login')
  async login(
    @Body() authenticateUserDto: AuthenticateUserDto,
  ): Promise<{ token: string; rol: string }> {
    console.log(authenticateUserDto);
    const user = await this.usersService.authenticate(
      authenticateUserDto.email,
      authenticateUserDto.password,
    );
    console.log(user);
    const token = this.usersService.generateToken(user);
    return { token, rol: user.rol };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req): Promise<User> {
    return this.usersService.getMe(req.user.id);
  }

  @Put('update-profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() req,
    @Body() updateUserDto: UpdateProfileDto,
  ): Promise<User> {
    const userId = req.user.id;
    return this.usersService.updateProfile(userId, updateUserDto);
  }

  // Endpoint para solicitar un enlace de restablecimiento
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    const { email } = forgotPasswordDto;
    const token = await this.usersService.createPasswordResetToken(email);
    if (!token) {
      throw new BadRequestException('Invalid email');
    }

    await this.usersService.sendResetPasswordEmail(email, token);
    return { message: 'Password reset email sent' };
  }

  // Endpoint para restablecer la contraseña
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const { token, newPassword } = resetPasswordDto;

    if (!token || !newPassword) {
      throw new BadRequestException('Token o nueva contraseña faltante');
    }

    const isPasswordReset = await this.usersService.resetPassword(
      token,
      newPassword,
    );
    if (!isPasswordReset) {
      throw new BadRequestException('Token inválido o expirado');
    }

    return { message: 'Contraseña cambiada exitosamente' };
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const userId = Number(id); // Convertir el string a number
    if (isNaN(userId)) {
      throw new BadRequestException('ID inválido');
    }
    return this.usersService.findOne(userId);
  }
}
