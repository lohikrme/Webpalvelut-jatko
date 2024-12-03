import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Photo } from './entities/photo.entity';
import { UsersModule } from 'src/users/users.module';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Category]), UsersModule],
  controllers: [PhotosController],
  providers: [PhotosService]
})
export class PhotosModule {}
