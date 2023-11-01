
import SearchCityInput from '../../components/SearchCityInput/SearchCityInput';
import { useContext, useEffect, useState } from "react";
import { AppContext } from '../../context/WeatherContext';
import { useNavigate } from 'react-router-dom';
import './SearchHistory.css'
import WeatherHistoryWidget from '../../components/WeatherHistoryWidget/WeatherHistoryWidget';

function SearchHistory() {
    const context = useContext(AppContext);
    const { historyList } = context || {};

    const [chosenCity, setChosenCity] = useState('');
    const navigate = useNavigate();

    const chooseCity = async (cityName) => {
        const arr = cityName.split(" ");
        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str = arr.join(" ");
        setChosenCity(str);
    }

    useEffect(() => {
        if (chosenCity !== '') {
            navigate(`/${chosenCity}`);
        }
    }, [chosenCity])

    return (
        <div className="">
            <div className="weather-search-add ">
                <div className="overlap w-25 ">
                    <div className="label">
                        <div className="left-title">Weather</div>
                    </div>
                    <SearchCityInput onClick={chooseCity} />
                    {historyList?.length?
                        historyList?.map(item => <WeatherHistoryWidget key={item?.city} item={item} />): 
                    (<p className='no-history mt-2'>No search history...</p>)}
                </div>
            </div>
        </div>
    );
}
export default SearchHistory;