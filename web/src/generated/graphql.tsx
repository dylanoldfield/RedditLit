import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  deletePost: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  updatePost?: Maybe<Post>;
};


export type MutationCreatePostArgs = {
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  userDetails: UsernamePasswordInput;
};


export type MutationRegisterArgs = {
  userDetails: UsernamePasswordInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  getUsers?: Maybe<Array<User>>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  posts?: Maybe<Post>;
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryPostsArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  userDetails: UsernamePasswordInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'User', username: string } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type RegisterMutationVariables = Exact<{
  registerUserDetails: UsernamePasswordInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'User', username: string, id: number } | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };


export const LoginDocument = gql`
    mutation Login($userDetails: UsernamePasswordInput!) {
  login(userDetails: $userDetails) {
    user {
      username
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($registerUserDetails: UsernamePasswordInput!) {
  register(userDetails: $registerUserDetails) {
    user {
      username
      id
    }
    errors {
      field
      message
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};