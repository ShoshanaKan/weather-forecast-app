import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { fetchLatAndLon, fetchCurrentWeather, fetchNextDaysHourlyWeather } from '../../api/service';
import { AppContext } from '../../context/WeatherContext';
import { capitalizeFirstLetter, getFormattedTemp, getweatherImage } from '../../utils';
import DailyWeather from '../../components/DailyWeather/DailyWeather';
import './WeatherByCity.css';

function WeatherByCity() {

    const context = useContext(AppContext);
    const { setLoading, addLoactionHistoryList, loading, setError } = context || {};
    const [curWheather, setCurWheather] = useState({})
    const [weather5DaysHourly, setWeather5DaysHourly] = useState({})
    const [weather5Days, setWeather5Days] = useState([])
    const [chosenCity, setChosenCity] = useState('');
    const { city } = useParams();
    const icon = curWheather?.weather?.[0].icon || '';

    useEffect(() => {
        if (city !== '' && city !== undefined) {
            setChosenCity(city);
        }
    }, [city])

    useEffect(() => {
        if (chosenCity !== '') {
            chooseCity();
        }
    }, [chosenCity])

    const chooseCity = async () => {
        try {
            setLoading(true);
            const data = await fetchLatAndLon(chosenCity);
            if (data != null) {
                await getWeather(data.lat, data.lon)
            }
            else {
                setCurWheather({});
            }
        }
        catch (e){
            setError(e.message || 'error')
        }
        finally {
            setLoading(false);
        }
    }

    const getWeather = async (lat, lon) => {
        try {
            setLoading(true);
            const data = await fetchCurrentWeather(lat, lon);
            setCurWheather(data);
            const data2 = await fetchNextDaysHourlyWeather(lat, lon);
            setWeather5DaysHourly(data2);
            addLoactionHistoryList({ ...data, city: chosenCity });
        }
        catch (e){
            setError(e.message || 'error')
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (weather5DaysHourly.cod === "200") {
            setWeather5Days(weather5DaysHourly.list.filter(weather => weather.dt_txt.includes("12:00:00")));
        }
    }, [weather5DaysHourly])

    return (
        <div className='current-city'>{loading ? <h1>loading...</h1> : (
            <>
                {curWheather.cod === 200 ? (
                    <>
                        <p className='location'>{chosenCity}</p>
                        <img className='' src={getweatherImage(icon)} alt="weather describe pic" />
                        <p id='tmp' className='temp'>{getFormattedTemp(curWheather.main.temp)}</p>
                        <p className='decription'>{capitalizeFirstLetter(curWheather?.weather?.[0].description)}</p>
                        <p className='hl'>H: {getFormattedTemp(curWheather.main.temp_max)}  L: {getFormattedTemp(curWheather.main.temp_min)}</p>
                    </>
                )
                    : <p>no city chosen or city isn't correct</p>
                }
                <div className='d-flex'>
                    {weather5Days.length >= 5 &&
                        weather5Days.map(weather => (
                            <DailyWeather
                                key={weather.dt_txt}
                                weather={weather} cityName={chosenCity}
                                curWeather={false}
                            />
                        ))
                    }
                </div>
                <Link to={'/'}>See The Weather In Another Location</Link>
            </>
        )}
        </div>
    )
}

export default WeatherByCity
