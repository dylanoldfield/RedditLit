import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import {Request, Response} from 'express'
import {Session} from 'express-session'


// when using express-session fields need to be added via declaration merging
// https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata
export type SessionUser = Session & { userId: number | {}}

// allows you to pass in specific types for context objects into resolvers
export type MyContext = { 
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request & {
    session?: SessionUser;
  };
  res: Response;
};
