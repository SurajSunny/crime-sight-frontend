import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from "../contexts/GlobalContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Provider, defaultTheme } from '@adobe/react-spectrum'
import Select from '@mui/material/Select';
import { Bar } from 'react-chartjs-2';
import Chart from "chart.js/auto";

// Chart.register(Bar);

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


const Query3 = () => {
    const [location, setLocation] = useState('');
    const [location1, setLocation1] = useState('');

    const { query3, getQuery3, getAllAreas, areas } = useContext(GlobalContext);

    useEffect(() => {
        let mounted = true;
        async function getQuery() {
            if (areas.length === 0) await getAllAreas();
            await getQuery3();
        }
        if (mounted) {
            getQuery();
        }
        return () => (mounted = false);
    }, []);

    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];

    const data = {
        labels,
        datasets: [
            {
                label: `${areas?.find(area => area.AREA_CODE === location)?.AREA_NAME}`,
                data: (labels.map(label => query3?.find(q => q.INCIDENT_HOUR === label && location === q.AREA_CODE)?.INCIDENT_COUNT) || []),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: `${areas?.find(area => area.AREA_CODE === location1)?.AREA_NAME}`,
                data: (labels.map(label => query3?.find(q => q.INCIDENT_HOUR === label && location1 === q.AREA_CODE)?.INCIDENT_COUNT) || []),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            }
        ],
    };

    debugger;
    const options = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Crime frequency'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Hours'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Analysis of Peak Hours for Criminal Incidents in Specific Areas Based on Time of Day',
            },
        },
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleChangeLocation1 = (event) => {
        setLocation1(event.target.value);
    };

    return ((query3.length > 0) ?
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

                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="location-select-label">Location</InputLabel>
                    <Select
                        labelId="location1-select-label"
                        id="location1-simple-select"
                        value={(() => {
                            if (location1 === '') {
                                setLocation1(areas[1].AREA_CODE);
                            }
                            return location1
                        })()}
                        label="Location1"
                        onChange={handleChangeLocation1}
                    >
                        {areas.map(area => <MenuItem value={area?.AREA_CODE}>{area?.AREA_NAME}</MenuItem>)}
                    </Select>
                </FormControl>

                <div style={{ position: 'relative', height: '60vh', width: '80vw', display: 'flex', flexWrap: 'wrap' }}>

                    <div style={{ flex: '0 0 60%' }}>
                        <Bar options={options} data={data} />

                    </div>
                    <div style={{ flex: '0 0 10%' }}></div>
                    <div style={{ flex: '0 0 30%' }}>
                        This SQL query aims to pinpoint peak hours for criminal incidents in specific areas by analyzing crime occurrence frequencies at various times throughout the day. It offers critical insights for individual safety and community awareness, informing residents about potentially risky hours, like identifying spikes in crime between 8 PM and 10 PM in certain areas. This knowledge empowers residents to make informed decisions about their activities, enhancing personal and communal safety. Additionally, it aids law enforcement in optimizing patrol schedules and resource allocation, aligning their efforts with identified high-risk periods. Ultimately, this query fosters a more informed, vigilant, and safer community environment.
                    </div>
                </div>
            </Box>
        </Provider>) : <></>
    );
}

export default Query3;