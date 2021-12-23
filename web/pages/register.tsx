import React from 'react'
import { useState} from 'react'

interface registerProps {



}

export const Register: React.FC<registerProps> = ({}) => {
    const [name, setName] = useState<string>('name');
    const [password, setPassword] = useState<string>('');

    return (
      <form onSubmit={() => {}}>
        <label>
          Name:
          <input type="text" value ={name} onChange={(e) => {setName(e.target.value)}} />
        </label>
        <label>
          Password:
          <input type="password" value ={password} onChange={(e) => {setPassword(e.target.value)}} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
}

export default Register;