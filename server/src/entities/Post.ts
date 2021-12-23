import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field } from "type-graphql";

@ObjectType() // This decorator allows you to convert this call into a GraphQL Type object
@Entity()
export class Post {

  @Field() // exposes this field to graphql schema
  @PrimaryKey () // MikroOrm / PG private key
  id: number;

  @Field(() => String)
  @Property({type: "date"})
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field() // if you comment a Field out, it will not expose it to graphql
  @Property({type:"text"})
  title!: string;

}