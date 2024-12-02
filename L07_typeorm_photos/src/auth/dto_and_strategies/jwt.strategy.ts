import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService,
        private readonly usersService: UsersService
    ){
        super({
            // should maybe be jwtFromrequest?
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // use expiration false for development
            ignoreExpiration: false,
            secretOrKey: "Ayoolo Wololoo Smurfs rule humans drool"

        });
    }

    async validate(payload: any): Promise<User> {
        console.log("Jwt Strategy's validate starts!");
        console.log("id: ", payload.id, "  email: ", payload.email);
        // id should be faster and more stable than email to find users
        const user = await this.usersService.findUserById(payload.sub);
        // to not leak password
        user.password = "";
        return user;
    }
}