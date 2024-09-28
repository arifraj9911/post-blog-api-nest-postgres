import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne(id);

    if (!post) {
      throw new NotFoundException("This post doesn't exists");
    }

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() post: PostDto, @Request() req: any) {
    return await this.postService.create(post, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: PostDto,
    @Request() req: any,
  ) {
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const deleted = await this.postService.delete(id, req.user.id);

    if (deleted === 0) {
      throw new NotFoundException('post not found');
    }

    return 'Successfully deleted';
  }
}
