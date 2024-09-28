import { POST_REPOSITORY } from 'src/core/constants';
import { PostModel } from 'src/models/PostsModel/post.model';

export const postProviders = [
  {
    provide: POST_REPOSITORY,
    useValue: PostModel,
  },
];
