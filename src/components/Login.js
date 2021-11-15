import React, {useState} from 'react'
import './Login.css'
import axios from 'axios'
import {addUserDetails} from '../redux/actions'
import {useDispatch} from 'react-redux'
import {
    Link,
    useHistory
  } from "react-router-dom";

function Login() {
    const[email, setEmail] = useState('');
    const[passWord, setPassWord] = useState('');
    const[username, setUsername] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();

    const data = {
        username:username,
        email:email,
        password:passWord
    }
  
    const login = (e)=>{
        e.preventDefault();
        axios.post('/token-auth/', data)
        .then(res=>{
            dispatch(addUserDetails(res.data));
            history.push("/")
            window.location.reload()
        })
        .catch(err=>console.log(err))
    }
    return (
        <div className="home">
            <form className="border login-form">
                <h3 className="border-bottom p-2 text-secondary h3">Sign in</h3>
                <div className="form-group">
                    <label for="exampleInputPassword1">User name</label>
                    <input required value={username} onChange={e=>setUsername(e.target.value)} type="text" className="form-control" id="exampleInputPassword1" placeholder="username" />
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
                <div className="form-group alt">
                    <p>Create an account if you don't have one</p>
                    <Link className="signin" to="/register"><p>Sign up here!</p></Link>
                </div>
                <button onClick={login} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
