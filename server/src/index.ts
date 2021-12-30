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
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';


const startServer = async () => {
  // console.log(`dirname:${__dirname}`);

  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up(); // automatically run the migration
  
  const app = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

    // apply apollo middleware
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
      resolvers:[HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({req, res}) => ({em: orm.em, req, res}), // context returns an object passed to every resolver through context object
  });

    //options for cors midddleware
  const options: cors.CorsOptions = {
    origin: ['https://studio.apollographql.com','http://127.0.0.1:3000','http://localhost:3000'],
    credentials: true,
  };
  
  // apply redis middleware first 
  app.use(
    session({
      name: "dylancookie",
      store: new RedisStore({ 
        client: redisClient,
        disableTTL: true, //TTL is used to extend session on interaction, or dies after timer expires
        disableTouch: true //Stops continuous calls to redis to keep session awake.
      }),
      cookie:{
        maxAge: 1000 * 3600 * 24 * 365, // keeps cookie alive for 1 year
        httpOnly: true, // prevent front end access to cookie
        secure: __prod__ ,//only works in https, but in dev we are using http. 
        sameSite:'lax', // relates to cross-site protection https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-03#section-8.8.2
      },
      saveUninitialized: false, // stop storing a session without any data
      secret: 'somethingrandomfornow234203940', //TODO: need to change this to env
      resave: false,
    })
  )

  app.use(cors(options));
  // app.options('*', cors<express.Request>(options));


  // start server and apply rest of middleware & attach apollo  
  await  apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on port 4000")
  });




  // const post =  orm.em.create(Post, {title: "Hello"}); //creates a 'Post' entity
  // orm.em.persistAndFlush(post); // flushes the Post entity to the database
  // const posts = await orm.em.find(Post,{}); //Find all entities of type Post
  // console.log(posts);

  console.log('hello dylan');
  }; 

  startServer().catch((err) => {
    console.log(err);
  })