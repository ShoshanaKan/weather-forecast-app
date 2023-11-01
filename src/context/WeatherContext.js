
import React, { useState } from 'react';
export const AppContext = React.createContext();

export default function WeatherContext({ children }) {

    const [loading, setLoading] = useState(false);
    const [historyList, setHistoryList] = useState([]);
    const [error, setError] = useState(null);

    const addLoactionHistoryList = (newHistory) => {
        let newHistoryList = [...historyList, newHistory];
        newHistoryList = newHistoryList.filter((obj, index) => {
            return index === newHistoryList.findLastIndex(o => obj.name === o.name);
        });
        setHistoryList(newHistoryList);
    }

    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading,
                historyList,
                addLoactionHistoryList,
                error,
                setError
            }}
        >
            {children}
        </AppContext.Provider>
    )
}