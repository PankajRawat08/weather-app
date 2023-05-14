import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const APIKey = "8616305223ab24de18f35cb6cd8ccd7d";
  const [cssClass, setCssClass] = useState("");
  const [height, setHeight] = useState(100);
  useEffect(() => {console.log(data);}, [data]);
  const handleInput = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCity(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while fetching data

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setLoading(false); // Set loading state to false after data is fetched
        setCssClass("fadeIn");
        setHeight(590);
      })
      .catch((error) => {
        console.log(error);
        setData({});
        setLoading(false);
        setCssClass("fadeIn");
        setHeight(400);
      });
      
    
  };

  return (
    <div className="container" style={{ height: height }}>
      <div className="search-box">
        <i className="fas fa-location-dot" />
        <input
          type="text"
          placeholder="Enter your location"
          value={city}
          onChange={(e) => handleInput(e)}
        />
        <button className="fas fa-search" onClick={(e) => handleClick(e)} />
      </div>
      {loading ? (
        <></>
      ) : (
        <>
          {data.main && data.weather && (
            <div className={`weather-box ${cssClass}`}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="Weather Icon"
              />
              <p className="place">{data.name}</p>
              <p className="temperature">
                {data.main.temp}
                <span>°C</span>
              </p>
              <p className="description">{data.weather[0].description}</p>
            </div>
          )}
          {!loading && Object.keys(data).length === 0 &&(
            <div className={`not-found ${cssClass}`} style={{display:'block'}}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQksUI4I56dB0-Z9ml77mm9IVnGJDR8uihVUg&usqp=CAU"
                alt="Not Found"
              />
              <p>Oops! Invalid location</p>
            </div>
          )}
        </>
      )}
      {data.main && (
        <div className={`weather-details ${cssClass}`}>
          <div className="humidity">
            <i className="fas fa-water" />
            <div className="text">
              <span>{data.main.humidity}</span>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind">
            <i className="fas fa-wind" />
            <div className="text">
              <span>{data.wind.speed}</span>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
