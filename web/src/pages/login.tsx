export {}
import React from 'react'
import {useLoginMutation} from '@/generated/graphql'
import {Formik, Form, Field} from 'formik'
import {toErrorMap} from '@/utils/errorMap'

interface loginProps {

}

const FORM_STYLES = {
  "form": "w-2/4 max-w-screen-sm mx-auto pt-6",
  "fieldContainer" : "pb-5 flex flex-col",
  "fieldName" : "text-md pb-1",
  "fieldInput" : "border border-slate-400 p-1 rounded text-md px-2",
  "submit" : "bg-teal-500 hover:bg-teal-700 rounded w-20 text-md px-1 py-1 text-white",
  "fieldError": "text-rose-500 text-sm pt-1"
}

export const Login: React.FC<loginProps> = ({}) => {
    
    const [,login] = useLoginMutation();

    return (
      <Formik
        initialValues={{ username: '', password:'' }}
        onSubmit={async (values, {setErrors}) => {
          //send registration mutation
          const response = await login({userDetails: {...values}})
          // check if error
          if(response.data?.login.errors){
            // map to Formik errors
            setErrors(toErrorMap(response.data.login.errors))
          } else if (response.data?.login.user){
            //navigate to landing page
          }
          console.log(response)
          return response;
        }}
      >
        {props => (
          <Form onSubmit={props.handleSubmit} className={FORM_STYLES.form}>
            <div className={FORM_STYLES.fieldContainer}>
              <label htmlFor="username" className={FORM_STYLES.fieldName}> Username </label>
              <Field className={FORM_STYLES.fieldInput} type="text" name="username" placeholder="username" />
              {props.errors.username && <div className={FORM_STYLES.fieldError} id="feedback">{props.errors.username}</div>}
            </div>
            <div className={FORM_STYLES.fieldContainer}>
            <label htmlFor='password' className={FORM_STYLES.fieldName}> Password </label>
            <Field className={FORM_STYLES.fieldInput} type="password" name="password" placeholder="password"/>
              {props.errors.password && < div className={FORM_STYLES.fieldError} id="feedback">{props.errors.password}</div>}
            </div>
            <button className={FORM_STYLES.submit}type="submit"> login </button>
          </Form>
        )}
      </Formik>
    );
}

export default Login;