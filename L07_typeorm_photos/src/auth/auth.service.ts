import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtAccessToken } from './dto_and_strategies/jwt-access-token.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    // verify a callback which name is validateUser to use the passport lib
    // passport wants either full user (success) or null (fail)
    async validateUser(email: string, password: string): Promise<User> {
        console.log("AuthService's validateUser() has started!")
        console.log("email: ", email, "password: ", password)
        const user = await this.usersService.findUserByEmail(email)
        console.log(JSON.stringify(user))
        if (!user) return null;
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (isPasswordValid) {
            console.log(`validateUser: OK ${JSON.stringify(user)}`)
            // to not leak password, empty password before return user
            user.password = "";
            return user;
        }
        return null;
    }

    async login(user: User): Promise<JwtAccessToken> {
        const payload = {
            email: user.email,
            sub: user.id
        }
        return { accessToken: this.jwtService.sign(payload)};
    }
}
