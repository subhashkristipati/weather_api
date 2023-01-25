import React, { useState } from 'react';
import Mapdisplay from './components/Mapdispaly';

const App = () => {
  const [city, setCity] = useState("Hyderabad");
  const handleChange = (event) => {
    setCity(event.target.value);
  };



  return (
    <>
      <div className='container'>
        <div className='row1'>
          <div className='home'><h2>WEATHER API</h2></div>
          <div className='endelement'>
            <div className='entercity'>
              <h3>Enter city </h3>
            </div>
            <div>
              <select className='city-select' value={city} onChange={handleChange}>
                <option value="Hyderabad">Hyderabad</option>
                <option value="New York">New York</option>
                <option value="London">London</option>
                <option value="Paris">Paris</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Delhi">Delhi</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
              </select>
            </div>
          </div>
        </div>
        <Mapdisplay city={city} />
      </div>
    </>
  )
}

export default App;
