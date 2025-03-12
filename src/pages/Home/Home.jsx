import React, { useState, useEffect } from 'react';
import SensorGraph from '../../components/SensorGraph';
import steel_frame from '../../assets/steel_frame.png';
import './Home.css';
import SteelFrame from '../../components/SteelFrame';
import sensor from '../../../sensor_data.json';
import axios from 'axios';

const Home = () => {
    const [sensorIndex, setSensorIndex] = useState(null); 
    const [sensorData, setSensorData] = useState(sensor);
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY = "aa5a279a155641d3b5971221251003";
    const city = 'Delhi';

    useEffect(() => {
        console.log(sensorIndex);
    }, [sensorIndex]);

    const handleRedirect = () => {
        window.location.href = '/select';
    };
    useEffect(() => {
        const fetchWeather = async () => {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        };
    
        fetchWeather();
    }, []);


    return (
        <div className='home'>
            <button onClick={handleRedirect} className='button'>
                Select Sensor
            </button>

            <div className='project-data'>
                <div>
                    <p>Meri Sanrachna</p>
                </div>
                <div>
                    <p>R&D IITD</p>
                </div>
                <div>
                    <p>
                        {weatherData ? `${weatherData.main.temp}°C` : `${Math.floor(Math.random() * 5 + 25)}°C`}
                    </p>
                </div>
            </div>

            {/* <div className='image'>
                <img src={steel_frame} alt="Steel Frame" />
            </div> */}
            <SteelFrame sensorData={sensorData} />

        </div>
    );
};

export default Home;
