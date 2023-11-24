import * as React from 'react';
import Box from '@mui/material/Box';
import CrimeSight from '../assets/CrimeSight.jpeg'

const Home = () => {
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ maxWidth: '100vh', height: '30%', typography: 'body1' }}>
                <img src={CrimeSight} style={{
                    objectFit: 'cover',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    float: 'right'
                }} />
            </Box>
        </Box>);
}

export default Home;