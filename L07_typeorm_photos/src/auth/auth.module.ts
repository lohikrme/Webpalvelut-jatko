import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './dto/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// rememeber also JWT needs the secret key, so here we use
// JwtModule.register to create a secret key, and token exp time 3000s
@Module({
  imports:[
    UsersModule, 
    PassportModule, 
    JwtModule.register({
      secret: "Ayoolo Wololoo Smurfs rule humans drool",
      signOptions: {
        expiresIn: "3000s"
      }
    })],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
