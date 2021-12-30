import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react'
import { useState} from 'react'
import { Wrapper } from '../components/Wrapper';
import {useMutation} from 'urql';
import {useRegisterMutation} from '../generated/graphql'

interface registerProps {

}

interface field{
  value: string;
  error: boolean;
}

interface formFields {
    name: field;
    password:field;
}

export const Register: React.FC<registerProps> = ({}) => {
    const [form, setForm] = useState<formFields>({
      name: {value: '', error: false},
      password: {value: '', error: false}
    });

    const [,register] = useRegisterMutation();

    return (
      <form onSubmit={ async (e)=>{
        e.preventDefault()
        console.log(form)
        const response = await register({registerUserDetails: {username: form.name.value, password: form.password.value}})
        console.log(response)
        return response;
        }}> 
        <Wrapper variant="small">
        <FormControl >
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            id='name'
            type='text'
            value={form.name.value}
            onChange={
              (e) => { setForm({...form, name: {...form.name, value: e.target.value}})}
            }
          />
          {!form.name.error ? (
            <FormHelperText>
              Please enter full name
            </FormHelperText>
          ) : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
          <FormLabel htmlFor='password' mt={'5'}>Password</FormLabel>
          <Input
            id='password'
            type='password'
            value={form.password.value}
            onChange={
              (e) => { setForm({...form, password: {value: e.target.value, error: false}})}
            }
          />
          {!form.password.error ? (
            <FormHelperText>
              Please enter password
            </FormHelperText>
          ) : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
          <Button type='submit' colorScheme={'teal'} size='md'>
            Submit
          </Button>
        </FormControl>
      </Wrapper>
      </form>
    );
}

export default Register;