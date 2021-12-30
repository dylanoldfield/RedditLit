import {Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver} from "type-graphql"
import { MyContext } from "../types"
import argon2 from "argon2"
import { User } from "../entities/User";

@InputType()
class UsernamePasswordInput{
  @Field()
  username: string;

  @Field()
  password:string;
}

@ObjectType()
class FieldError {
  @Field() 
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field(() => User, {nullable:true})
  user?: User
}


@Resolver()
export class UserResolver {
  
  // register a new User
  @Mutation (() => UserResponse)
  async register(
    @Arg("userDetails") details: UsernamePasswordInput,
    @Ctx() { req ,em } : MyContext
  ): Promise<UserResponse>{
    // check if username is too short 
    if(details.username.length <= 2){
      return{
        errors: [
          {
            field:"username",
            message: "your username is too short"
          }
        ]
      }
    }

    // check if password is too short 
        if(details.password.length <= 3){
          return{
            errors: [
              {
                field:"password",
                message: "your password is too short"
              }
            ]
          }
        }

    const hashedPassword = await argon2.hash(details.password);
    const user = em.create(User, {username:details.username, password:hashedPassword});
    try{
      await em.persistAndFlush(user);
    }catch(err){
        return{
          errors:[
            {
              field: "username",
              message: err.message.includes("user_username_unique") ? "this username already exists" : "oops something went wrong"
            }
          ]
        }
    }
    
    // set cookie after they have registered
    // this will log them in and keep them logged in. 
    
    req.session.userId = user.id
    return {user};
  };

  @Query(() => User, { nullable: true})
  async getUser(
    @Arg("username") username: string,
    @Ctx() { em } : MyContext
  ){
      if(typeof username !== 'undefined'){
        const user = await em.findOne(User, {username: username})
        return user;
      }

      return null;
  }


  @Query(() => [User], {nullable:true})
  async getUsers(
    @Ctx() { em } : MyContext
  ){
      const users = await em.find(User, {} )

      return users;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("userDetails") details : UsernamePasswordInput,
    @Ctx(){em, req}:MyContext
  ): Promise<UserResponse> {

    const user = await em.findOne(User, {username: details.username})
    if(!user){
     return {
      errors: [
        {
          field: 'username',
          message: "that username doesn't exist"
        }
      ]
     } 
    }

    const valid = await argon2.verify(user.password, details.password);
    if(!valid){
      return {
       errors: [
         {
           field: 'password',
           message: "this password is not valid"
         }
       ]
      } 
     }

     console.log("session id: " ,req.session.id)
     console.log("user id: ",req.session.userId);
    req.session.userId = user.id
    console.log("user id 2: ", req.session.userId);
   return {user};  
  }

  @Query(()=> User, {nullable:true})
  async me(
    @Ctx() { em, req }: MyContext
  )
    {
      // you are not logged in. 
      if(!req.session.userId){
        return null;
      }

      const user = await em.findOne(User, {id: req.session.userId})

      return user;
    }


}