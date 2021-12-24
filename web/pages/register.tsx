import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react'
import { useState} from 'react'

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

    return (
      <form onSubmit={(e)=>{
        e.preventDefault()
        console.log(form)
        }}> 
        <Box maxW={'sm'} mt={'10'} mx={'auto'} alignSelf={'center'}>
        <FormControl >
          <FormLabel htmlFor='name'>Name</FormLabel>
          <Input
            id='name'
            type='text'
            value={form.name.value}
            onChange={
              (e) => { setForm({...form, name: {value: e.target.value, error: false}})}
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
      </Box>
      </form>
    );
}

export default Register;