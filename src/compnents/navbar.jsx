import React, {useState, useRef, useEffect} from 'react'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import profilePhoto from './profile.jpg'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import HotelIcon from '@mui/icons-material/Hotel';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import icon from './regester icon.png'


const style={fontSize:"50px"};
function Navbar(props) {
    const profileMenuRef=useRef(null)
    const navMenuRef=useRef(null)
    const [showMenu, setShowMenu]=React.useState(null)
    const [showProfile,  setShowProfile]=useState(null)
    function toggleMenu(){
        setShowMenu(!showMenu)   
    }
    function toggleProfile(){
        setShowProfile(!showProfile)
        
    }
    useEffect(()=>{
        setShowMenu(false)
        setShowProfile(false)
    },[])
    useEffect(()=>{
        if(showProfile || showMenu){
            document.addEventListener('click' , clickedOutside)
        }
    },[showProfile, showMenu])
    function clickedOutside(event){
        if( profileMenuRef.current && showProfile && !profileMenuRef.current.contains(event.target)){
            setShowProfile(false)
            document.removeEventListener('click', clickedOutside)
        }
        console.log(navMenuRef.current)
        if( navMenuRef.current &&showMenu && !navMenuRef.current.contains(event.target)){
            setShowMenu(false)
            document.removeEventListener('click', clickedOutside)
        }
    }
  return (
    <div className={`navbar ${(props.loggedIn && props.currPage!=='home' && props.currPage!=="about" )?"background-dark":""}`}>
        <div className='nav-icon'>
           {props.loggedIn!==true?<Link onClick={()=>{toggleProfile(); toggleMenu()}} to="/"><img src={icon} style={{width:"60px", height:"auto"}} alt="add-user-male"/></Link>:<Link style={{width:"40px"}}   to="/user"><HomeIcon  sx={{ color: 'white', fontSize:'50px' }}  /></Link>}
        </div>
        <div className="elements">
        <ul className={`nav-list ${showMenu? "show" : ""}`}>
            {<li><Link to="/" onClick={()=>{toggleMenu(); toggleProfile(); props.setCurrPage("home")}}>HOME</Link></li>}
            <li><Link to="/about" onClick={()=>{toggleMenu(); toggleProfile(); props.setCurrPage("about")}}>ABOUT</Link></li>
            {props.loggedIn===false?<><li><Link to="/login"onClick={toggleMenu}>LOGIN</Link></li><li><Link to="/signup" onClick={()=>{toggleMenu(); props.setCurrPage("login")}}>SIGN UP</Link></li></>:<></>}
        </ul>
        {props.loggedIn===true?<button ref={profileMenuRef} className="avatar" onClick={toggleProfile}><Avatar alt="Remy Sharp" /></button>:<></>}
        <div onClick={()=>{toggleMenu(); toggleProfile()}}  ref={navMenuRef} className="menu"><MoreVertIcon sx={{ color: 'white', fontSize:'40px' }} /></div>
        </div>
       {props.loggedIn===true?
       <div className={`profile-menu ${showProfile?"show":""}`}>
            <div  className='profile-head'>
                <Avatar sx={{  fontSize:'60px' }} alt="Remy Sharp" />
                <h2>{localStorage.getItem('name')}</h2>
            </div>
            <div  className='buttons'>
                <button onClick={()=>{toggleProfile(); toggleMenu()}}><HotelIcon sx={{ color: 'white', fontSize:'40px' }}/>Rooms</button>
                {props.loggedIn===true && props.currPage!=="data"?<Link to="/data" onClick={()=>{ toggleProfile(); props.setCurrPage("data"); toggleMenu()}}><LocalLibraryIcon  sx={{ color: 'white', fontSize:'40px' }}/> Entries</Link>:<></>}
                <Link to='/profile-info' onClick={()=>{toggleProfile(); toggleMenu()}}><InfoIcon sx={{ color: 'white', fontSize:'40px' }}/>Intro</Link>
                <button onClick={()=>{toggleProfile(); toggleMenu()}}><SettingsIcon sx={{ color: 'white', fontSize:'40px' }}/>setting</button>   
            </div>
            <div className="list">
                <button onClick={()=>{ props.setCurrPage("home"); props.signOut(); toggleProfile(); toggleMenu()}}><LogoutIcon/>Sign Out</button>
            </div>
        </div>:<></>}
    </div>
  )
}

export default Navbar
