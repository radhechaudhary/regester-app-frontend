import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import CloseIcon from '@mui/icons-material/Close';
// import {  Routes, Route,  useNavigate, replace } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Footer from './footer';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function User(prop) {
  const [rooms, setRooms]=useState([]) // array to store room numbers in order
  const [newRoomNo, setnewRoomNo]=useState("")

  function newRoomvaluechange(e){
    if(Array.from(e.target.value)[e.target.value.length-1].charCodeAt(0)>=48 && Array.from(e.target.value)[e.target.value.length-1].charCodeAt(0)<=57 ){
      setnewRoomNo(e.target.value)
    }
    
  }

  function addNewRoom(){
    if(newRoomNo!==""){
      setRooms([
        ...rooms,
        newRoomNo
      ])
    }
    
    setnewRoomNo('')
  }

  const cardRef=useRef(null);

  useEffect(()=>{    //set current page value on loading
    prop.setCurrPage('user')
    localStorage.getItem('rooms')?setRooms(JSON.parse(localStorage.getItem('rooms'))):setRooms([])
    
  },[])

  const [cardOpened, setCardOpened]=useState(false)// use state to store if card is expanded or not;
  const [roomNo, setRoomNo]=useState(0)
  const [showAlert,setShowAlert]=useState(false)
  // function to add class 'card-opened' to card to expand card and edit details
  function openCard(e, roomNo){    
    document.querySelector('body').style.overflowY='hidden';
    document.querySelector('body').style.height='100vh';
    if(e.target.className==='card')e.target.classList.add('card-opened');
    else if(e.target.className==='visible') e.target.parentNode.classList.add('card-opened')
    else e.target.parentNode.parentNode.classList.add('card-opened')
    setDetails({
      ...details,
      ...JSON.parse(localStorage.getItem(`room-details-${roomNo}`))
    });
    setRoomNo(roomNo);
    setCardOpened(!cardOpened)
    return;
  }


  //State to  store  form details;
  const [details, setDetails]=useState({roomNo:0, name:"", inDate:"", inTime:"", idNo:"", mobile:"", members:"", OutDate:"", OutTime:""});
  function handleChange(e){
    const name=e.target.name;
    const value=e.target.value;
    setDetails({
      ...details,
      [name]:value
    });
  }
  

  function cutPopUp(){ // function to cut the popUp.....
    // local-storage to  store details of every room until checked-Out
    localStorage.setItem(`room-details-${roomNo}`,JSON.stringify({roomNo: roomNo,name:details.name, inDate:details.inDate, inTime:details.inTime, idNo:details.idNo, mobile:details.mobile, members:details.members, OutDate:details.OutDate, OutTime:details.OutTime}))
    const cards=document.querySelectorAll('.card')
    document.querySelector('body').style.overflowY='scroll';
    document.querySelector('body').style.height='fit-content';
    for(let i=0; i<cards.length;i++){
      cards[i].classList.remove('card-opened')
    }
    setCardOpened(false)
    localStorage.setItem('rooms', JSON.stringify(rooms))
  }

  //Submit function to submit details to databse
  function submit(){
      if(details.name==="" || details.idNo===""||details.OutDate==="" || details.inDate==="" || details.inTime==="" || details.members==="" || details.OutTime==="" || details.mobile===""){
        alert("Any field cannot be empty!!")
      }
      else{
      axios.post(`${process.env.REACT_APP_API_URL}/data-submit?apiKey=${process.env.REACT_APP_API_KEY}`,{...details,roomNo:roomNo, username:localStorage.getItem('username')})
      .then((response)=>{
        localStorage.removeItem(`room-details-${roomNo}`);
        setDetails({roomNo:0, name:"", inDate:"", inTime:"", idNo:"", mobile:"", members:"", OutDate:"", OutTime:""})
        const cards=document.querySelectorAll('.card')
          for(let i=0; i<cards.length;i++){
          cards[i].classList.remove('card-opened')
        }
        setCardOpened(false)
        setShowAlert(true)
        document.querySelector('body').style.overflowY='scroll';
        document.querySelector('body').style.height='fit-content';
        setTimeout(()=>setShowAlert(false), 1500)
      })
      .catch((err)=>{
        console.log(err.message)
      })
    }
  }

  return (
    <div>
    <div className="user-dashboard ">
      <div className='add-input'>
      <input className='addNewRoom' onChange={(e)=>newRoomvaluechange(e)} type="text" value={newRoomNo} name="newRoomInput" placeholder='new'/>
      <Fab className='add-button' size="medium" color="primary" onClick={addNewRoom} aria-label="add">
        <AddIcon />
      </Fab>
      </div>
      
        <div className="cards">
        {rooms.map((value,index)=>{
          return(
            <div key={index} className="card" ref={cardRef} onClick={!cardOpened ? (e) => openCard(e, value) : undefined}>
              <span className="Badge">{value}</span>
              <div className='visible'>
                {localStorage.getItem(`room-details-${value}`)?<p>Name:{JSON.parse(localStorage.getItem(`room-details-${value}`)).name}</p>:<p>Name:</p>}
                {localStorage.getItem(`room-details-${value}`)?<p>check-In Date:{JSON.parse(localStorage.getItem(`room-details-${value}`)).inDate}</p>:<p>check-In Date:</p>}
                {localStorage.getItem(`room-details-${value}`)?<p>Members:{JSON.parse(localStorage.getItem(`room-details-${value}`)).members}</p>:<p>Members:</p>}
              </div>
              <div className='edit-inputs'>
                <button className='cross' onClick={cutPopUp}><CloseIcon sx={{ color:'black', fontSize:'30px' }}/></button>
                <input type="text" className='width-70' onChange={(e)=>{handleChange(e)}} value={details.name} name="name" placeholder='name'/>
                <input type="date"  onChange={(e)=>{handleChange(e)}} name="inDate" value={details.inDate} placeholder='check-in-date'/>
                <input type="time" onChange={(e)=>{handleChange(e)}} name="inTime" value={details.inTime} placeholder='check-In Time'/>
                <input type='text'className='width-70' onChange={(e)=>{handleChange(e)}} name="idNo" value={details.idNo} placeholder='id number'/>
                <input type='tel'className='width-70' onChange={(e)=>{handleChange(e)}} name="mobile" value={details.mobile} placeholder="mobile"/>
                <input type='number' onChange={(e)=>{handleChange(e)}} name="members" value={details.members} placeholder='members'/>
                <input type="date" onChange={(e)=>{handleChange(e)}} name="OutDate" value={details.OutDate} placeholder='check-Out date'/>
                <input type="time" onChange={(e)=>{handleChange(e)}} name="OutTime" value={details.OutTime} placeholder='chek-out Time'/>
              </div> 
              <button className='submit-button' type='submit' onClick={submit}>Submit</button>
            </div>
          )
        })}  
      </div>
      {showAlert===true?<div className='Alert'><Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success">
        Data Saved SuccefFully!!
      </Alert></div>:<></>}
    </div>
    {/* <Footer/> */}
    </div>
  )
}

export default User
