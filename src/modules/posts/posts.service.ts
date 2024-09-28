import { Inject, Injectable } from '@nestjs/common';
import { POST_REPOSITORY } from 'src/core/constants';
import { PostModel } from 'src/models/PostsModel/post.model';
import { PostDto } from './dto/post.dto';
import { UserModel } from 'src/models/UsersModel/user.model';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: typeof PostModel,
  ) {}

  async create(post: PostDto, userId: any) {
    return await this.postRepository.create({ ...post, userId });
  }

  async findAll() {
    return await this.postRepository.findAll({
      // post er related user get korbe and password ke anbe na
      include: [
        {
          model: UserModel,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({
      where: { id },
      include: [
        {
          model: UserModel,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });
  }

  async delete(id: number, userId: any) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id: number, data: any, userId: any) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );
    return { numberOfAffectedRows, updatedPost };
  }
}
