import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ConfigModule.forRoot(), UserModule, AuthModule],
    controllers: [AppController],
    providers: [
        AppService,
        AuthService,
        PrismaService,
        UserService,
        JwtService,
    ],
})
export class AppModule {}
