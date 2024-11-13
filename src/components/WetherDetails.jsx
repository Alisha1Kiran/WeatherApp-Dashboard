import React from 'react'
import Stack from '@mui/material/Stack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import weatherBG from './../assets/weather-background-image.jpg'
import nightBG from './../assets/nightBg.jpg'

const WetherDetails = ({weatherData, demoTheme}) => {
    const getLocalTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }
    const city =  weatherData?.name || 'City not available';
    const country = weatherData?.sys?.country? new Intl.DisplayNames(['en'], { type: 'region' }).of(weatherData.sys.country.toUpperCase()) : 'Country not available';
    const tempKelvin = weatherData?.main?.temp || 'N/A';
    const tempCelsius = `${(tempKelvin-273.15).toFixed(2)}°C` // converting kelvin to celsius
    const description = weatherData?.weather?.[0].description || 'N/A';
    const timeStamp = weatherData?.dt || null;
    // const localTime = weatherData?.timeZone? getLocalTime(weatherData.timeZone) : null;
    const currentDate = timeStamp? new Date(timeStamp * 1000).toLocaleDateString('en-US',{
        weekday:'long', day:'numeric', month:'short'}): "No Date";
    const humidity = weatherData?.main?.humidity || 'N/A';
    const pressure = weatherData?.main?.pressure || 'N/A';
    const speed = weatherData?.wind?.speed || 'N/A';
    
    const timeZoneOffset = weatherData?.timezone || 0;
    const currentTime = weatherData?.dt ?  getLocalTime(weatherData.dt) : null;
    const sunRises = weatherData?.sys?.sunrise ? getLocalTime(weatherData.sys.sunrise) : null;
    const sunSet = weatherData?.sys?.sunset ? getLocalTime(weatherData.sys.sunset) : null;
    

    
  return (
    <div>
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            useFlexGap
            sx={(demoTheme) => ({ flexWrap: 'wrap', 
                width:'100%',
                height:'100%',
                // paddingTop: '10px',
                // paddingBottom: '10px',
                backgroundImage: `url(${weatherBG})`,
                backgroundSize: 'cover',
                justifyContent: 'space-between',
                ...demoTheme.applyStyles('dark', {
                    backgroundImage: `url(${nightBG})`,
                }),
            })}
            >
            <Stack spacing={2}
            sx={(demoTheme) => ({margin: '2rem',
                width: '200px',
                // paddingTop: '10px',
                // paddingBottom: '10px',
                backgroundColor: '#D3D3D350',
                backgroundBorder: 'round',
                justifyContent: "center",
                alignItems: "center",
                ...demoTheme.applyStyles('dark', {
                    backgroundColor: '#1A202750',
                }),
            })}>
                <h6>{country}</h6>
                <LocationOnIcon/>{city}
                <div>{currentTime}</div>
                <div>{currentDate}</div>
                <div>{tempCelsius}</div>
                <div>{description}</div>
            </Stack>
            <Stack spacing={2}
            sx={(demoTheme) => ({margin: '2rem',
                width: '200px',
                // paddingTop: '10px',
                // paddingBottom: '10px',
                backgroundColor: '#D3D3D350',
                justifyContent: "center",
                alignItems: "center",
                ...demoTheme.applyStyles('dark', {
                    backgroundColor: '#1A202750',
                }),
            })}>
                <div>Sunrises : {sunRises}</div>
                <div>Sunset : {sunSet}</div>
                <div>Humidity : {humidity}%</div>
                <div>Pressure : {pressure}mb</div>
                <div>Wind speed :{speed}m/s</div>
            </Stack>
        </Stack>
    </div>
  )
}

export default WetherDetails