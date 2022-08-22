import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../Data/TrendData.js'
const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Trends</h3>
      <img
        src="https://muslimtravelgirl.com/wp-content/uploads/2016/11/abu-dhabi-1266923_960_720.jpg.webp"
        alt=""
      />
    
      {/* {TrendData.map((trend, id)=>{
            return (
              <div className="trend" key={id}>
                <img
                  src="https://muslimtravelgirl.com/wp-content/uploads/2016/11/abu-dhabi-1266923_960_720.jpg.webp"
                  alt=""
                />
              </div>
            );
       })} */}
    </div>
  );
}

export default TrendCard