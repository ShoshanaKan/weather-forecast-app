export const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getFormattedTemp = (temp) => {
    return <>{`${Math.floor(temp - 273)}`}&#176;</>
}

export const getweatherImage = (imgName) =>{
    return imgName? `https://openweathermap.org/img/wn/${imgName}@2x.png`: ''
}