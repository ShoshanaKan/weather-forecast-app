
import { useNavigate } from 'react-router-dom';
import './WeatherHistoryWidget.css'
import { capitalizeFirstLetter, getFormattedTemp, getweatherImage } from '../../utils';

function WeatherHistoryWidget({ item }) {
    const icon = item?.weather?.[0]?.icon
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(`/${item.city}`)} className={`weather-widget weather-widget-instance mt-3`}>
            <div className={`overlap-group default`}>
                <img
                    className={`rectangle design-component-instance-node`}
                    alt="Rectangle"
                    src={require('../../assets/rectangle.png')}
                />
                <div className={`label weather-widget-2`}>{capitalizeFirstLetter(item?.weather?.[0].description)}</div>
                <p className="div">
                    <span className="text-wrapper">
                        H: {getFormattedTemp(item.main.temp_max)}  L: {getFormattedTemp(item.main.temp_min)}
                        <br />
                    </span>
                    <span className="span">{item.city}, {item.sys.country}</span>
                </p>
                <div className="label-2">{getFormattedTemp(item.main.temp)}</div>
                <div className="weather-image-wrapper">
                    <img className="weather-image" alt="Weather" src={getweatherImage(icon)}/>
                </div>
            </div>
        </div>
    );
}
export default WeatherHistoryWidget;