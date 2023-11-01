import React, { useState } from 'react';
import './SearchCityInput.css';

function SearchCityInput({onClick}) {
  const [city, setCity] = useState('');

  const clickOnSubmit = () => {
    onClick(city);
  }

  const handleChange = async (e) => {
    await setCity(e.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      clickOnSubmit()
    }
  };

  return (
    <div className={`search-field default dark-mode-true search-field-instance mt-3`}>
      <img
        className="icon-magnifyingglass"
        alt="Icon magnifyingglass"
        src={require('../../assets/search.png')}
        onClick={clickOnSubmit}
      />
      <input
        onChange={handleChange}
        className={`placeholderInput`}
        placeholder='Search for a city or location'
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchCityInput


