import * as React from 'react';
import WeatherDetails from './../components/WetherDetails'
import { extendTheme, styled } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import Search from './Search';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import FiveDayForecast from './FiveDayForecast';

const demoTheme = extendTheme({
    colorSchemes: { light: true, dark: true },
    colorSchemeSelector: 'class',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

export default function DashboardLayoutBasic(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');
    const apiKey = 'befd984de4d3c050671d4eb935e6c660';

    const [weatherData, setWeatherData] = React.useState();
    const [city, setCity] = React.useState("");
    const [forecast, setForecast] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    // const [isCurrentLocationFetched, setIsCurrentLocationFetched] = React.useState(false);

    const geoLocation = () => {
        setIsLoading(true);
        try{
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const currentWether = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
                        fetch(currentWether)
                        .then(response => response.json())
                        .then(data => {
                            setCity(data.name);
                            // setIsCurrentLocationFetched(true);
                            setIsLoading(false);// Process the weather data as needed
                        })
                        .catch(error => {
                            console.error('Error fetching weather data:', error);
                        });
                    })
            }    
        } catch (error){
            console.error("Unable to get the current location", error);
        }
    }

    React.useEffect(() => {
        // if (!isCurrentLocationFetched) {
            geoLocation(); // Fetch the location data on initial load
        // }
    }, []);

    React.useEffect(() => {
        if(city) {
            fetchApi();
        }
    }, [city])

    const fetchApi = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
            const data = await response.json();
            console.log("Api response:", data);
            const {lat, lon} = data.coord;
            const foreCastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            const foreCastData = await foreCastResponse.json();
            console.log("ForeCastData: ", foreCastData);
            setWeatherData(data);
            setForecast(foreCastData.list);
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const handleSearch = (city) => setCity(city);
    return (
        <AppProvider
            navigation={[]}
            branding={{
                logo: <CloudQueueIcon />,
                title: 'Weather App',
            }}
            router={router}
            theme={demoTheme}
        >
            <DashboardLayout hideNavigation
            sx={(demoTheme) => ({
                p: 2,
                margin: 'auto',
                backgroundColor: '#D3D3D3',
                ...demoTheme.applyStyles('dark', {
                    backgroundImage: 'url()',
                }),
            })}>
                <PageContainer>
                {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                    <CircularProgress />
                </div>
                ) : (
                    <>
                    <Grid container spacing={4}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px"
                      }}>
                        <Grid container item sm={12} md={5} lg={5} spacing={2}>
                            <Paper
                                sx={(demoTheme) => ({
                                    p: 2,
                                    margin: 'auto',
                                    backgroundColor: '#D3D3D3',
                                    ...demoTheme.applyStyles('dark', {
                                        backgroundColor: '#1A2027',
                                    }),
                                })}
                            >
                                <Grid item>
                                    {/* Serch input */}
                                    <Search onSearch={handleSearch} showCurrentLoc={geoLocation}/>
                                </Grid>
                            </Paper>
                        </Grid>

                        <Grid container item sm={12} md={7} lg={7} spacing={2} direction="row">
                            <WeatherDetails weatherData={weatherData} demoTheme={demoTheme}/>
                        </Grid>

                    </Grid>
                    {/* <Grid container
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                        backgroundColor: '#D3D3D3',
                        ...demoTheme.applyStyles('dark', {
                            backgroundColor: '#1A2027',
                        }),
                      }}>
                                <FiveDayForecast forecastData={forecast}/>
                        </Grid> */}
                    </>    
                )}    
                </PageContainer>
            </DashboardLayout>
        </AppProvider>
    );
}
