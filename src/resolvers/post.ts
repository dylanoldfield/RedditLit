import {Arg, Ctx, Int, Query, Resolver, Mutation} from "type-graphql"
import { Post } from "../entities/Post"
import { MyContext } from "src/types"

@Resolver()
export class PostResolver {
  @Query(() => Post, {nullable : true}) // this type here is for the graphql type
  posts(
    @Arg('id', () => Int) id: number, // this is used to define arguments for query (name in Schema, type)
    @Ctx() {em} : MyContext): Promise<Post | null>{ // this type is for the typescript type
    return em.findOne(Post,{ id }) // query the mikroOrm entity manager
  }

  // creates a new post
  @Mutation(() => Post) // this type here is for the graphql type
  async createPost(
    @Arg('title', () => String) title: string, 
    @Ctx() {em} : MyContext): Promise<Post>{ 
      const post = await  em.create(Post, {title})
      await em.persistAndFlush(post)
      return post;
  }

  // modified existing post
  @Mutation(() => Post, {nullable: true}) // this type here is for the graphql type
  async updatePost(
    @Arg('id', () => Int) id : number, //  note typegraphql type is inferred 
    @Arg('title', () => String) title: string, 
    @Ctx() {em} : MyContext): Promise<Post |null>{ 
      let post = await em.findOne(Post, { id })
      if(! post){
        return null;
      }
      if( typeof title != 'undefined')
      {
        post.title = title;
        await em.persistAndFlush(post)
      }
      return post;
  }

  // delete post
  @Mutation(() => Boolean) // this type here is for the graphql type
  async deletePost(
    @Arg('id', () => Int) id : number, //  note typegraphql type is inferred 
    @Ctx() {em} : MyContext): Promise<Boolean>{ 
     try{
      await em.nativeDelete(Post, {id});
     } catch{
       return false;
     }
      return true;
  }

}