import React, { useEffect, useState, useContext, useRef } from 'react';
import { GlobalContext } from "../contexts/GlobalContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import Select from '@mui/material/Select';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Query2 = () => {
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const { query2, getQuery2, getAllAreas, areas } = useContext(GlobalContext);


    useEffect(() => {
        let mounted = true;
        async function getQuery() {
            if (areas.length === 0) await getAllAreas();
            await getQuery2();
        }
        if (mounted) {
            getQuery();
        }
        return () => (mounted = false);
    }, []);

    const labels = [2020, 2021, 2022, 2023];
    const data = {
        labels,
        datasets: [
            {
                label: 'Theft detection rate over years',
                data: (labels.map(label => query2?.find(q => q.YEAR === label && location === q.AREA_CODE)?.DETECTION_RATE_PERCENTAGE) || []),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Theft detection rate'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Years'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Changes in Detection Rate of Theft-Related Crimes in Specific Districts Over Time',
            },
        },
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    return ((query2.length > 0) ?
        (<Provider theme={defaultTheme}>
            <Box sx={{ minWidth: 120, backgroundColor: 'white' }} >
                <FormControl sx={{ m: 1, minWidth: 120, marginRight: '64px' }}>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                        labelId="location-select-label"
                        id="location-simple-select"
                        value={(() => {
                            if (location === '') {
                                setLocation(areas[0].AREA_CODE);
                            }
                            return location
                        })()}
                        label="Location"
                        onChange={handleChange}
                    >
                        {areas.map(area => <MenuItem value={area?.AREA_CODE}>{area?.AREA_NAME}</MenuItem>)}
                    </Select>
                </FormControl>

                <div style={{ position: 'relative', height: '60vh', width: '80vw' }}>
                    <Line options={options} data={data} />
                </div>
            </Box>
        </Provider>) : <></>
    );
}

export default Query2;