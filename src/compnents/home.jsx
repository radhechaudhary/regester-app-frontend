import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();
  useEffect(() => {
      props.setCurrPage('home')
  }, []);
  return (
    <div className='main-body home'>
      <h1 data-aos="fade-right">Guest Register</h1>
      <p data-aos="fade-right">Here's the ultimate digital regester for costumer details.</p>
    </div>
  )
}

export default Home;
