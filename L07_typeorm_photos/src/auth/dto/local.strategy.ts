import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password'
        });
    }
    async validate(email: string, password: string): Promise<User> {
        console.log("Local Strategy's validate method has started!")
        const user = await this.authService.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        return user;
    }
}