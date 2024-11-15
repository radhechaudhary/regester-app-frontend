import React, {useEffect, useState} from 'react'
import icon from './regester icon.png'

function About(props) {
    useEffect(() => {
        props.setCurrPage('about')
    }, []);
  return (
    <div className="About main-body">
        <h2>Welcome To the About Section</h2>
      <div className='AppDetails'>
        
        <div className="text">
            <p>If you  are currently running a hotel or guesthouse then this App is definately going to make your work  easier.
                This the exclusive App designed for you!! You just need to follow a few steps:</p>
                <ol>
                <li>Make a free acount</li>
                <li>Set Up your profile</li>
                <li>You Are All set!!</li> 
                </ol>
                <p>Here in this App you can just enter the details of a costumer and all set They will be saved  throughOut the eternity. You can Access them any time you need but privately!
                    This App takes care of your and your costumers privacy privacy.its a safe App made exclusively for you!
            </p>
        </div>
        <div className="image">
            <img src={icon}/>
        </div>
        
        </div>
        <div className="Owner">
            <h3>Mohit Chaudhary</h3>
            <p>Hey !! My self Mohit  Chaudhary the creator founder and designer of the web App.</p>
            <p>I'm a full Stack web Developer based in Mathura, Uttar Pradesh</p>
        </div>
    </div>
  )
}

export default About
