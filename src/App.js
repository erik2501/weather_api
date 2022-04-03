import react, {useState} from "react";


const api = {
  key: '367c17c7d520f72adfe2f8415301c77b',
  base: 'http://api.openweathermap.org/data/2.5/'
}


function App() {


  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [theme, setTheme] = useState(true);


  const search = evt => {
    if (evt.key == 'Enter') {
       fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }


  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let date = String(new window.Date());
    date = date.slice(3,15) ;

    return `${date}`
  }


  return (
    <div className={
      (typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <div className='search-box'>
          <input 
          type='text'
          className='search-bar'
          placeholder='Search...'
          onChange = {e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          /> 
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
