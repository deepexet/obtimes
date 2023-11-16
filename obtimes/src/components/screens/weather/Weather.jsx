import React, { useEffect, useState } from 'react';
import firebaseService from '../../../services/firebaseService';
import Menu from '../menu/Menu';
import HeadProfile from '../HeadProfile/HeadProfile';
import './Weather.css';
import { useAuth } from '../../../context/AuthContext';
import ListingUnits from '../../ui/listing-units/listingUnits';
import ClipboardButton from '../../ui/ClipboardButton/ClipboardButton';

const Weather = () => {


    const API_KEY = '22ebbddd9ea64a85c87dec413306aec8'; // Замените на ваш API-ключ
    const [city, setCity] = useState('Halifax')
    const [weather, setWeather] = useState({});

    async function getWeatherForecast(city) {
        console.log('dsfsd')
        const endpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data); // Вывод прогноза погоды в консоль
            setWeather(data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error.message);
        }
    }
    useEffect(() => {
        getWeatherForecast(city);
    }, [])

    return (
        <div className="wrapper">
            <div className='content'>
                <div className="left_bar">
                    <div className="header">
                        <HeadProfile />
                    </div>
                    <Menu />
                </div>
                <div className="right_bar">
                    <div className="header">
                        <span>
                            {document.title}
                        </span>
                    </div>
                    <div className="main_body">
                        <div className="comp_time">
                            <div className="second_header">
                                <span className='main_text'>Here you can check weather for a couple days</span>
                                <span className="desc_text">I made it just for fun</span>
                            </div>

                            {/* {Object.keys(weather).length !== 0 && weather.list.map((item, index) => {
                                if(index % 8 == 0){
                                    return (item.dt_txt + "<br>")
                                }
                            })} */}

                            <div className="weather_table">
                                <div className="row title">
                                    <div className="cell">Date</div>
                                    <div className="temp title">Temp</div>
                                    <div className="cell">Windy</div>
                                </div>


                                {Object.keys(weather).length !== 0 && weather.list.map((item, index) => {
                                    if (index % 8 == 0) {
                                        return ('item.dt_txt + "<br>"')
                                    } else {
                                        return ('')
                                    }
                                })}
                            </div>
                            <div className="cell">30 October</div>
                            <div className="temp">
                                <span>Morning: 6°</span>
                                <span>Day: 10°</span>
                                <span>Evening: 7°</span>
                                <span>Night: 2°</span>
                            </div>
                            <div className="cell">12 m/s</div>



                        </div>


                    </div>
                    {/* <Advertise /> */}
                </div>

            </div>
        </div>
    
    )
}

export default Weather;
