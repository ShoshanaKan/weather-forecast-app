import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import SearchHistory from './screens/SearchHistory/SearchHistory';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WeatherByCity from './screens/WeatherByCity/WeatherByCity';
import WeatherContext, { AppContext } from './context/WeatherContext';
import { useContext, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export const AppWrapper = () => {
  return (
    <WeatherContext>
      <App />
    </WeatherContext>
  );
};

function App() {

  const context = useContext(AppContext);

  useEffect(() => {
    if (context.error) {
      let error = context.error;
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      context?.setError(null);
    }
  }, [context.error])

  return (
    <div className='d-flex  align-items-center justify-content-center pb-4'>
        <Router>
          <Routes>
            <Route path="/" element={<SearchHistory />} />
            <Route path="/:city" element={<WeatherByCity />} />
          </Routes>
        </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
