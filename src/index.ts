import {MikroORM} from "@mikro-orm/core";
import { __prod__ } from "./constants";
import mikroOrmConfig from "./mikro-orm.config";
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import 'reflect-metadata';
import { UserResolver } from "./resolvers/user";

const main = async () => {
  console.log(`dirname:${__dirname}`);

  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up(); // automatically run the migration
  
  const app = express();
  const apolloServer = new ApolloServer({
      schema: await buildSchema({
      resolvers:[HelloResolver, PostResolver, UserResolver],
      validate: false
    }),
    context: () => ({em: orm.em}) // context returns an object passed to every resolver through context object
  });

  await  apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started on port 4000")
  });




  // const post =  orm.em.create(Post, {title: "Hello"}); //creates a 'Post' entity
  // orm.em.persistAndFlush(post); // flushes the Post entity to the database
  // const posts = await orm.em.find(Post,{}); //Find all entities of type Post
  // console.log(posts);

  console.log('hello dylan');
  };

  main().catch((err) => {
    console.log(err);
  })