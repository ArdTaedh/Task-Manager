import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [UserService, UserService, PrismaService, JwtService],
    controllers: [UserController],
    imports: [],
})
export class UserModule {}
