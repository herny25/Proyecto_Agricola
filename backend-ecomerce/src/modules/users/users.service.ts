import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async updateProfile(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    user.password = await bcrypt.hash(user.password, 10);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    Object.assign(user, updateData);
    return this.usersRepository.save(user);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    return this.usersRepository.save(user);
  }

  async authenticate(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  async getMe(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async findOne(id: string | number): Promise<User> {
    // Asegúrate de convertir el id a un número
    const userId = typeof id === 'string' ? Number(id) : id;

    if (isNaN(userId)) {
      throw new BadRequestException('ID inválido');
    }

    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    return user;
  }

  generateToken(user: User): string {
    const payload = { id: user.id, username: user.username, rol: user.rol };
    return this.jwtService.sign(payload);
  }

  // Método para generar un token y guardarlo en la base de datos
  async createPasswordResetToken(email: string): Promise<string | null> {
    const user = await this.usersRepository.findOneBy({ email });
    if (!user) return null;

    const token = randomBytes(32).toString('hex');
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1); // Token válido por 1 hora

    user.resetToken = token;
    user.resetTokenExpires = expiration;
    await this.usersRepository.save(user);

    return token;
  }

  // Método para enviar el correo electrónico de restablecimiento
  async sendResetPasswordEmail(email: string, token: string) {
    const resetUrl = `http://localhost:4200/reset-password?token=${token}`;
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_GOOGLE,
        pass: process.env.PASSWORD_GOOGLE,
      },
    });

    await transporter.sendMail({
      from: '"Campo Conectado" hlopezmolina7@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>Haz click en el siguiente enlace para cambiar tu contraseña:</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });
  }

  // Método para restablecer la contraseña
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    console.log('Token recibido:', token);
    console.log('Cuerpo recibido:', newPassword);

    const user = await this.usersRepository.findOne({
      where: { resetToken: token },
    });

    if (!user || user.resetTokenExpires < new Date()) return false;

    // Verificar si la nueva contraseña es diferente de la contraseña actual
    const isCurrentPasswordValid = await bcrypt.compare(
      newPassword,
      user.password,
    );
    if (isCurrentPasswordValid) {
      throw new BadRequestException(
        'La nueva contraseña no puede ser la misma que la actual',
      );
    }

    // Si la contraseña no coincide, entonces actualizamos
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpires = null;
    await this.usersRepository.save(user);

    return true;
  }
}
