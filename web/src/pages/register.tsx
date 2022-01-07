// import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Button, Box } from '@chakra-ui/react';
import React from 'react'
import { useReducer, useState} from 'react'
import { Wrapper } from '@/components/Wrapper';
import {useMutation} from 'urql';
import {useRegisterMutation, FieldError, UsernamePasswordInput} from '@/generated/graphql'
import {FormField, FormError } from '@/types'
import {Formik, Form, Field} from 'formik'
import {toErrorMap} from '@/utils/errorMap'

interface registerProps {

}

// interface formFields{
//   [field:string]: FormField;
// }

interface fieldErrors{
  [field:string]:FieldError;
}

const FORM_STYLES = {
  "form": "w-2/4 max-w-screen-sm mx-auto pt-6",
  "fieldContainer" : "pb-5 flex flex-col",
  "fieldName" : "text-md pb-1",
  "fieldInput" : "border border-slate-400 p-1 rounded text-md px-2",
  "submit" : "bg-teal-500 rounded w-20 text-md px-1 py-1 text-white"
}

// enum FORM_ACTIONS {
//   UPDATE_NAME = 'update-name',
//   UPDATE_PASSWORD = 'update-password',
//   UPDATE_ERRORS = 'update-errors'
// }

// interface formAction {
//   type: FORM_ACTIONS
//   payload: string | FieldError[]
// }

export const Register: React.FC<registerProps> = ({}) => {
    
    // crappy attempt at using reducer
    // const initialForm = {
    //   username: {value: '', error: undefined},
    //   password: {value: '', error: undefined}
    // }

    // const formReducer = (formState: formFields, action: formAction): formFields => {
    //     switch(action.type){
    //       case FORM_ACTIONS.UPDATE_NAME:
    //         if(typeof action.payload === 'string'){
    //           return{
    //             ...formState, username: {...formState.username, value: action.payload}
    //           }
    //         }
    //       case FORM_ACTIONS.UPDATE_PASSWORD:
    //         if(typeof action.payload === 'string'){
    //           return{
    //             ...formState, password: {...formState.password, value: action.payload}
    //           }
    //         }
    //       case FORM_ACTIONS.UPDATE_ERRORS:
    //         if(Array.isArray(action.payload)){
    //           for( const err of action.payload){
    //             console.log(err);
    //             if(err.field in Object.keys(formState)){
    //               formState[err.field] = {...formState[err.field], error: {errorMessage : err.message}}
    //             }             
    //           }
    //           console.log(formState)
    //           return{
    //             ...formState
    //           }
    //         }
    //       default:
    //         return {
    //           ...formState
    //         }
    //     }
    // };


    // const [form, setForm] = useState<UsernamePasswordInput>({username: '', password: ''});
    // const [formState, setFormState] = useReducer(formReducer,{...initialForm});

    const [,register] = useRegisterMutation();

    return (
      // <form onSubmit={handleRegistration}> 
      //   <Wrapper variant="small">
      //   <FormControl >
      //     <FormLabel htmlFor='name'>Name</FormLabel>
      //     <Input
      //       id='name'
      //       type='text'
      //       value={form.username}
      //       onChange={
      //         // e => setFormState({type:FORM_ACTIONS.UPDATE_NAME, payload: e.target.value})
      //         e => setForm({...form, username: e.target.value})
      //       }
      //     />
      //     {!formErrors.username? (
      //       <FormHelperText>
      //         Please enter full name
      //       </FormHelperText>
      //     ) : (
      //       <FormErrorMessage>{formErrors.username?.message}</FormErrorMessage>
      //     )}
      //     <FormLabel htmlFor='password' mt={'5'}>Password</FormLabel>
      //     <Input
      //       id='password'
      //       type='password'
      //       value={form.password}
      //       onChange={
      //         // e => setFormState({type:FORM_ACTIONS.UPDATE_PASSWORD, payload: e.target.value})
      //         e => setForm({...form, password: e.target.value})
      //       }
      //     />
      //     {!formErrors.password? (
      //       <FormHelperText>
      //         Please enter password
      //       </FormHelperText>
      //     ) : (
      //       <FormErrorMessage>{formErrors.password?.message}</FormErrorMessage>
      //     )}
      //     <Button type='submit' colorScheme={'teal'} size='md'>
      //       Submit
      //     </Button>
      //   </FormControl>
      // </Wrapper>
      // </form>
      <Formik
        initialValues={{ username: '', password:'' }}
        onSubmit={async (values, {setErrors}) => {
          //send registration mutation
          const response = await register({registerUserDetails: {...values}})
          // check if error
          if(response.data?.register.errors){
            setErrors(toErrorMap(response.data.register.errors))
            // setFormState({type:FORM_ACTIONS.UPDATE_ERRORS, payload: response.data.register.errors})
          }
          console.log(response)
          return response;
        }}
      >
        {props => (
          <Form onSubmit={props.handleSubmit} className={FORM_STYLES.form}>
            <div className={FORM_STYLES.fieldContainer}>
              <label htmlFor="username" className={FORM_STYLES.fieldName}> Username </label>
              <Field className={FORM_STYLES.fieldInput} type="email" name="username" placeholder="email" />
              {props.errors.username && <div id="feedback">{props.errors.username}</div>}
            </div>
            <div className={FORM_STYLES.fieldContainer}>
            <label htmlFor='password' className={FORM_STYLES.fieldName}> Password </label>
            <Field className={FORM_STYLES.fieldInput} type="password" name="password" placeholder="password"/>
              {props.errors.password && <div id="feedback">{props.errors.password}</div>}
            </div>
            <button className={FORM_STYLES.submit}type="submit"> register</button>
          </Form>
        )}
      </Formik>
    );
}

export default Register;