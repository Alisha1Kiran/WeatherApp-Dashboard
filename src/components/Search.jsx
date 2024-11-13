import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const Search = ({onSearch, showCurrentLoc}) => {
  const [searchCity, setSearchCity] = useState();

  const handleSearchCity = () => {
    if(searchCity.trim()){
      onSearch(searchCity);
    }
  }

  const handleCurrentLoc = () => {
    setSearchCity("");
    showCurrentLoc();
  }
  return (
    <>
    <Stack spacing={2}>
        <span>Search weather here by city or current location </span>
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
        >
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="City"
            inputProps={{ 'aria-label': 'city' }}
            value={searchCity}
            onChange={(event) => setSearchCity(event.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        </Paper>
        <Button variant="outlined" onClick={handleSearchCity}>Show weather</Button>
        <Divider>
            <Chip label="OR" size="small" />
        </Divider>
        <Button variant="outlined" onClick={handleCurrentLoc}><MyLocationIcon sx={{margin: '10px'}}/>Current Location</Button>
    </Stack>
    </>
  )
}

export default Search