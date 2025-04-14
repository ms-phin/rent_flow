import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // Register User
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = signUpDto;
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Duplicate Email entered.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = this.userRepository.create({
        name,
        email,
        password: hashedPassword,
        role: 'user',
      });
      await this.userRepository.save(user);
      const token = this.assignJwtToken(Number(user.id));
      return { token };
    } catch (error) {
      throw new ConflictException('Error creating user');
    }
  }

  // Login user
  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email address or password.');
    }
    // Check if password is correct or not
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email address or password.');
    }
    const token = this.assignJwtToken(Number(user.id));
    return { token };
  }

  // Helper method to assign JWT token
  assignJwtToken(userId: number): string {
    const payload = { id: userId };
    return this.jwtService.sign(payload, {
      expiresIn: '1h', // Explicitly set to 1 hour
    });
  }
}
