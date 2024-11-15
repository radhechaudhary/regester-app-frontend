import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Footer from './footer';
import TextField from '@mui/material/TextField';

function Data(props) {
    
const location=useLocation()
    useEffect(()=>{    //set current page value on loading
        props.setCurrPage('data')
      },[])

    const [data, setData]=useState([]) // useState to store data value from database.
    const [database,  setdatabase]=useState([])
    const [searchValue, setSearchValue]=useState("") // useState for seaarch value
    const [type, setType]=useState('search')  //useState for search type
    const [searchFor,setSearchFor]=useState('name')
    const [loading,  setLoading]=useState(false)

    useEffect(()=>{      // use Effect when the page loads 
        axios.get(`${process.env.REACT_APP_API_URL}/data?apiKey=${process.env.REACT_APP_API_KEY}&username=${props.username}`)
        .then((response)=>{
            setdatabase(response.data)
        })
    },[props.username, searchValue]) // also useEffect  when the current user changes.

    
    function handleChange(e){   // function triggers when search value is changed
        setSearchValue(e.target.value) 
    }
    

    function typeChange(e){  //function triggers when search value type changes
        const selectedOption = e.target.selectedOptions[0]; // Get the first selected option
        const name = selectedOption.getAttribute("name");
        setData([])
        setType(e.target.value) //changes the type of  search tag.
        setSearchFor(name)
        setSearchValue('')
        if(name==="all"){
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
                setData(database)
            },1000)  
        }     
    }

    useEffect(()=>{ 
        setData(database.filter((obj)=>{
            if(searchFor==="name"){
                return ((obj[searchFor] || "").toLowerCase()).includes(searchValue.toLowerCase().trim());
            }
            else{
                console.log(obj[searchFor].toString()===searchValue)
                return (obj[searchFor].toString() || "")===searchValue;
            }    
        }))
        
    },[searchValue])
    
    

  return (
    <>
    <div className='data'>
      <div className='data-table'>
        <div className="inputs">
            
            <select style={{height:"56px", borderRadius:"5px", color:"white", backgroundColor:"transparent", border:"1px solid white"}} onChange={(e)=>typeChange(e)}>
                <option name="name" style={{color:"black"}} value="search">Name</option>
                <option name="entry_date" style={{color:"black"}} value="date">Entry</option>
                <option name="sr_no" style={{color:"black"}} value="search">Sr No.</option>
                <option  name="out_date"style={{color:"black"}} value="date">Out</option>
                <option name="all" style={{color:"black"}} value="all">All</option>
            </select>
            <TextField id="outlined" sx={{
                
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white", // Default outline color
          },
          "&:hover fieldset": {
            borderColor: "white", // Outline color on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "white", // Outline color when focused
          },
        },
      }} name="search" value={searchValue} onChange={(e)=>handleChange(e)} placeholder='search'  type={type}/>
        </div>
        <table>
            <tr>
                <th>Sr no.</th>
                <th>Name</th>
                <th>entry Date</th>
                <th>entry time</th>
                <th>members</th>
            </tr>
            {data.map((value,index)=>{
                return(
                <tr key={index}>
                    <td>{value.sr_no}</td>
                    <td>{value.name}</td>
                    <td>{value.entry_date}</td>
                    <td>{value.entry_time}</td>
                    <td>{value.members}</td>
                </tr> )  
            })}
        </table>
        {loading?<CircularProgress  />:<></>}
      </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default Data
