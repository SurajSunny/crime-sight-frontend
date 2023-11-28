import React, { useEffect, useState, useContext, useRef } from 'react';
import { GlobalContext } from "../contexts/GlobalContext";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { parseDate } from '@internationalized/date';
import { DateRangePicker, Provider, defaultTheme } from '@adobe/react-spectrum'
import Select from '@mui/material/Select';
import { Bar } from 'react-chartjs-2';
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


const Query4 = () => {
    debugger;
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');
    const [allYears, setAllYears] = useState([]);
    const [allAgeGroups, setallAgeGroups] = useState([]);
    const [ageGroup, setAgeGroup] = useState('');


    const { query4, getQuery4, getAllAreas, areas } = useContext(GlobalContext);


    useEffect(() => {
        let mounted = true;
        async function getQuery() {
            if (areas.length === 0) await getAllAreas();
            await getQuery4();
        }
        if (mounted) {
            getQuery();
        }
        return () => (mounted = false);
    }, []);

    useEffect(() => {
        if (query4.length > 0) {
            setAllYears(() => [...new Set(query4.map(y => y.YEAR))]);
            setallAgeGroups(() => [...new Set(query4.map(y => y.AGE_GROUP))])
        }
    }, [query4])

    const labels = ['Spring', 'Summer', 'Autumn', 'Winter'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Age 0-17',
                data: labels.map(label => query4?.find(q => q.SEASON === label && year === q.YEAR && q.AGE_GROUP === "0-17" && location === q.AREA_CODE)?.VICTIM_COUNT),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Age 18-30',
                data: labels.map(label => query4?.find(q => q.SEASON === label && year === q.YEAR && q.AGE_GROUP === "18-30" && location === q.AREA_CODE)?.VICTIM_COUNT),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Age 31-45',
                data: labels.map(label => query4?.find(q => q.SEASON === label && year === q.YEAR && q.AGE_GROUP === "31-45" && location === q.AREA_CODE)?.VICTIM_COUNT),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: '#4bc0c0',
            },
            {
                label: 'Age 46-60',
                data: labels.map(label => query4?.find(q => q.SEASON === label && year === q.YEAR && q.AGE_GROUP === "46-60" && location === q.AREA_CODE)?.VICTIM_COUNT),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: '#ff9f40',
            },
            {
                label: 'Age 61+',
                data: labels.map(label => query4?.find(q => q.SEASON === label && year === q.YEAR && q.AGE_GROUP === "61+" && location === q.AREA_CODE)?.VICTIM_COUNT),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: '#9966ff',
            }
        ],
    };
    console.log(year);

    const options = {
        responsive: true,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Victim count'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Seasons'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Seasonal Victim Count Trends Across Different Age Groups in Specific Areas',
            },
        },
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    const handleChangeAge = (event) => {
        setAgeGroup(event.target.value);
    };

    return ((query4.length > 0 && allYears.length > 0 && allAgeGroups.length > 0) ?
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
                    <InputLabel id="year-select-label">Year</InputLabel>
                    <Select
                        labelId="year-select-label"
                        id="year-simple-select"
                        value={(() => {
                            if (year === '') {
                                setYear(allYears[0])
                            }
                            return year
                        })()}
                        label="Location"
                        onChange={handleChangeYear}
                    >
                        {allYears?.map(y => <MenuItem value={y}>{y}</MenuItem>)}
                    </Select>
                </FormControl>

                {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="age-select-label">Age Group</InputLabel>
                    <Select
                        labelId="age-select-label"
                        id="age-simple-select"
                        value={(() => {
                            if (ageGroup === '') {
                                setAgeGroup(allAgeGroups[0])
                            }
                            return ageGroup
                        })()}
                        label="Age Group"
                        onChange={handleChangeAge}
                    >
                        {allAgeGroups?.map(y => <MenuItem value={y}>{y}</MenuItem>)}
                    </Select>
                </FormControl> */}
                <div style={{ position: 'relative', height: '60vh', width: '80vw', display: 'flex', flexWrap: 'wrap' }}>

                    <div style={{ flex: '0 0 60%' }}>
                        <Bar options={options} data={data} />


                    </div>
                    <div style={{ flex: '0 0 10%' }}></div>
                    <div style={{ flex: '0 0 30%', display: 'flex', alignItems: 'center' }}>
                        Query is designed to analyze victim counts grouped by seasons across different age groups in specific areas over time
                    </div>
                </div>
            </Box>
        </Provider>) : <></>
    );
}

export default Query4;