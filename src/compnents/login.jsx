import React from 'react'
import { useState } from "react";
import { Link } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import icon from './regester icon.png'
import TextField from '@mui/material/TextField';

export default function Login(prop) {
    let Mystyle={
        display: "flex", flexDirection: "column", gap:"20px"
    };
    let Mystyle2={
        width:"fit-content"
    };
    let[username, addUsername]=useState("")
    let[password, addPassword]=useState("")

    function submit(e){
        e.preventDefault();
        if(username==="" || password===""){
            alert("username or passowrd cannot be blank")
          }
        else{
            prop.checkLogin(username, password)
        }
    }

  return (
    <div className="login main-body">
        {prop.isLoading?<Backdrop  sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}open={true}>
            <CircularProgress color="inherit" />
          </Backdrop>:<></>} 
          <div  className="header">
            <img src={icon} style={{width:"50px", height:"auto"}} alt="add-user-male"/>  
            <h2>Log into your Account</h2>
            <p style={{color:"rgb(140,140, 140)"}}>let's make connection Stronger!!</p>
          </div>
          <div className="form">
            <h2 style={{color:"rgb(71, 71, 71)", textAlign:"center"}}>LOGIN!</h2>
            <form onSubmit={submit}>
                <div style={Mystyle}>
                    <TextField id="outlined-multiline-flexible"  placeholder="username" label="username" name="username" value={username} onChange={(e) => addUsername(e.target.value)} maxRows={1}/>
                    <TextField id="outlined-password-input" label="password" placeholder="password" name="password" type="password" value={password} onChange={(e) => addPassword(e.target.value)} maxRows={1}/>
                </div>
                <p className="error">{prop.error}</p>
                <button type="submit" className="btn btn-primary" style={Mystyle2}>Login</button>
            </form><br/>
            <p>Don't have an account? <Link to="/signup">Register</Link></p>
            </div> 
    </div>
  )
}
