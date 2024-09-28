/* eslint-disable @typescript-eslint/no-unused-vars */

import { Sequelize } from 'sequelize-typescript';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';
import { UserModel } from 'src/models/UsersModel/user.model';
import { PostModel } from 'src/models/PostsModel/post.model';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.test;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([UserModel, PostModel]);
      await sequelize.sync();

      //   check database connection
      sequelize
        .authenticate()
        .then(() => {
          const loggingdata = {
            HOST: config.host,
            PORT: config.port,
          };
          console.log(loggingdata);
          console.log(`${config.database} DB CONNECTED!`);
        })
        .catch((err) => {
          const loggingdata = {
            HOST: config.host,
            PORT: config.port,
          };
          console.log(loggingdata);
          console.log(`${config.database} DB Connection Error !!`);
          console.log(err);
        });
    },
  },
];
