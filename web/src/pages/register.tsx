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

const FORM_STYLES = {
  "form": "w-2/4 max-w-screen-sm mx-auto pt-6",
  "fieldContainer" : "pb-5 flex flex-col",
  "fieldName" : "text-md pb-1",
  "fieldInput" : "border border-slate-400 p-1 rounded text-md px-2",
  "submit" : "bg-teal-500 rounded w-20 text-md px-1 py-1 text-white"
}

export const Register: React.FC<registerProps> = ({}) => {
    
    const [,register] = useRegisterMutation();

    return (
      <Formik
        initialValues={{ username: '', password:'' }}
        onSubmit={async (values, {setErrors}) => {
          //send registration mutation
          const response = await register({registerUserDetails: {...values}})
          // check if error
          if(response.data?.register.errors){
            // map to Formik errors
            setErrors(toErrorMap(response.data.register.errors))
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