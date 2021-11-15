import React, {useState} from 'react'
import './Registration.css'
import {
    Link,
    useHistory
  } from "react-router-dom";
  import axios from 'axios'

function Registration() {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[passWord, setPassWord] = useState('');
    const[passConfirm, setPassConfirm] = useState('');
    let history = useHistory();

    const data = {
        username: username,
        email: email,
        password1: passWord,
        password2: passConfirm
    }

    console.log(data)

    const signUp = (e)=>{
        e.preventDefault();
        axios.post('/accounts/registration/', data)
        .then(res=>{
            console.log(res.data)
            const token = res.data.key;
            if(token){
                history.push("/login")
            }
        })
        .catch(err=>console.log(err))
    }
    
    return (
        <div className="registration">
            <form className="border login-form">
                <h3 className="border-bottom p-2 text-secondary h3">Create Account</h3>
                <div className="form-group">
                    <label for="exampleInputPassword1">User name</label>
                    <input value={username} onChange={e=>setUsername(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" placeholder="username" />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input value={passWord} onChange={e=>setPassWord(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label for="exampleInputPassword1">Confirm Password</label>
                    <input value={passConfirm} onChange={e=>setPassConfirm(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div className="form-group alt">
                    <p>Already have an account?</p>
                    <Link className="signin" to="/login"><p>Sign in here!</p></Link>
                </div>
                <button onClick={signUp}  type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    )
}

export default Registration
