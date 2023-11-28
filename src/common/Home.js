import React, { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import CrimeSight from '../assets/CrimeSight.jpeg'

const Home = () => {

    const { total_records, getRecordCount } = useContext(GlobalContext);
    let navigate = useNavigate();


    const handleClick = () => {
        navigate('/queries');
    }

    const getTotalRecords = () => {
        getRecordCount();
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ maxWidth: '100vh', height: '30%', typography: 'body1' }}>
                <img src={CrimeSight} style={{
                    objectFit: 'cover',
                    maxWidth: '100%',
                    maxHeight: '100%'
                }} />
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '20%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        padding: '16px 32px',
                        borderRadius: '10px',
                        border: 'solid 10px',
                        borderColor: '#e24747'
                    }}
                >
                    <div>
                        <b style={{ margin: '20px' }}>Total records: {total_records?.length === 0 ? <Button sx={{
                            color: '#e24747', '&:hover': {
                                color: '#e24747',
                            }
                        }} onClick={getTotalRecords} >View</Button> : total_records[0]?.TOTALCOUNT}</b><br />

                        <Button variant="contained" sx={{
                            backgroundColor: '#e24747', '&:hover': {
                                backgroundColor: '#e24747',
                            }, margin: '20px',
                            position:'relative',
                            left: '12px'
                        }} onClick={handleClick} >View Queries</Button>
                    </div >
                </Box>
            </Box>

        </Box>);
}

export default Home;