import { TextField } from "../common/textField.jsx";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import { login, register } from "../../api/accountApi"

export const Login = ({setAccount}) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loginReq, setLoginReq] = useState('success');

  const navigate = useNavigate();

  return <>
    <div className='container-fluid mt-5'>
      <div className="row justify-content-center">
        <div className='col-2'></div>
        <div className='col me-3'>
          <h2 className='text-center'>Login</h2>
          <TextField label="Username:" value={loginUsername} setValue={setLoginUsername}/>
          <TextField label="Password:" value={loginPassword} setValue={setLoginPassword}/>
          {(loginUsername == '' || loginPassword == '') &&
          <button type="button" className="btn btn-md btn-primary" disabled>Login</button>}
          {loginUsername !='' && loginPassword != '' &&
          <button type="button" className="btn btn-md btn-primary"
          onClick={() => {
            let test = login({username:loginUsername, password:loginPassword}, setLoginReq);
            console.log(test);
            if(login == "success"){
              setAccount({username:loginUsername, password:loginPassword});
              navigate('/');
            }
          }
          }>Login</button>}
          {loginReq == 'failed' && <p>Incorrect Login</p>}
        </div>
        <div className='col ms-3'>
          <h2 className='text-center'>Register</h2>
          <TextField label="Username:" value={registerUsername} setValue={setRegisterUsername}/>
          <TextField label="Password:" value={registerPassword} setValue={setRegisterPassword}/>
          <TextField label="Confirm Password:" value={registerConfirmPassword} setValue={setRegisterConfirmPassword}/>
          <TextField label="Email:" value={email} setValue={setEmail}/>
          <TextField label="Phone Number:" value={phone} setValue={setPhone}/>
          {(registerUsername == '' || registerPassword == '') &&
          <button type="button" className="btn btn-md btn-primary" disabled>Register</button>}
          {registerUsername !='' && registerPassword != '' &&
          <button type="button" className="btn btn-md btn-primary"
          onClick={() => {
            let test;
            register({username:registerUsername, password:registerPassword, email:email, phone:phone}).then( x =>{
              test = x;
            });
            console.log(test);
            setAccount({username:registerUsername, password:registerPassword});
            navigate('/');

          }}>Register</button>}
        </div>
        <div className='col-2'></div>
      </div>
    </div>
  </>;
}
