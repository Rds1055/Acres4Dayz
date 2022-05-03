import { TextField } from "../common/textField.jsx";
import { useEffect, useState } from "react";
import { getUserInfo, editUser, login, getToken } from "../../api/accountApi.js"

export const Settings = ({account, setAccount, token, setToken}) => {
  const [local, setLocal] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
  console.log(getToken());
      getUserInfo().then(x =>
      {
        let test = setLocal(x);
        console.log(test);
      }
      );
    }, []);

  return <>
  <div className='container text-center mt-5 mb-5'>
    <h1>Info:</h1>
    <p>Username: {local.username}</p>
    <p>Phone Number: {local.phone}</p>
    <p>Email: {local.email}</p>
    <p></p>
    <p></p>
  </div>
  <div className='container-fluid mt-2 text-center'>
    <div className="row justify-content-center">
      <div className='col me-3'>
        <h2 className='text-center'>Change Password</h2>
        <TextField label="Password:" value={password} setValue={setPassword}/>
        <TextField label="Confirm Password:" value={confirmPassword} setValue={setConfirmPassword}/>
        {(password == '' || confirmPassword == '' || password != confirmPassword) &&
        <button type="button" className="btn btn-md btn-primary" disabled>Submit</button>}
        {password !='' && confirmPassword != '' && password == confirmPassword &&
        <button type="button" className="btn btn-md btn-primary"
        onClick={() => {
          if(password == confirmPassword){
            editUser(local.username, {password:password}).then(x => setLocal(x));
            setAccount({username:local.username, password:password});
            login(account.username, account.password);
            setPassword('');
            setConfirmPassword('');
          }
        }}>Submit</button>}
      </div>
      <div className='col ms-3'>
        <h2 className='text-center'>Change Email</h2>
        <TextField label="Email:" value={email} setValue={setEmail}/>
        {email == '' &&
        <button type="button" className="btn btn-md btn-primary" disabled>Submit</button>}
        {email != '' &&
        <button type="button" className="btn btn-md btn-primary"
        onClick={() => {
          editUser(local.username, {email:email}).then(x => setLocal(x));
          login(account.username, account.password);
          setEmail('');
        }}>Submit</button>}
      </div>
      <div className='col ms-3'>
        <h2 className='text-center'>Change Phone Number</h2>
        <TextField label="Phone Number:" value={phone} setValue={setPhone}/>
        {phone == '' &&
        <button type="button" className="btn btn-md btn-primary" disabled>Submit</button>}
        {phone != '' &&
        <button type="button" className="btn btn-md btn-primary"
        onClick={() => {
          editUser(local.username, {phone:phone}).then(x => setLocal(x));
          login(account.username, account.password);
          setPhone('');
        }}>Submit</button>}
      </div>
    </div>
  </div>
  </>;
}
