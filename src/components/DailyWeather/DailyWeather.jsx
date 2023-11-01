import React from 'react';
import'./DailyWeather.css'
import { getFormattedTemp, getweatherImage } from '../../utils';

function DailyWeather({weather, curWeather, cityName }) {
    const weatherData = weather;
    const icon = weatherData?.weather?.[0]?.icon;
    let newDate = new Date();
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    let dayName = '';

    newDate = new Date(weatherData.dt_txt);
    dayName = days[newDate.getDay()];

    return (
        <div className='day-container' >
            {curWeather === true ? <h1>{cityName}</h1>: <p className='day mt-2'>{dayName}</p>}
            <img className='icon-weather' src={getweatherImage(icon)} alt="weather describe pic" />
            <p>{getFormattedTemp(weatherData.main.temp)}</p>
        </div>
    )
}

export default DailyWeather
