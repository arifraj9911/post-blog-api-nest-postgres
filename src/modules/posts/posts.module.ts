import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { postProviders } from './posts.provider';

@Module({
  controllers: [PostsController],
  providers: [PostsService, ...postProviders],
})
export class PostsModule {}
