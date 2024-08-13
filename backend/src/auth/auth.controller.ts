import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/pipes/zod.validation';
import { authUserSchema, AuthUserSchemaTypes } from 'src/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Post('sign-up')
    @UsePipes(new ZodValidationPipe(authUserSchema))
    async SignUp(@Body() user: AuthUserSchemaTypes) {
        return await this.userService.create(user);
    }

    @Post('sign-in')
    @UsePipes(new ZodValidationPipe(authUserSchema))
    async SignIn(@Body() user: AuthUserSchemaTypes) {
        return await this.authService.signIn(user);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Req() req) {
        return await this.authService.refreshToken(req);
    }
}
