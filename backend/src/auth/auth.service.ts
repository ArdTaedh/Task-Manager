import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthUserSchemaTypes } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private UserService: UserService,
        private JwtService: JwtService,
    ) {}

    async signIn(userDto: AuthUserSchemaTypes) {
        const user = await this.validateUser(userDto);

        const payload = {
            email: user.email,
            sub: {
                id: user.id,
            },
        };

        const accessToken = await this.JwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: process.env.ACCESS_SECRET,
        });

        const refreshToken = await this.JwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: process.env.REFRESH_SECRET,
        });

        return {
            user,
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }

    async validateUser(userDto: AuthUserSchemaTypes) {
        const user = await this.UserService.findByEmail(userDto.email);

        if (!user) {
            throw new BadRequestException(
                'User email or password are incorect',
            );
        }

        const compare = await verify(user.password, userDto.password);
        if (!compare) {
            throw new BadRequestException(
                'User email or password are incorect',
            );
        }

        // eslint-disable-next-line
        const { password, ...rest } = user;

        return rest;
    }

    async refreshToken(user: any) {
        const payload = {
            email: user.email,
            sub: user.sub,
        };

        const accessToken = await this.JwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: process.env.ACCESS_SECRET,
        });

        const refreshToken = await this.JwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: process.env.REFRESH_SECRET,
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}
