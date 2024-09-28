import { USER_REPOSITORY } from 'src/core/constants';
import { UserModel } from 'src/models/UsersModel/user.model';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: UserModel,
  },
];
