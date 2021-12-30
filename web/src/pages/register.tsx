import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react'
import { useState} from 'react'
import { Wrapper } from '../components/Wrapper';
import {useMutation} from 'urql';
import {useRegisterMutation} from '../generated/graphql'
import {FormField} from '../types'

interface registerProps {

}


interface formFields{
  name: FormField
  password: FormField
}

export const Register: React.FC<registerProps> = ({}) => {
    const [form, setForm] = useState<formFields>({
      name: {value: '', error: undefined},
      password: {value: '', error: undefined}
    });

    const [,register] = useRegisterMutation();

    const handleRegistration = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        //send registration mutation
        const response = await register({registerUserDetails: {username: form.name.value, password: form.password.value}})
        // check if error
        if(response.data?.register.errors){
          
        }
        console.log(response)
        return response;
    } 

    return (
      <form onSubmit={handleRegistration}> 
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
            <FormErrorMessage>{form.name.error?.errorMessage}</FormErrorMessage>
          )}
          <FormLabel htmlFor='password' mt={'5'}>Password</FormLabel>
          <Input
            id='password'
            type='password'
            value={form.password.value}
            onChange={
              (e) => { setForm({...form, password: {...form.password, value: e.target.value}})}
            }
          />
          {!form.password.error ? (
            <FormHelperText>
              Please enter password
            </FormHelperText>
          ) : (
            <FormErrorMessage>{form.password.error?.errorMessage}</FormErrorMessage>
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