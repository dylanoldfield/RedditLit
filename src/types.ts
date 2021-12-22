import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"

// allows you to pass in specific types for context objects into resolvers
export type MyContext = { 
  em: EntityManager<IDatabaseDriver<Connection>>
}