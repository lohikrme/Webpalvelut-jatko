import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from 'src/profiles/profiles.module';
import { Profile } from 'src/profiles/entities/profile.entity';


// export the service to import the module in another file...
// not sure why
@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), ProfilesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
