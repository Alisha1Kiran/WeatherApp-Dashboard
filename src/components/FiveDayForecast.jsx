import React from 'react'

const FiveDayForecast = ({forecastData}) => {
    console.log("forecast on forcast page: ", forecastData);
    const todayDate = new Date();
    const formattedDate = todayDate.toLocaleDateString('en-CA');
    console.log("todayDate: ", formattedDate);
  return (
    <div>
        <h4>Todays 3 hours forecast</h4>
        {
            forecastData?.list && (
                <>rejkn</>
            )
        }
    </div>
  )
}

export default FiveDayForecast