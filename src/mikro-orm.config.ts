import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core"
import path from "path";
import { User } from "./entities/User";


export default {
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: path.join(__dirname,'./migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files --> pulled from https://mikro-orm.io/docs/migrations/ added js support [tj] 
  },
  entities: [Post, User],
  dbName: "redditlit",
  type: "postgresql",
  debug: !__prod__,
} as Parameters <typeof MikroORM.init>[0]; // need to add this type here to allow for types to be passed from object properly

