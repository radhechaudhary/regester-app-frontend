import React, {useState, useEffect} from 'react';
import Aos from 'aos';
import axios from 'axios';
import 'aos/dist/aos.css';
import {  Routes, Route,  useNavigate, replace } from 'react-router-dom';
import Home from './compnents/home'
import  Navbar from './compnents/navbar'
import Login from './compnents/login'
import SignUp from './compnents/SignUp';
import User from './compnents/user'
import Protected from './protected';
import Data from './compnents/data';
import About from './compnents/about';

function App() {
  React.useEffect(()=>{                 // animation init
    Aos.init({duration:1500, once:true});
},[])


const navigate = useNavigate(); 
const [loading, setLoading] = useState(false);
const [loggedIn, setLoggedIn]=useState(false)
const [currPage, setcurrPage]=useState('home') // stores the current page value
const [error, setError]=useState("")  // error to be displayed in forms
const [currentUser, setCurrentUser]=useState("")


useEffect(() => {
  const username = localStorage.getItem('username');
  const isLoggedIn = localStorage.getItem('isLoggedIn')==='true';

  if (isLoggedIn) {  // check if its loggedIn in localStorage evrytime page reloads or any state is  changed
    setLoggedIn(true); 
    setCurrentUser(username);  //set the current username from localStorage
    setcurrPage('user')
    navigate('/user', {replace:true});   //navigate to user
  }
}, []);

//login check function.................
const [loginData,setLoginData]=useState({username:"", password:""}) //login data to store input from Login Form
function checkLogin(username, password){
  setLoading(true)                        // function to change login data
  setLoginData({username:username, password:password});
}
useEffect(()=>{         // useEffect which triggers when login data is changed connects with the databse and check whether data is valid or not
      axios.post(`${process.env.REACT_APP_API_URL}/login`,{username:loginData.username, password:loginData.password})
      .then((response)=>{
        if(response.data.status==='valid'){
          if(loginData.username!==currentUser){
            for(let i=101;i<1000;i++){
              localStorage.removeItem(`room-details-${i}`)
            }
          }
          setCurrentUser(loginData.username);
          localStorage.setItem('isLoggedIn', "true") // if data is valid  loggedIn value  is set to true;
          localStorage.setItem('name', response.data.name )
          localStorage.setItem('username',  loginData.username)  // set the username in local storage
            setLoggedIn(true)
            setError("")
            setcurrPage('user')
            setLoading(false)
            navigate ("/user", {replace:true})  
        }
        else if(loginData.username){
          setError("*"+response.data.status+"*")
          setLoading(false)
        }
      })
      .catch((err)=>{
      }) 
 },[loginData])
  
//signUp add the user to  database......................................
const [signUpData,  setSignUpData]=useState({}) // set auseState hook to store signUp data
function signUp(values){
  setLoading(true) // function which triggers  when signUp form is  submitted
  setSignUpData({                                   // it updates the signUpdata
    ...values
  })
}

useEffect(()=>{          // useState which triggers when signUpData is updated everytime
  axios.post(`${process.env.REACT_APP_API_URL}/signup`,{name:signUpData.name, mobile:signUpData.mobile, username:signUpData.username, password:signUpData.password, mail:signUpData.mail, buisness:signUpData.buisness, rooms:signUpData.rooms})
  .then((response)=>{
      if(response.data==="submitted" && signUpData.name){
        setCurrentUser(signUpData.username ); 
        localStorage.setItem('isLoggedIn', "true")
        localStorage.setItem('username', signUpData.username )
        localStorage.setItem('name', signUpData.name)
        setLoading(true)
          setError("")
          setLoggedIn(true)
          setCurrentUser(loginData.username);
          setcurrPage('user')
          setLoading(false)
          navigate ("/user", {replace:true})
        for(let i=101;i<10000;i++){
          localStorage.removeItem(`room-details-${i}`)
        }
      }
      else if(signUpData.name){
        setError(response.data)
        setLoading(false)
      }
      
  })
  .catch((err)=>{
    if(signUpData.name){
      setError("*"+err+"*")
    }  
  })
},[signUpData])


//signOut section......................
function signOut(){
  localStorage.removeItem('username') // remove username localstorage
  localStorage.setItem('isLoggedIn', "false") // set isLoggedIn in localstorage as false
  setCurrentUser('')  // removes the current user
  setLoggedIn(false)  //sets the loggedIn values as false
  setTimeout(() => {
    navigate('/');
  }, 10);
  return 
}

  return (
    <>
     <Navbar loggedIn={loggedIn} currPage={currPage} setCurrPage={setcurrPage} signOut={signOut}/>
     <Routes >
        <Route path='/'   element={<Home setCurrPage={setcurrPage} currPage={currPage}/>}/>
        <Route path='/login' element={<Login checkLogin={checkLogin} setUsername={setCurrentUser} error={error} setError={setError} isLoading={loading}/> }/>
        <Route path='/signup' element={<SignUp signUp={signUp} setCurrPage={setcurrPage} setUsername={setCurrentUser} error={error} setError={setError}  isLoading={loading}/>}/>
        <Route path='about' element={<About setCurrPage={setcurrPage} currPage={currPage}/>}/>
        <Route element={<Protected username={currentUser} setUsername={setCurrentUser} loggedIn={loggedIn}/>}>
          <Route path='/user' element={<User setCurrPage={setcurrPage} isLoggedIn={loggedIn} username={currentUser} setUsername={setCurrentUser}/>}/>
          <Route path='/data'  element={< Data setCurrPage={setcurrPage} setUsername={setCurrentUser} username={currentUser}/>}/>
          </Route>
      </Routes>
    </>
    
  );
}

export default App;
