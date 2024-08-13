import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthUserSchemaTypes } from 'src/schemas/user.schema';
import { hash } from 'argon2';

@Injectable()
export class UserService {
    constructor(private db: PrismaService) {}

    async create(user: AuthUserSchemaTypes) {
        const userIsExists = await this.db.user.findUnique({
            where: {
                email: user.email,
            },
        });

        if (userIsExists) {
            throw new ConflictException('Email is already exists');
        }

        const newUser = await this.db.user.create({
            data: {
                email: user.email,
                password: await hash(user.password),
            },
        });

        // eslint-disable-next-line
        const { password, ...rest } = newUser;

        return rest;
    }

    async findByEmail(email: string) {
        return await this.db.user.findUnique({
            where: {
                email: email,
            },
        });
    }

    async findById(id: number) {
        const user = await this.db.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true,
                username: true,
            },
        });

        if (user === null) {
            return {
                error: 'No user found',
            };
        }

        return user;
    }
}
