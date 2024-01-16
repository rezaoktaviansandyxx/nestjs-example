import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService, 
        private jwtService: JwtService){}

    async login(dto: AuthDto){
        const user = await this.userService.findByEmail(dto.email);
        if (user && (await compare(dto.password, user.password))) {
            const payload = {sub: user.id, username: user.email};
            const {password, ...result} = user
            return {
                ...result,
                access_token: await this.jwtService.signAsync(payload, {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '60s'
                })
            }
        }

        throw new UnauthorizedException();
    }
}
